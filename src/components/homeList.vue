<template>
  <div class="home_content">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up='mescrollUp' @init='mescrollInit'>
      <div class="home-down">
        <ul>
          <li v-for="(top,index) in topMsg" :key="index" v-if="top.showTempate == 11">
            <router-link class='left-right' :to="{name:'DetailNews',params:{id:top.id,icon:top.headImg}}">
              <div class="left" >
                <h4>{{ top.title }}</h4>
                <p><span class="top">置顶</span><span>{{top.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{ timeFn(data) }}</span></p>
              </div>
              <div class="right">
                <img v-lazy="top.imageList" :alt="top.title">
              </div>
            </router-link>
          </li>
          <li v-for="(data,index) in dataMsg" :key="index">
            <router-link class='left-right' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-if="data.showTempate == 0 && data.user == null && data.imageList != ''">
              <div class="left" >
                <h4>{{ data.title }}</h4>
                <p><span>{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{ timeFn(data) }}</span></p>
              </div>
              <div class="right">
                <img v-lazy="data.imageList" :alt="data.title">
              </div>
            </router-link>
            <router-link class='one' :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 1 && data.user != null  && data.imageList != ''">
              <h4>{{data.title}}</h4>
              <img v-lazy="data.imageList" :alt="data.title">
              <p><span>{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{ timeFn(data) }}</span> </p>
            </router-link>
            <router-link class="third" :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 3 && data.user == null && data.imageList != ''">
              <h4>{{ data.title }}</h4>
              <dd>
                <dl>
                  <img v-lazy="getImage(data)[0]" alt="">
                </dl>
              </dd>
              <p><span>{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{timeFn(data)}}</span></p>
            </router-link>
            <router-link :to="{name:'DetailNews',params:{id:data.id,icon:data.headImg}}" v-else>
              <h4>{{data.title}}</h4>
              <p><span>{{data.source}}</span><img class="v" v-if="data.user != null && data.user.isVip == 1" src="../assets/images/4.png" alt=""><span>{{timeFn(data)}}</span></p>
            </router-link>  
          </li>
          <Loading v-if='loading' class="ab"/>
        </ul>
      </div> 
    </mescroll-vue>
  </div>
</template>
<script>
import Loading from './Loading'
import axios from 'axios'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  components: {
    MescrollVue, // 注册mescroll组件
    Loading
  },
  name:'homeList',
  data () {
    return {
      loading:true,
      mescroll: null, // mescroll实例对象
      mescrollDown:{callback:this.upCallback}, //下拉刷新的配置
      mescrollUp:{callback: this.downCallback},
      REQS:true,
      dataMsg:'',
      images:'',
      topMsg:'',
      max:'',
      min:''
    }
  },
  created(){
    this.getNewsList()
    this.top()
  },
  watch:{
    //"$route": ['getNewsList','top']//监听路由变化，重新渲染数据
    $route(newD,oldD){
      this.getNewsList()
      this.top()
      this.mescroll.scrollTo(0,0)
    }
  },
  methods:{
    // 置顶
    top(){
      let data = this.$route.params.id
      let date = new Date(new Date()).getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/Ad/ChannelTopAds'
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            'channelid':data       
          }
        })
        .then(res => {
          this.topMsg = res.data.data
        })
        .catch(e => alert('获取置顶新闻失败'))
    },
    // 列表数据
    getNewsList(){
      this.max = ''
      this.min = ''
      let data = this.$route.params.id
      console.log(data + '频道ID')
      let date = new Date(new Date()).getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/News/GetNewsList'   
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            'channelid':data,
            'isUp':1,
            'maxid':0,
            'minid':0,
            'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
            'pagesize':10
          }
        })
        .then(res => {
          this.loading = false
          this.dataMsg = res.data.data.items
          // let scroll = document.body.scrollTop || document.documentElement.scrollTop 
          this.max = res.data.data.minid;
          this.min = this.max - 10
          // scroll = 0            
        })
        .catch(e => alert('请求新闻失败'))
    },
    getImage(images){
      return images.imageList.split("|")
    },
    // 下拉刷新
    upCallback(mescroll){
      let data = this.$route.params.id
      console.log(data + '频道')
      let date = new Date(new Date()).getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/News/GetNewsList'   
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            'channelid':data,
            'isUp':1,
            'maxid':0,
            'minid':0,
            'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
            'pagesize':10
          }
        })
        .then(res => {
          this.dataMsg = res.data.data.items
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess()
          })
        
        })
        .catch(e => alert('请求新闻失败'))
    },
    // mescroll组件初始化的回调,可获取到mescroll对象 (如果this.mescroll并没有使用到,可不用写mescrollInit)
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 上拉加载
    downCallback (page, mescroll) {
      let data = this.$route.params.id
      let date = new Date(new Date()).getTime();
      let getNewsListUrl = 'https://api.dltoutiao.com/api/News/GetNewsList'
      axios.get(getNewsListUrl,{
          headers:{
          Appid:'gf_app_android',
          Timestamp:date,
          Sign:'aaaa',
          vtoken:''
        },
          params:{
            'channelid':data,
            'isUp':1,
            'maxid':this.max,
            'minid':this.min,
            'deviceId':'726607C0-233E-4EA4-8FAB-F3D80454ADB3',
            'pagesize':10
          }
        }).then((res) => {
        //请求的列表数据
        console.log(this.max + '----' + this.min)
        let arr = res.data.data.items
        // 如果是第一页需手动制空列表
        if (page.num === 1) this.dataMsg = []
        // 把请求到的数据添加到列表
        this.dataMsg = this.dataMsg.concat(arr)
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          mescroll.endSuccess()
        })
        this.max = res.data.data.minid
        this.min = this.max - 10
      }).catch((e) => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
      })
    },
    // 计算时间差
     timeFn(time) {
        //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
        var dateBegin = new Date(time.indate.replace(/-/g, "/"));//将-转化为/，使用new Date
        var dateEnd = new Date();//获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin.getTime();//时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
        var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000))//计算出小时数
        //计算相差分钟数
        var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
        //计算相差秒数
        var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000)
        // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
        // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
        //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");

        if(dayDiff >= 1) return dayDiff + '天以前'
        if(hours < 24 && hours >= 1 ) return hours + '小时以前'
        if(minutes < 60 && minutes >= 1) return minutes + "分钟以前"
        if(seconds < 60 ) return '刚刚'
    }
  }
}
</script>
<style scoped>
/*以fixed的方式固定mescroll的高度*/
  .mescroll {
    position: fixed;
    top: 3.75rem;
    bottom: 0;
    height: auto;
  }
  .ab{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%)
  }
  .home_content ul{
    width: 17.75rem;
    margin: 0 auto;
  }
  .home_content ul a.left-right{
    display: flex;
    justify-content: space-between;
  }
  .home_content ul li{
    margin-top: 1rem;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: .5rem;
  }
  .home_content ul .left{
    width: 11.5rem;
  }
  .home_content ul li h4{
    max-height: 2.4rem;
    overflow: hidden;
    font-size: .9rem;
    line-height: 1.2rem;
    color:#222222;
    font-weight: normal;
    font-family: Microsoft Yahei;
  }
  .home_content ul li p{
    font-size: .6rem;
    margin-top: .5rem;
  }
   .home_content ul li span{
     margin-right:.5rem;
     color:#a9a8a8;
   }
  .home_content ul .left .top{
    border: 2px solid #ff0000;
    color:#ff0000;
    padding:0 .1rem
  }
  .home_content ul .right{
    width: 5.75rem;
    height: 3.75rem;
    overflow: hidden;
  }
  .home_content ul li img{
    width: 100%;
    height: 100%;
  }
  .home_content ul .one img{
    height: 3.8rem;
    margin-top: .5rem;
  }
  .home_content ul .third dd{
    display: flex;
    margin-top: .5rem;
  }
  .home_content ul .third dl{
    width: 100%;
    height: 3.75rem;
    overflow: hidden;
    margin:0 1%;
  }
  .home_content ul .third dl img{
    width: 100%;
    height: 100%;
  }
  .home_content ul .third p img{
    width: .4rem;
    height: .4rem;
    margin:0 .1rem  0 -.4rem;
  }
  .v{
    width:.5rem !important;
    height: .5rem !important;
    margin: 0 .05rem 0 -.2rem;
  }
</style>



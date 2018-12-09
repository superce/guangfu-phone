<template>
  <div class="banner">
    <img :src="liveDetail.image">
    <div class="ban">
      <p>{{ liveDetail.content }}</p>
      <span v-for="(tab,index) in liveList.tags">{{ tab.item2 }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'liveDetailNews',
  data(){
    return {
      liveDetail:'',
      liveList:''
    }
  },
  created(){
    this.getLive()
  },
  watch:{
    "$route" : "getLive"
  },
  methods:{
    getLive(){
        let data = this.$route.params.id
        let date = new Date(new Date()).getTime();
        let getNewsListUrl = 'https://api.dltoutiao.com/api/News/TopicNews'
        axios.get(getNewsListUrl,{
            headers:{
            Appid:'hb_app_android',
            Timestamp:date,
            Sign:'aaaa',
            vtoken:''
          },
          params:{
            id:data
          }
        }).then(res => {
          // console.log(res.data.data)
          this.liveDetail = res.data.data.topic
          this.liveList = res.data.data
          this.$emit('live',this.liveList)
          // this.liveList = res.data.data
          // this.loading = false
        }).catch(e => alert(e))
      },
      
  }
}
</script>

<style scoped>
  .banner{
    width:100%;
    margin-top: 2.3rem;
  }
  .banner .ban{
    width: 17.5rem;
    margin: 0 auto;
  }
  .banner img{
    width: 100%;
  }
  .banner p{
    font-size: .8rem;
    color:#000;
    line-height: 1.1rem;
    margin-bottom: .5rem;
    font-family: "Microsoft Yahei Simhei";
  }
  .banner span{
    font-size: .7rem;
    color:#333;
    border-radius: .4rem;
    border: 1px solid #000;
    margin:0 .3rem;
    padding:.1rem .3rem;
  }
</style>

<template>
  <div class="keywordlist">
    <ul v-if="keyList">
      <li v-for="(data,index) in keyList" :key="index">
        <!-- 左右 -->
        <router-link class='left-right' :to="{name:'Detail',params:{id:data.id,icon:data.headImg}}" v-if="data.showTempate == 0 && data.user == null && data.imageList.length < 3 && data.imageList.length >= 1 && data.imageList != null">
          <div class="left" >
            <h4>{{ data.title }}</h4>
            <p><span>{{data.source}}</span><span>{{ data.indate }}</span></p>
          </div>
          <div class="right">
            <img :src="data.imageList" :alt="data.title">
          </div>
        </router-link>
        <!-- 一个大图 -->
        <router-link class='one' :to="{name:'Detail',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 1 && data.user != null && 3 > data.imageList.length >= 1 && data.imageList != null">
          <h4>{{data.title}}</h4>
          <img :src="data.imageList" :alt="data.title">
          <p><span>{{data.source}}</span><span>{{ data.indate }}</span> </p>
        </router-link>
        <!-- 三个小图 -->
        <router-link class="third" :to="{name:'Detail',params:{id:data.id,icon:data.headImg}}" v-else>
          <h4>{{ data.title }}</h4>
          <dd>
            <dl><img :src="data.imageList[0]" :alt="data.title"></dl>
            <dl><img :src="data.imageList[1]" :alt="data.title"></dl>
            <dl><img :src="data.imageList[2]" :alt="data.title"></dl>
          </dd>
          <p><span>{{data.source}}</span><img src="../assets/images/4.png" alt=""><span>{{data.indate}}</span></p>
        </router-link>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(data,index) in keyword" :key="index">
        <!-- 左右 -->
        <router-link class='left-right' :to="{name:'Detail',params:{id:data.id,icon:data.headImg}}" v-if="data.showTempate == 0 && data.user == null && data.imageList.length < 3 && data.imageList.length >= 1 && data.imageList != null">
          <div class="left" >
            <h4>{{ data.title }}</h4>
            <p><span>{{data.source}}</span><span>{{ data.indate }}</span></p>
          </div>
          <div class="right">
            <img :src="data.imageList" :alt="data.title">
          </div>
        </router-link>
        <!-- 一个大图 -->
        <router-link class='one' :to="{name:'Detail',params:{id:data.id,icon:data.headImg}}" v-else-if="data.showTempate == 1 && data.user != null && 3 > data.imageList.length >= 1 && data.imageList != null">
          <h4>{{data.title}}</h4>
          <img :src="data.imageList" :alt="data.title">
          <p><span>{{data.source}}</span><span>{{ data.indate }}</span> </p>
        </router-link>
        <!-- 三个小图 -->
        <router-link class="third" :to="{name:'Detail',params:{id:data.id,icon:data.headImg}}" v-else>
          <h4>{{ data.title }}</h4>
          <dd>
            <dl><img :src="data.imageList[0]" :alt="data.title"></dl>
            <dl><img :src="data.imageList[1]" :alt="data.title"></dl>
            <dl><img :src="data.imageList[2]" :alt="data.title"></dl>
          </dd>
          <p><span>{{data.source}}</span><img src="../assets/images/4.png" alt=""><span>{{data.indate}}</span></p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name:'keyWordList',
    data(){
      return{
        keyList:this.$route.query.keywordid,
        keyword:this.$route.query.keyword,
      }
    }
  }
</script>

<style scoped>
  .keywordlist ul{
    width: 17.75rem;
    margin: 0 auto;
  }
  .keywordlist ul .left-right{
    display: flex;
  }
  .keywordlist ul li{
    margin-top: 1rem;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: .5rem;
  }
  .keywordlist ul .left{
    width: 11rem;
  }
  .keywordlist ul li h4{
    height: 2.51rem;
    overflow: hidden;
    font-size: .8rem;
    line-height: 1.2rem;
    color:#000000;
    font-family: Microsoft Yahei;
    font-weight: normal;
  }
  .keywordlist ul li p{
    font-size: .6rem;
    margin-top: .5rem;
  }
   .keywordlist ul li span{
     margin-right:.5rem;
     color:#a9a8a8;
   }
  .keywordlist ul .left .top{
    border: 2px solid #ff0000;
    color:#ff0000;
    padding:0 .1rem
  }
  .keywordlist ul .right{
    width: 5.75rem;
    height: 3.75rem;
    overflow: hidden;
  }
  .keywordlist ul li img{
    width: 100%;
    height: 100%;
  }
  .keywordlist ul .one img{
    margin-top: .5rem;
  }
  .keywordlist ul .third dd{
    display: flex;
    margin-top: .5rem;
  }
  .keywordlist ul .third dl{
    width: 33%;
    height: 3.75rem;
    overflow: hidden;
    margin:0 1%;
  }
  .keywordlist ul .third p img{
    width: .4rem;
    height: .4rem;
    margin:0 .1rem  0 -.4rem;
  }
</style>

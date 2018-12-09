<template>
  <div class="banner">
    <img :src="live.topic.image">
    <div class="ban">
      <p>{{ live.topic.content }}</p>
      <span v-for="(tab,index) in live.tags">{{ tab.item2 }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props:['live'],
  name:'liveDetailNews'
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

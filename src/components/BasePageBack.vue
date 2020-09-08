<template>
  <div class="basePageBack" :class="type">
    <header class="header">
      <h1 class="title text-truncate">{{title}}</h1>
      <img @click="back"
           src="../assets/img/back.png"
           class="img-back"
      />

      <div class="img-cart-right">
        <slot name="right-btn"></slot>
      </div>

    </header>
    <div :style="bgclass" style="padding-top: 75px;padding-bottom: 50px;min-height: 100%">
        <slot name="content">
          {{content}}
        </slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'BasePageBack',
    props: {
      type: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        bgclass: {
          backgroundImage: 'url(' + require('@/assets/img/bg.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          width: '100%',
          webkitBackgroundSize: 'cover',
          mozBackgroundSize: 'cover',
          oBackgroundSize: 'cover'
        },
        title: ''
      };
    },
    async mounted () {
      let title = this.$route.query.title;
      if (typeof title === 'undefined') {
        return
      }
      // param = JSON.parse(param);
      this.title = title; // param.text;
    },
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .basePageBack {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #e4e4e4;
  }
  .basePageBack .header {
    /*position: relative;*/
    position: fixed;
    /*height: 44px;*/
    line-height: 44px;
    text-align: center;
   /* box-shadow: 0 1px 6px #ccc;*/
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 11;
    background-color: #27356b;
    color: #ffffff;
    width :100%;
    padding: 55px 10px 10px;
  }
  .basePageBack .header h1 {
    /*font-size: 16px;*/
    font-weight: 700;
    font-size: 20px;
    margin: 0 auto;

    padding-left: 40px;
    padding-right: 20px;

  }
  .img-back {
    position: absolute;
    top: 55px;
    left: 15px;
    padding: 0 15px;
    color: #ffffff;
    font-size: 20px;
    /*height: 14px;width: 60px;*/
    width: 55px;
    height: 18px;
    /*background-color: black;*/
  }
  .img-cart-right{
    position: absolute;
    top: 45px;
    right: 10px;
    /*height: 14px;width: 60px;*/
    /*width: 55px;
    height: 18px;*/
    text-align: center;
  }
  .img-cart-right img {
    width: 55px;
    height: 18px;
    padding: 0 15px;
    /*color: #ffffff;*/
    /*font-size: 20px;*/
  }

</style>

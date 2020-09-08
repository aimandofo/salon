// 吸頂基礎頁
<template>
  <div class="sticky-view-top">
    <div class="sticky-view-container">
      <div style="z-index: 10;
                position: fixed;
                top: 0;
                width: 100%;
                height: 110px;
                margin-top: 0;
                padding-top: 55px;
                left: 0;"
           ref="stickyHeader"
      >
        <img src="../assets/img/bak.png" alt=""
             style="width: 35px;height: 35px;
                position: absolute;
                left: 20px;
                line-height: 50px;
                margin-top: 5px;
                z-index: 100;
                transform: rotate(0)"
             @click="back"
        />
        <div style="
            text-align: center;
            height:50px;
            opacity: 0;
            color: #ffffff;
            font-size: 20px;
            margin: 0 auto;
            line-height: 50px;
            "
             ref="title"
        >
          {{$route.query.title}}
        </div>
      </div>
      <cube-sticky
        :pos="scrollY"
        :check-top="checkTop"
        fixed-show-ani="sticky-fixed-show"
        @diff-change="diffChange">
        <cube-scroll :scroll-events="scrollEvents"
                     @scroll="scrollHandler"
                     ref="cubescroll"
        >

          <slot name="topview" style="z-index: 1"></slot>
          <cube-sticky-ele>
            <ul class="sticky-header">
              <li></li>
            </ul>
          </cube-sticky-ele>
          <slot name="content"
                style="
                z-index: 2;
              padding-top: 20px;
              padding-bottom: 50px;
              color: #ffffff;
              height: 100%;
              min-height: 100%"
          ></slot>
        </cube-scroll>
      </cube-sticky>
    </div>
  </div>

</template>


<script>
  export default {
    name: 'BasePageTop',
    data () {
      return {
        scrollEvents: ['scroll'],
        scrollY: 0,
        checkTop: true,
        title: 'test'
      }
    },
    components: {},
    async mounted () {
      this.title = this.$route.query.title;
    },
    async created () {
    },
    methods: {
      scrollHandler ({y}) {
        this.scrollY = -y
      },
      diffChange (diff, height) {
        let opacity = 0
        if (height) {
          opacity = diff / height
        }
        // this.$refs.stickyHeader.style.opacity = opacity
        this.$refs.title.style.opacity = opacity
        // console.log(diff, height, opacity)
        if (opacity > 0) {
          this.$refs.stickyHeader.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
        } else {
          this.$refs.stickyHeader.style.backgroundColor = 'rgba(0, 0, 0, 0)'
        }
      },
      back () {
        this.$router.back()
      }
    }

  }
</script>


<style scoped>

  .sticky-view-top .content > * {
    margin: 10px 0;
  }

  .sticky-view-top .sticky-view-container {
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #27356b;
  }

  .sticky-view-top .sticky-view-container li {
    padding: 20px 10px;
  }

  /*.sticky-view-top .sticky-view-container .sticky-header {
    color: #fff;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.6);
  }*/

  .sticky-view-top .sticky-view-container .cube-sticky .cube-scroll-wrapper {
    background-color: #fff;
  }

  /*.sticky-view-top .sticky-view-container .cube-sticky img {
    vertical-align: top;
    height: 250px;
    transform: rotate(180deg);
  }*/

  .sticky-view-top .sticky-view-container .cube-sticky-ele {
    margin-top: -60px;
    margin-bottom: 4px;
  }

  .sticky-view-top .sticky-view-container .sticky-fixed-show-enter,
  .sticky-view-top .sticky-view-container .sticky-fixed-show-leave-active {
    transform: translate(0, -100%);
  }

  .sticky-view-top .sticky-view-container .sticky-fixed-show-enter-active,
  .sticky-view-top .sticky-view-container .sticky-fixed-show-leave-active {
    transition: all 0.5s ease-in-out;
  }


</style>

<style>
  .sticky-view-top .sticky-view-container .cube-sticky .cube-scroll-wrapper{
    background-color: #27356b !important;
    min-height: 100% !important;
  }

  .cube-slide-item > a > img {
    display: block;
    height: 250px !important;
     width: 100%;
    margin: 0 auto;
  }
  .cube-slide {
    /*position: inherit !important;*/
  }
  .cube-slide-dots {
    bottom: 50px !important;
  }
  .cube-slide-dots > span {
    display: inline-block;
    vertical-align: bottom;
    margin: 0 10px !important;
    width: 16px !important;
    height:16px !important;
    border-radius: 8px;
    border-color: #ccc;
    border-width: 1px;
    border-style: solid;
    background: #ccc;
  }
  .cube-slide-dots > span.active {
    background: #ffffff !important;
  }
</style>



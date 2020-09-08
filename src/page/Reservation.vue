// 预约
<template>

  <div>
    <BasePageBack ref="BasePageBack"
                  type="scroll-nav-def">
      <div slot="right-btn">
      </div>
      <div slot="content">
        <div class="view-wrapper">
          <cube-scroll-nav :data="goods"
                           :current="goods.length>0 ? goods[0].name : ''"
                           ref="cubescrollnav">
            <Goods :data="goods" ref="goods" :addCart="addCart"/>
            <div style="height: 100px"></div>
          </cube-scroll-nav>
        </div>
      </div>

    </BasePageBack>
    <!--<Bottom ref="bottom" :data="funData"
            select="menubrowse"-->
    />
  </div>
</template>


<script>
  import Goods from '../components/Goods'
  import Bottom from '../components/Bottom'
  import jglib from '../utils/JGLib'
  import BasePageBack from '../components/BasePageBack'

  export default {
    name: 'HairstyleIdeas',
    data () {
      return {
        showHeadTitle: true,
        // data: goods,
        goods: [],
        funData: [],
        title: '',
        cartNum: 0   // 購物車個數
      }
    },
    components: {
      Bottom,
      Goods,
      BasePageBack
    },
    async mounted () {
      /* await this.initData()
      this.succeedCart();
      let title = this.$route.query.title
      if (typeof title === 'undefined') {
        return
      }
      this.title = title */
    },
    methods: {

      async initData () {
        this.funData = await jglib.getFunList()
        const goods = await jglib.getGoods()
        this.goods = await this.$refs.goods.setGoodsData(goods)
        this.$refs.cubescrollnav.refresh()
      }
    }

  }
</script>


<style lang="stylus" rel="stylesheet/stylus">


  .scroll-nav-def
    background-color: #fff

    .view-wrapper
      position: fixed
      top: 90px
      left: 0
      bottom: 0
      width: 100%

    .cube-scroll-nav-bar
      border-bottom: 1px solid #f4f4f4

    .cube-scroll-nav-panel
      width: 90%
      margin: auto /*img
        width: 114px
        height: 114px*/

      ul
        overflow: hidden
        font-size: 14px
        line-height: 1.4
        color: #666

      li
        float: left
        width: 50%

        div
          width: 114px
          margin: 0 auto 15px

          p
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis

    .cube-scroll-nav-panel-title
      padding: 15px
      font-size: 16px
      text-align: center
</style>



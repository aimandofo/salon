// 主页
<template>

  <div>
    <BasePageBack ref="BasePageBack"
                  type="scroll-nav-def">
      <div slot="right-btn">
        <div @click="openCart">
          <img src="../assets/img/icon-cart-w.png"/>
          <mt-badge type="success"
                    style="font-size: 10px;
                          position: absolute;
                          right: 5px;
                          top: -10px;
                          padding: 5px;
                          width: 20px;
                          height: 20px;
                          line-height: 12px;
                          margin-top: 15px;
                          border-radius: 10px;"
                    v-show="cartNum>0"
          >
            {{cartNum}}
          </mt-badge>

          <!--<div style="margin-top: -35px;
              position:absolute;
              background-color: red;
              margin-left: 30px;
              color: #ffffff;
              text-align: center;
              font-size: 10px;
              line-height: 16px;
              border-radius: 8px;
              z-index: 10;
              width: 16px;
              height: 16px">
            15
          </div>-->
        </div>
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
    <Bottom ref="bottom" :data="funData"
            select="menubrowse"
    />
    <AddCart ref="addcart" @succeedCart="succeedCart" />
  </div>
</template>


<script>
  import Goods from '../components/Goods'
  import Bottom from '../components/Bottom'
  import jglib from '../utils/JGLib'
  import BasePageBack from '../components/BasePageBack'
  import AddCart from '../components/AddCart'

  export default {
    name: 'GoodsBrowse',
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
      BasePageBack,
      AddCart
    },
    async mounted () {
      await this.initData()
      this.succeedCart();
      let title = this.$route.query.title
      if (typeof title === 'undefined') {
        return
      }
      this.title = title
    },
    methods: {
      openCart () {
        this.$router.push({
          path: 'CartList',
          // eslint-disable-next-line standard/object-curly-even-spacing
          query: {title: '購物車' }
        })
      },
      async initData () {
        this.funData = await jglib.getFunList()
        const goods = await jglib.getGoods()
        this.goods = await this.$refs.goods.setGoodsData(goods)
        this.$refs.cubescrollnav.refresh()
      },
      // 加入購物車
      addCart (goods) {
        // console.log(goods, this.$refs)
        this.$refs.addcart.showAddcart = true;
        this.$refs.addcart.setData(goods)
       // this.goodsItem = goods;
      },
      succeedCart () {
        this.cartNum = this.$refs.addcart.getCartLen();
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



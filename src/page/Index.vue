// 主页
<template>
  <div class="index">
    <BaseScroll  @change_handler="changeHandle"
                 :data="goods" ref="BaseScroll">
      <slot slot="header">
        <div class="header-top" ref="headertop"
             >
          <div class="float-left"
               style="width: 22px;height: 18px" @click="onclickMenu">
            <!--<img src="../assets/img/menu.png" alt="">-->
            <i class="glyphicon glyphicon-align-justify"
               style="color:black;font-size: 20px" ref="btnmenu">
            </i>
          </div>
          <div v-show="showHeadTitle" style="color: #ffffff">
            {{shopinfo.shopName}}
          </div>
        </div>
      </slot>
      <slot slot="stickyHeader">
        <StyHeader :shopinfo="shopinfo" :cartBadge="cartBadge" ref="styheader"/>
      </slot>

      <slot slot="cubeScrollNavPanel">
        <Goods :data="goods" ref="goods" :addCart="addCart"/>
      </slot>

    </BaseScroll>
    <!--底部 tabs-->
    <Bottom ref="bottom" :data="funData"/>
    <Menu ref="menu" :data="funData"/>
    <AddCart ref="addcart" @succeedCart="succeedCart" />
  </div>
</template>


<script>
  import BaseScroll from '../components/BaseScroll'
  import Goods from '../components/Goods'
  import Menu from '../components/Menu'
  import Bottom from '../components/Bottom'
  import jglib from '../utils/JGLib'
  import StyHeader from '../components/TopSkyHeader'
  import AddCart from '../components/AddCart';
  export default {
    name: 'index',
    data () {
      return {
        showHeadTitle: false,
       // data: goods,
        goods: [],
        shopinfo: {},
        businesstime: [],
        funData: [],
        direction: '',
        tipStyle: '',
        cartBadge: 0
      }
    },
    components: {
      Bottom,
      BaseScroll,
      Goods,
      Menu,
      StyHeader,
      AddCart
    },
    async mounted () {
     // await jglib.getShopData();
      await this.initData();
    },
    async created () {
      jglib.setOnMessage(this.onMessage.bind(this))
      // document.addEventListener('message', this.onMessage.bind(this))
    },
    methods: {
      changeHandle (comp) {
        if (comp === '') {
          // this.$refs.headertop.style.opacity = 0
          this.$refs.headertop.style.backgroundColor = 'rgba(0, 0, 0, 0)' // 'rgba(0, 0, 0, 0.075)'
          this.$refs.headertop.style.color = '#000'
          this.$refs.btnmenu.style.color = '#000'
          this.showHeadTitle = false
        } else {
          this.$refs.headertop.style.backgroundColor = '#27356b'
          this.showHeadTitle = true
          this.$refs.btnmenu.style.color = '#fff'
        }
        // console.log('txtfun', comp)
      },

      async initData () {
        this.shopinfo = await jglib.getShopInfo();
        this.funData = await jglib.getFunList();
        const goods = await jglib.getGoods();
       // device.console(goods);
        this.goods = await this.$refs.goods.setGoodsData(goods);
        this.$refs.BaseScroll.$refs.cubescrollnav.refresh();
        this.$refs.styheader.setShopTime(this.shopinfo);
        // 購物車 數量
        this.succeedCart();
      },
      async onMessage (msg) {
        // console.log(msg, 'test onMessage')
        // device.console(msg);
        try {
          switch (msg.type.toLowerCase()) {
            case 'init': {
              this.initData();
              break
            }
            case 'collectshop' :
              this.shopinfo.isCollect = msg.isCollect
              break
            default:
              break
          }
          return false
        } catch (e) {
          // alert("erro")
        }
      },

      onclickMenu () {
        this.$refs.menu.openMenu()
      },
      // 加入購物車
      addCart (goods) {
        this.$refs.addcart.showAddcart = true;
        this.$refs.addcart.setData(goods);
      },

      // 購物車 數量
      succeedCart () {
        this.cartBadge = this.$refs.addcart.getCartLen();
      }
    }

  }
</script>


<style>

  .header-top {
    height: 50px;
    padding: 10px 20px;
    /*background-color: rgba(0, 0, 0, 0.075);*/
    background-color: rgba(0, 0, 0, 0);
    color: #ffffff;
    text-align: center;
    font-size: 18px;
    z-index: 100;
    position: fixed;
    width: 100%;
    top:45px
  }
  .header-top img {
    height: 18px;
    width: 22px;
  }

  .stickyHeader {
    -moz-background-size: 100% 100%;
    background-size: 100% 100%;
    height: 320px;
    color: #ffffff
  }

  .stickyHeader .item1 {
    height: 180px;
    padding: 130px 20px 10px;
  }

  /*.stickyHeader .item1 .icon {
    background-color: rgb(39, 53, 107);
    height: 60px;
    width: 60px;
    border-radius: 30px;
    padding-top: 5px;
    text-align: center;
  }*/

  .stickyHeader .item1 .icon div {
    margin-top: 5px;
    font-size: 10px
  }

  .stickyHeader .item1 img {
    height: 23px;
    width: 23px
  }

  .stickyHeader .item2 {
    /*width: 100%;*/
    /*height: 120px;*/
    color: #ffffff;
    padding: 15px 20px;
    /*background-color: #27356b7a;*/
  }




</style>



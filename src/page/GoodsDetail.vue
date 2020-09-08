// 商品詳細
<template>
  <div>
    <BasePageTop ref="basepage">
      <div slot="topview" style="z-index: 2">
        <div>
           <cube-slide :data="goods.browseImage"
                       :interval="4000"
                       :allow-vertical="true"
                       :showDots="goods.browseImage.length>1"
           />
        </div>
      </div>
      <div slot="content" style="z-index: 5;position: relative;">
        <div :style="bgclass"
             style="
              padding-top: 20px;
              padding-bottom: 50px;
              color: #000000;
              z-index: 100;
              ">
          <div class="row" style="margin:0 auto" >
            <div style="margin: -50px 30px 30px;
                 background-color: #ffffff;
                 border-radius: 20px;
                 width: 100%;
                 padding: 20px;"
            >
              <div style="min-height: 200px">
                  <div style="font-size: 26px" >
                    {{goods.name}}
                  </div>
                  <div style="font-size: 20px;margin-top: 10px">
                    {{goods.info}}
                  </div>
                  <div style="font-size: 16px;line-height: 25px;margin-top: 10px">
                    <div v-for="ov in extend.bottomText">
                      {{ov.chr_text}}
                    </div>
                    <!--適合對象：
                    星空紫搭配亞麻色此款強烈對比的挑染適合
                    喜歡有點小叛逆風格女孩~
                    星空紫搭配亞麻色此款強烈對比的挑染適合
                    喜歡有點小叛逆風格女孩~-->
                  </div>
              </div>

              <div style="
                    margin: 30px 0;
                    padding: 5px 0;
                    border-top: 1px solid #707070;"
                   class="row"
              >
                <div class="col" style="padding-left: 0;color: #999999;font-size: 16px ">
                  原價$ {{goods.price*2}}
                </div>
                <div class="col" style="text-align: right;padding-right: 0">
                  ${{goods.price}}
                </div>
              </div>

            </div>
          </div>

          <div style="margin:-20px 10px;
                 padding: 15px;">
            <div style="color: #ffffff">
              其他推薦
            </div>
            <div class="row">
              <div v-for="goods in  goodsAll.goods.menu"
                   style="padding: 10px" class="col-6" >
                <GoodsItem :goods="goods" @addCart="addCart"
                           :refreshData="refreshData"/>
              </div>
            </div>

          </div>
        </div>
      </div>

    </BasePageTop>

    <div class="button-addcart" @click="addCart(goods)">
      加入購物車
    </div>

    <AddCart  ref="addcart" />

  </div>
</template>


<script>
  import BasePageTop from '../components/BasePageTop'
  import jglib from '../utils/JGLib'
  import GoodsItem from '../components/GoodsItem'
  import AddCart from '../components/AddCart'

  export default {
    name: 'GoodsDetail',
    data () {
      return {
        goods: {},
        goodsAll: {},
        bgclass: {
          backgroundImage: 'url(' + require('@/assets/img/bg.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          width: '100%',
          webkitBackgroundSize: 'cover',
          mozBackgroundSize: 'cover',
          oBackgroundSize: 'cover'
        },
        browseImage: [
        ],
        showAddcart: true,
        extend: {}  // 菜单属性
      }
    },
    components: {
      BasePageTop,
      GoodsItem,
      AddCart
    },
    async mounted () {
      let key = this.$route.query.key
      this.refreshData(key);
    },
    methods: {
      // 加入購物車
      addCart (goods) {
        console.log(this.goods)
        this.$refs.addcart.setData(goods)
        this.$refs.addcart.showAddcart = true;
      },
      // 刷新数据
      async refreshData (key) {
        let goods = await jglib.getGoods()
        if (typeof goods.goods.menu === 'undefined') {
          // console.log('asdfasdf')
          return;
        }
        let menuData = goods.goods.menu;
        const cartData = jglib.getCartList();
        const {selected, lens} = cartData;
        for (let n = 0; n < menuData.length; n++) {
          menuData[n].badge = lens[menuData[n].key] || 0;
          menuData[n].selectRemark = '';
          menuData[n].attribute = [];
          for (let d = 0; d < selected.length; d++) {
            if (selected[d].key === menuData[n].key) {
              menuData[n].selectRemark = selected[d].selectRemark;
              menuData[n].attribute = selected[d].attribute;
              break;
            }
          }
        }

        goods.menu = menuData;
        // console.log(goods, 'tesdfasdf')
        this.goodsAll = goods;
        const menu = this.goodsAll.goods.menu;
        menu.map((item) => {
          if (item.key === parseInt(key)) {
            this.goods = item;
            this.browseImage = item.browseImage
            this.$route.query.title = item.name;
            this.$route.query.key = item.key;
            // console.log(this.$route.query)
            this.extend = {};
            try {
              this.extend = JSON.parse(this.goods.extend)
            } catch (e) {
            }
            this.extend = this.extend === null ? {} : this.extend;
            // console.log(this.$refs, 'asdfasd')
            if (this.$refs.basepage.$refs.cubescroll) {
              this.$refs.basepage.$refs.cubescroll.scrollTo(0, 0, 500);
              this.$refs.basepage.$refs.cubescroll.refresh();
            }
          }
        })
      }
    }

  }
</script>


<style>
  .button-addcart {
    background-color: yellow;
    position: fixed;
    bottom: 20px;
    width: 50%;
    height: 50px;
    z-index: 1;
    text-align: center;
    border-radius: 25px;
    margin: 0 auto;
    line-height: 50px;
    color: #000000;
    font-size: 19px;
    font-weight: 500;
    left: 25%;
  }
</style>



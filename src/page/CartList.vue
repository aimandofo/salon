//
<template>
  <div>
    <BasePageBack ref="BasePageBack">
      <div slot="right-btn">
        <div @click="clearCart" style="margin-right: 25px">
            清空
        </div>
      </div>
      <div slot="content" style="margin-top: 30px">
         <div :style="bgpaper" style="padding-top: 20px;min-height: 600px" >
           <div v-for="item in selected"
                style="padding: 10px">
             <div style="margin: 0 15px;
                 /*background-color: yellow;*/
                 border-width: 1px;
                 border-color: #dddddd;
                 border-bottom-style: solid;
                 padding-bottom: 10px"
             >
               <div style="font-size: 21px">{{item.name}}</div>
               <div class="row" style="text-align: center;
                      margin-top: 10px;margin-bottom: 10px;line-height: 26px"
               >
                 <div class="col-6">
                   <div class="d-flex justify-content-between">
                     <div class="carlist-plus-subtract"
                          @click="addNum(-1,item.key)"
                     >
                       -
                     </div>
                     <div style="font-size: 26px">
                       {{lens[item.key]}}
                     </div>
                     <div class="carlist-plus-subtract"
                          @click="addNum(1,item.key)"
                     >
                       +
                     </div>
                   </div>
                 </div>
                 <div class="col-6" style="font-size: 26px">
                   ${{item.selectPrice*lens[item.key] || 0}}
                 </div>
               </div>
               <div style="background-color: #dddddd;margin-top: 15px;" >
                  {{attribute(item.key)}}
               </div>
               <div v-show="item.selectRemark.trim() !== ''"
                    style="margin-top: 10px;">
                 備註：{{item.selectRemark}}
               </div>
             </div>
           </div>
           <div style="height: 100px"></div>
         </div>
        <div class="carlist-button-addcart" >
          <div class="d-flex justify-content-between"
               style="margin-right: 80px;margin-left: 80px;
               background-color: #ffffff">
            <div style="font-size: 26px">合計：</div>
            <div style="font-size: 26px">${{lens['maxPrice'] || 0}}</div>
          </div>
          <img src="../assets/img/btn-sendOrder.png"
               style="height: 100%"
               @click="intoOrder"
          />
        </div>
      </div>

    </BasePageBack>
  </div>
</template>


<script>
  import Goods from '../components/Goods'
  import BasePageBack from '../components/BasePageBack'
  import {saveLocalJsonData} from '../utils/function'
  import constant from '../utils/constant'
  import device from '../utils/device'
  import jglib from '../utils/JGLib';

  export default {
    name: 'CartList',
    data () {
      return {
        cartData: {},
        bgpaper: {
          backgroundImage: 'url(' + require('@/assets/img/pay-paper.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          webkitBackgroundSize: 'cover',
          mozBackgroundSize: 'cover',
          oBackgroundSize: 'cover',
          marginLeft: '25px',
          marginRight: '25px',
          height: '100%'  // (window.headers.height - 100) + 'px',
        },
        selected: [],
        lens: {}
      }
    },
    components: {
      Goods,
      BasePageBack
    },
    async mounted () {
      this.msgid = jglib.setOnMessage(this.onMessage.bind(this),
        'clearGoods');
      await this.initData()
    },
    beforeDestroy () {
      // console.log('beforeDestroy')
      jglib.unOnMessage(this.msgid);
    },
    methods: {
      onMessage (data) {
        if (data.type === 'clearGoods') {
          this.$succeedNotice('订单提交成功')
          this.clearCart();
          setTimeout(() => {
            this.$router.back();
          }, 2000)
        }
      },
      async initData () {
        const { selected, lens } = jglib.getCartList();// getLocalJsonData(constant.CARTDATA);
        this.selected = selected || [];
        this.lens = lens || {}
        // console.log(this.cartData, selected);
      },
      addNum (num, key) {
        this.lens[key] = this.lens[key] + num;
        let selectPrice = 0;
        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i].key === key) {
            selectPrice = this.selected[i].selectPrice
            break;
          }
        }
        // this.lens['maxPrice'] = this.lens['maxPrice'] +
        this.lens['maxPrice'] = this.lens['maxPrice'] + num * selectPrice;
        this.lens['length'] = this.lens['length'] + num
      },
      clearCart () {
        saveLocalJsonData(constant.CARTDATA, null)
        this.selected = [];
        this.lens = {};
      },

      // 屬性
      attribute (key) {
        let selected = null;
        for (let i = 0; i < this.selected.length; i++) {
          if (this.selected[i].key === key) {
            selected = this.selected[i];
            break;
          }
        }
        if (selected === null) {
          return ''
        }
        const attribute = selected.attribute;
        if (typeof attribute === 'undefined') {
          return ''
        }
        let rel = '';
        for (let i = 0; i < attribute.length; i++) {
          if (attribute[i].type === 1) {
            if (attribute[i].value > 0) {
              rel = attribute[i].name + '(' + attribute[i].value + ')' + ' ';
            }

            continue;
          }

          let objlist = attribute[i].objlist;
          for (let n = 0; n < objlist.length; n++) {
            if (objlist[n].select) {
              rel = rel + objlist[n].name + ' ';
              // this.price += parseFloat(objlist[n].money);
            }
          }
        }
        return rel;
      },

      // 提交訂單
      intoOrder () {
        let params = {};
        params['shopid'] = window.headers.shopid; // 商家
        params['puid'] = window.headers.shopid;
        params['selected'] = this.selected;
        params['lens'] = this.lens;
        device.goodsPost(params)
      }

    }

  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .carlist-plus-subtract {
    width: 26px;
    height: 26px;
    background-color: rgb(255, 255, 255);
    color: black;
    border-radius: 15px;
    font-size: 30px;
    line-height: 26px;
    text-align: center;
    border-width: 1px;
    border-color: #000000;
    border-style: solid;
  }
  .carlist-button-addcart {
    position: fixed;
    bottom: 50px;
    width: 100%;
    height: 50px;
    z-index: 1;
    text-align: center;
    margin: 0 auto;
  }
</style>



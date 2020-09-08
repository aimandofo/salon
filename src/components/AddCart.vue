// 商品詳細
<template>
  <div class="addcart">
    <div class="addcart-modal" v-show="showAddcart">
      <div class="addcart-modal-mask" @click="showAddcart=false">
      </div>
      <div class="addcart-modal-content" >
        <div style="text-align:center;margin:10px auto"
             @click="showAddcart=false">
           <img src="../assets/img/icon-down.png" style="width: 28px;height: 8px">
        </div>
        <div style="margin: 0 60px 0 60px">
          <div class="row addcart-modal-content-line" >
            <div class="col-3" style="padding-right: 0;padding-left: 0">
              <img :src="goods.image"
                   style="height: 80px;width: 80px"
              >
            </div>
            <div class="col-9">
              <div style="margin: 10px 0 20px 0">{{goods.name}}</div>
              <div >${{price}}</div>
            </div>
          </div>


          <div class="row addcart-modal-content-line"  >
            <div class="col-3" style="padding-right: 0;
               padding-left: 0">
              數量：
            </div>
            <div class="col-6">
              <div class="d-flex justify-content-between">
              <div class="addcart-modal-content-plus-subtract"
                   @click="addNum(-1)"
              >
                -
              </div>
              <div style="">
                {{value}}
              </div>
              <div class="addcart-modal-content-plus-subtract"
                   @click="addNum(1)"
              >
                +
              </div>
              </div>
            </div>

          </div>
          <div v-for="ov in extend.attribute">
            <div class="row addcart-modal-content-line">
              <div class="col-3" style="padding-right: 0;
                 padding-left: 0;padding-top: 5px">
                  <!--加價:-->
                {{ov.name}}
              </div>
              <div class="col-9">
                  <div v-if="ov.type === 1">
                    <!--<div style="text-align: center">
                      +{{ov.value}}
                    </div>-->
                    <mt-range v-model="ov.value"
                              :min="ov.min"
                              :max="ov.max"
                              :step="1"
                              @change="countprice"
                    >
                      <div slot="start">{{ov.min}}</div>
                      <div slot="end">{{ov.max}}</div>
                    </mt-range>
                    <div style="text-align: center" v-show="ov.value !== 'undefined'">
                        {{typeof ov.value !== 'undefined' ? '$'+ov.value*ov.money : ''}}
                    </div>
                  </div>
                  <div v-else-if="ov.type === 2"
                       style="margin-top: -10px">
                    <button type="button"
                          class="btn btn-primary addcart-modal-content-item"
                          v-for="list in ov.objlist"
                          @click="onSelect(ov,list)"
                          :style="{backgroundColor: (list.select === true? '#ffffff' : '#27356b'),
                          color: (list.select===true ? '#27356b' : '#ffffff')}"
                    >
                       {{list.name}}
                    </button>

                  </div>
                  <div v-else-if="ov.type === 3" style="margin-top: -10px">
                    <button type="button"
                            class="btn btn-primary addcart-modal-content-item"
                            v-for="list in ov.objlist"
                            @click="onSelect(ov,list)"
                            :style="{backgroundColor: (list.select === true? '#ffffff' : '#27356b'),
                          color: (list.select===true ? '#27356b' : '#ffffff')}"
                    >
                      {{list.name}}
                      <span style="height: 30px;width: 30px;margin-left: 5px;"
                            :style="{backgroundColor: (list.color),color:(list.color)}"
                      >
                        色
                      </span>
                    </button>
                  </div>

                </div>

             </div>
          </div>
          <div class="row addcart-modal-content-line"
               style=" margin-top: 20px; "
          >
            <div class="col-3" style="padding-right: 0;
               padding-left: 0;padding-top: 5px">
                備註:
            </div>
            <div class="col-9">
              <input type="text"  class="form-control-plaintext"
                     v-model="remark" style="color: #ffffff">
            </div>
          </div>

          <div class="btn-addcart"
               style="margin: 20px 30px 10px 30px;
               text-align: center"
               @click="onAddCart"
          >
            <img src="../assets/img/btn-send.png"
                 style="height: 45px"
            />
          </div>

        </div>

      </div>
    </div>

  </div>
</template>


<script>
  import {getLocalJsonData, saveLocalJsonData} from '../utils/function'
  import constant from '../utils/constant'
  import jglib from '../utils/JGLib'

  export default {
    name: 'AddCart',
    props: {
      goods: {
        type: Object,
        default: {},
        required: false
      },
      succeedCart: {
        type: Function,
        required: false
      }
    },
    data () {
      return {
        showAddcart: false,
        value: 1,
        remark: '',
        rangeValue: 0,
        extend: {},
        price: 0,
        cartData: {}
      }
    },
    async mounted () {
      // console.log(this.goods, 'addCart')
      this.setData(this.goods);
    },

    methods: {
      setData (goods) {
        if (typeof goods.key === 'undefined') {
          return;
        }
        this.cartData = jglib.getCartList();// getLocalJsonData(constant.CARTDATA)
        this.remark = goods.selectRemark;
        this.value = goods.badge > 0 ? goods.badge : 1;
        this.goods = goods;
        // console.log(goods); // this.cartData, goods, 'setData',
        this.extend = {};
        try {
          this.extend = JSON.parse(goods.extend)
        } catch (e) {
        }
        this.extend = this.extend === null ? {} : this.extend;
        // 購物車屬性
        const { selected } = this.cartData;
        for (let i = 0; i < selected.length; i++) {
          if (selected[i].key === goods.key) {
            // 如果屬性改變 會有問題 200903
            this.extend.attribute = selected[i].attribute
          }
        }
        this.countprice();
      },
      addNum (num) {
        this.value = this.value + num;
        if (this.value < 0) {
          this.value = 0;
        }
      },
      async onAddCart () {
        let goods = this.goods
        goods.attribute = this.extend.attribute;
        // goods.extend = null;
        goods.selectRemark = this.remark;
        goods.selectPrice = this.price;
        let lens = this.cartData.lens || {maxPrice: 0, length: 0};
       // lens = {maxPrice: 0, length: 0};
        // console.log(lens,this.cartData.lens)
        let num = typeof lens[goods.key] !== 'undefined' ? lens[goods.key] : 0;
        // console.log(num)
        lens[goods.key] = this.value;
        const value = this.value - num;
        lens['maxPrice'] = lens['maxPrice'] + parseFloat(this.price) * value;
        lens['length'] = lens['length'] + value;
       // lens['length'] = this.value - num;
        let selected = this.cartData.selected || [];
       // selected = [];
       //  console.log('asdfsdf 111', this.cartData.selected)
        let bol = false;
        for (let i = 0; i < selected.length; i++) {
          if (selected[i].key === goods.key) {
            if (this.value === 0) {
              selected.splice(i, 1)
            } else {
              selected[i] = goods;
            }
            bol = true;
            break;
          }
        }
        if (!bol && this.value > 0) {
          selected.push(goods)
        }

        let cartItem = {
          selected: selected, // goods,
          lens: lens
        }
        // console.log('cartItem', cartItem)
        this.goods.badge = this.value;
        saveLocalJsonData(constant.CARTDATA, cartItem)
        this.$emit('succeedCart', cartItem)
        this.showAddcart = false;
      },
      // 计算价格
      countprice () {
        // 计算价格
        this.price = this.goods.price;
        // console.log(attribute)
        const attribute = this.extend.attribute;
        if (typeof attribute === 'undefined') {
          return
        }
        for (let i = 0; i < attribute.length; i++) {
          let objlist = attribute[i].objlist;
          if (attribute[i].type === 1) {
            let value = typeof attribute[i].value !== 'undefined' ? attribute[i].value : 0
            this.price += value * attribute[i].money;
            continue;
          }
          for (let n = 0; n < objlist.length; n++) {
            if (objlist[n].select) {
              this.price += parseFloat(objlist[n].money);
            }
          }
        }
      },
      // 选择
      onSelect (ov, list) {
        const multiple = typeof ov.multiple !== 'undefined'
                        ? ov.multiple : false;
       // console.log(multiple,ov);
        const extend = this.extend;
        this.extend = {}
        let attribute = extend.attribute;
        for (let i = 0; i < attribute.length; i++) {
          if (attribute[i].type !== ov.type ||
            attribute[i].name !== ov.name) {
            continue;
          }
         // console.log(this.extend.attribute[i].type);
          let objlist = attribute[i].objlist;
          // console.log(objlist);
          for (let n = 0; n < objlist.length; n++) {
            if (objlist[n].name === list.name) {
              objlist[n].select = typeof objlist[n].select !== 'undefined' ? !objlist[n].select : true;
              continue;
            }
            if (!multiple) {
              // 单选处理
              objlist[n].select = false;
            }
          }
          attribute[i].objlist = objlist;
        }
        extend.attribute = attribute;
        this.extend = extend;
        this.countprice();
      },
      // 購物車個數
      getCartLen () {
        const {lens} = getLocalJsonData(constant.CARTDATA);
        if (typeof lens === 'undefined') {
          return 0;
        }
        return lens.length;
      }
    }

  }
</script>


<style>
  .addcart-modal {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.28);
  }
  .addcart-modal-mask {
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .addcart-modal-content {
    background-color: #27356b;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 5px;
    color: #ffffff;
    font-size: 16px;
  }

  .addcart-modal-content-line {
    border-bottom-width: 1px;
    border-bottom-color: #ffffff;
    border-bottom-style: solid;
    padding-bottom: 10px;
    margin-top: 10px;
  }
  .addcart-modal-content-plus-subtract {
    width: 26px;
    height: 26px;
    background-color: rgb(255, 255, 255);
    color: black;
    border-radius: 15px;
    font-size: 30px;
    line-height: 26px;
    text-align: center;
  }
  .addcart-modal-content-item {
    padding: 5px 10px 5px;
    border-width: 1px;
    border-style: solid;
    border-color: #ffffff;
    margin-right: 5px;
    margin-top: 10px;
    line-height: 20px;
    background-color: #27356b;
    border-radius: 5px
  }
  .addcart-modal-content-line .btn-primary:hover {
    color: #fff;
    background-color: #27356b;
    border-color: #27356b;
  }
</style>



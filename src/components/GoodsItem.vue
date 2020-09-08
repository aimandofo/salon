<template>
  <div style="border-radius: 10px;" class="goods-item">
    <div @click="onClickPro(goods)">
      <img :src="goods.image" class="goods-img">
    </div>
    <div  class="goods-content" >
      <div class="goods-name" >
        {{goods.name}}
      </div>
      <div class="goods-price"  >
        ${{goods.price}}
      </div>
      <div class="row goods-price-off" >
        <div class="col" style="padding-right: 0">
          ${{goods.price*2}}
        </div>
        <div class="col off text-truncate">
          50% off
        </div>
        <div class="col img" @click="addCart(goods)" >
          <mt-badge type="success"
                    style="font-size: 10px;
                          position: absolute;
                          right: 5px;
                          top: -10px;
                          padding: 5px;
                          width: 20px;
                          height: 20px;
                          border-radius: 10px;"
                    v-show="goods.badge>0"
          >
            {{goods.badge}}
          </mt-badge>
          <img src="../assets/img/icon-cart.png"  >

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsItem',
    props: {
      goods: {
        type: Object,
        default: {},
        required: true
      },
      refreshData: {
        type: Function,
        default: null
      }
    },
    data () {
      return {}
    },
    methods: {
      onClickPro (item) {
        if (typeof this.refreshData === 'function') {
          this.refreshData(item.key);
          return;
        }
        this.$router.push({
          path: 'GoodsDetail',
          // eslint-disable-next-line standard/object-curly-even-spacing
          query: {title: item.name, key: item.key} // JSON.stringify(item)
        })
       // console.log(item)
      },
      // 加入購物車
      addCart (goods) {
        this.$emit('addCart', goods)
      }
    }
  }
</script>

<style  >
  .goods-item .goods-img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 100%;
  }
  .goods-item .goods-content {
    background-color: #ffffff;
    height: 100px;
    padding: 5px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .goods-item .goods-name {
    height: 40px;
    font-size: 16px;
    color: #000000
  }

  .goods-item .goods-price {
    height: 25px;
    padding: 2px;
    color: #1c1c1c;
    font-size: 16px
  }
  .goods-item .goods-price-off {
    height: 25px;
    padding: 5px;
    font-size: 12px;
    color: #999999
  }
  .goods-item .goods-price-off .off{
    font-size: 12px;
    color: #999999;
    padding-right: 0;
    padding-left: 0;
  }

  .goods-item .goods-price-off .img {
    font-size: 12px;
    margin-top: -5px;text-align: right
  }

  .goods-item .goods-price-off .img img {
    width: 20px;
    height: 19px
  }

</style>

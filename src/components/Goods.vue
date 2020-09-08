<template>
  <div>
    <cube-scroll-nav-panel
      v-for="item in data"
      :key="item.name"
      :label="item.name">
      <div class="row">
        <div v-for="goods in item.goods"
             style="padding: 10px" class="col-6">
          <GoodsItem :goods="goods" @addCart="addCart"/>
        </div>
      </div>
    </cube-scroll-nav-panel>
  </div>
</template>

<script>
  import GoodsItem from './GoodsItem';
  import jglib from '../utils/JGLib'
  export default {
    props: {
      data: {
        type: Array,
        default: [],
        required: true
      },
      addCart: {
        type: Function,
        required: true
      }
    },
    components: {
      GoodsItem
    },
    methods: {
      // 商品數據處理
      async setGoodsData (data) {
        const goodsType = data.goodsType;
        const goods = data.goods.menu;
        let {selected, lens} = jglib.getCartList();
        let tData = []
        for (let i = 0; i < goodsType.length; i++) {
          if (goodsType[i].default === 1) {
            continue
          }
          let item = {}
          item.name = goodsType[i].typename.trim()
          item.type = goodsType[i].id
          item.badge = 0;
          item.goods = []
          for (let n = 0; n < goods.length; n++) {
            if (goods[n].menutype === goodsType[i].id) {
              // 已加入購物車
              // device.console('asdfasdfsad')
              goods[n].badge = lens[goods[n].key] || 0;
              item.badge += goods[n].badge;
              goods[n].selectRemark = '';
              goods[n].attribute = [];
              for (let d = 0; d < selected.length; d++) {
                if (selected[d].key === goods[n].key) {
                  goods[n].selectRemark = selected[d].selectRemark;
                  goods[n].attribute = selected[d].attribute;
                  break;
                }
              }
              item.goods.push(goods[n])
            }
          }
          if (item.goods.length === 0) {
            continue
          }

          tData.push(item)
        }
        return tData
      }
    }
  }
</script>

<style>
  .scroll-nav-goods {
    background-color: #e4e4e4;
  }
  .scroll-nav-goods .view-wrapper {
    background-color: #e4e4e4;
  }
  .scroll-nav-goods .view-wrapper {
    position: fixed;
    top: 0px;
    left: 0;
    bottom: 60px;
    width: 100%;
  }
  .scroll-nav-goods .cube-scroll-nav-panel {
    width: 90%;
    margin: auto;
  }
  .scroll-nav-goods .cube-scroll-nav-panel img {
    width: 100%;
    height: 100%;
  }
  .scroll-nav-goods .cube-scroll-nav-panel ul {
    overflow: hidden;
    font-size: 14px;
    line-height: 1.4;
    color: #666;
  }
  .scroll-nav-goods .cube-scroll-nav-panel li {
    float: left;
    width: 50%;
  }
  .scroll-nav-goods .cube-scroll-nav-panel li div {
    width: 114px;
    margin: 0 auto 15px;
  }
  .scroll-nav-goods .cube-scroll-nav-panel li div p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .scroll-nav-goods .cube-scroll-nav-panel-title {
    padding: 15px;
    font-size: 16px;
    text-align: center;
  }
</style>

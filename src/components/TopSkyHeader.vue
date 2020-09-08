<template>
  <div  class="stickyHeader" >
    <img :src="shopinfo.bgImage" style="height: 100%;width: 100%"/>
    <div style="position: absolute;top: 0;width: 100%">
      <div class="row item1">
        <div class="col-7 col-md-7" style="margin-top: -20px">
          <img :src="shopinfo.logo"
               style="height: 90px;width: 90px">
        </div>
        <div class="col-5 col-md-5" style="margin-top: 15px">
          <div class="float-left icon1" @click="openCutHis">
            <img src="../assets/img/btn-cut.png" style="width: 60px;height: 60px">
            <!--<img src="../assets/img/cut.png">
            <div>發型記錄</div>-->
          </div>
          <div class="float-right icon1" @click="openCart">
            <img src="../assets/img/btn-cart.png"
                 style="width: 60px;height: 60px"
            >
            <!--<img src="../assets/img/shopping.png">
            <div> 購物車</div>-->
            <div class="my-badge" v-show="cartBadge>0">
              {{cartBadge}}
            </div>
          </div>
        </div>
      </div>

      <div style="height: 140px;width: 100%" >
        <img src="../assets/img/bg-logobar.png" width="100%" height="100%"/>
      </div>

      <div class="row item2" style="margin-top: -140px">
        <div class="col-9">
          <div style="font-size: 26px;margin-top: 5px">
            {{shopinfo.shopName}}
          </div>
          <div style="font-size: 12px;margin-top: 10px"
               @click="showTimeList()">
            <div v-for="vo in businesstime"
                 style="display: block;clear: both">
              <img src="../assets/img/icon-phone.png"
                   style="height: 30px;width: 25px;margin-left: -8px">
              星期{{vo.week}}
              <span style="margin-left: 10px">
                   {{vo.time}}
                  </span>
            </div>
          </div>
          <div style="font-size: 12px;margin-top: -5px">
            <img src="../assets/img/icon-local.png"
                 style="height: 30px;width: 25px;margin-left: -8px">
            {{shopinfo.address}}
          </div>
        </div>
        <div class="col-3" style="margin:25px auto;text-align: center"
             @click="onCollect"
        >
          <img src="../assets/img/icon-fav.png"
               style="background-color: #27356b7a;height: 25px;width: 25px;">
          <div style="font-size: 10px;margin-top: 10px;"
               :style="{color:(shopinfo.isCollect === true ? 'red' : '#fff')}"
          >
            收藏
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getChineseWeek} from '../utils/function'
  import device from '../utils/device'
  import jglib from '../utils/JGLib'

  export default {
    name: 'TopSkyHeader',
    props: {
      shopinfo: {
        type: Object,
        default: {},
        required: true
      },
      cartBadge: {
        type: String,
        default: 0
      }
    },
    data () {
      return {
        businesstime: []
      }
    },
    mounted () {
     // console.log(this.shopinfo, 'topskyhe')
    },
    methods: {
      // 明細時間
      showTimeList () {
        let timeData = [];
        let shopTime = this.shopinfo.shopTime
        if (typeof shopTime === 'undefined') {
          return null
        }
        if (shopTime === null || shopTime === '') {
          return null
        }
        try {
          shopTime = JSON.parse(shopTime);
          for (let i = 0; i < shopTime.length; i++) {
            const item = shopTime[i];
            if (item.state === 1) {
              timeData.push({
                content: '星期' + getChineseWeek(i) + ' ' + item.time,
                align: 'left'
              })
            }
          }
        } catch (e) {
        }

        this.$createActionSheet({
          title: '營業時間',
          /* pickerStyle: true, */
          cancelTxt: '關閉',
          data: timeData
        }).show()
      },
      // 时间处理
      setShopTime (shopinfo = null) {
        if (shopinfo === null || typeof shopinfo === 'undefined') {
          return null
        }
        this.shopinfo = shopinfo;
        let shopTime = this.shopinfo.shopTime
        if (typeof shopTime === 'undefined') {
          return null
        }
        if (shopTime === null || shopTime === '') {
          return null
        }
        this.businesstime = []
        let now = new Date();
        let day = now.getDay();
        let nowtime = '';
         // console.log(day);
        try {
          shopTime = JSON.parse(shopTime)
          let bol = false;
          for (let n = 0; n < shopTime.length; n++) {
            const item = shopTime[n];
            if (n === day) {
              nowtime = item.time
            }
            if (item.state === 1) {
              bol = false
              for (let i = 0; i < this.businesstime.length; i++) {
                if (this.businesstime[i].time === item.time) {
                  this.businesstime[i].week = this.businesstime[i].week + getChineseWeek(n)
                  bol = true
                  break
                }
              }
              if (bol === false) {
                this.businesstime.push({
                  time: item.time,
                  week: getChineseWeek(n)
                })
              }
            }
            if (this.businesstime.length > 1) {
              this.businesstime = [];
              this.businesstime.push({
                time: nowtime,
                week: getChineseWeek(day - 1)
              })
            }
          }
        } catch (e) {

        }
      },

      // 點擊收藏
      onCollect () {
        device.collect(this.shopinfo.isCollect)
      },
      openCart () {
        this.$router.push({
          path: 'CartList',
          // eslint-disable-next-line standard/object-curly-even-spacing
          query: {title: '購物車' }
        })
      },
      // 發型記錄
      async openCutHis () {
        const data = await jglib.getFunList()
        let titile = '';
        for (let i = 0; i < data.length; i++) {
          if (data[i].parameter === 'sharepicture') {
            titile = data[i].text;
          }
        }
        await this.$router.push({
          path: 'MyHairstyle',
          query: {title: titile}
        })
      }
    }
  }
</script>

<style>


</style>

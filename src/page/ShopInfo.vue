// 门店简介
<template>
  <div class="shopinfo">
    <BasePageBack  ref="BasePageBack" >
      <div slot="content" style="margin: 0">
        <div>
          <cube-slide :data="shopinfo.browseImage"
                      :interval="4000"
                      :allow-vertical="true"
                      :showDots="shopinfo.browseImage.length>1"
          />
        </div>

        <div class="row item2" style="">
          <div class="col">
            <div style="font-size: 26px;margin-top: 5px">
              {{shopinfo.shopName}}
            </div>
            <div style="font-size: 14px;margin-top: 10px"
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
            <div style="font-size: 14px;margin-top: -5px">
              <img src="../assets/img/icon-local.png"
                   style="height: 30px;width: 25px;margin-left: -8px">
              {{shopinfo.address}}
            </div>
            <div style="font-size: 14px;margin-top: -5px">
              <img src="../assets/img/icon-call.png"
                   style="height: 10px;width: 10px;margin-right: 5px">
              {{shopinfo.phone}}
            </div>
          </div>
        </div>
        <div style="
        margin: 5px 30px -15px 30px; color: yellow;
        font-size: 22px;
        ">
          最新消息
        </div>
        <div style="margin: 30px">
          <BlogsItem />
        </div>
      </div>
    </BasePageBack>
  </div>
</template>


<script>
  import BasePageBack from '../components/BasePageBack'
  import jglib from '../utils/JGLib'
  import {getChineseWeek} from '../utils/function'
  import BlogsItem from '../components/BlogsItem';

  export default {
    name: 'ShopInfo',
    data () {
      return {
        shopinfo: [],
        blogs: []
      }
    },
    components: {
      BasePageBack,
      BlogsItem
    },
    async mounted () {
      this.shopinfo = await jglib.getShopInfo();
      this.setShopTime(this.shopinfo)
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
                week: getChineseWeek(day)
              })
            }
          }
        } catch (e) {

        }
      }
    }
  }
</script>


<style  >
  .shopinfo .cube-slide-item > a > img {
    display: block;
    height: 281px !important;
    width: 100%;
    margin: 0 auto;
  }
  .shopinfo .cube-slide-dots {
    bottom: 10px !important;
  }
  .shopinfo .cube-slide-dots > span {
    display: inline-block;
    vertical-align: bottom;
    margin: 0 10px !important;
    width: 14px !important;
    height:14px !important;
    border-radius: 7px;
    border-color: #ccc;
    border-width: 1px;
    border-style: solid;
    background: #ccc;
  }
  .cube-slide-dots > span.active {
    background: #ffffff !important;
  }

  .shopinfo .item1 img {
    height: 23px;
    width: 23px
  }

  .shopinfo .item2 {
    color: #ffffff;
    padding: 15px 20px;
    margin-right: 0;
    margin-left: 0;
  }

</style>



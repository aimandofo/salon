<template>
  <div>
    <div class="index-bottom" >
      <div class="row"  >
        <div class="col"
             v-for="vo in funlist()"
             @click="clickTabs(vo)"
        >
          <img :src="vo.icon">
          <p class="text" :style="vo.selbol ? {color:'red'} : {color:'#fff'} "> {{vo.text}} </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import device from '../utils/device'

  export default {
    props: {
      data: {
        type: Array,
        default: [],
        required: true
      },
      select: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
      }
    },
    methods: {
      funlist () {
        let rel = [];
        const param = [
          'menubrowse',
          'chat',
          'reservation',
          'paymoney',
          'storedvalue'
        ]
        for (let n = 0; n < param.length; n++) {
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].parameter === param[n]) {
              rel.push({
                parameter: this.data[i].parameter,
                text: this.data[i].text,
                icon: this.data[i].icon,
                islogin: this.data[i].islogin,
                selbol: this.data[i].parameter === this.select
              });
              break;
            }
          }
        }
        return rel;
      },

      clickTabs (item) {
        if (item.parameter === this.select) {
          return;
        }
        switch (item.parameter) {
          case 'menubrowse' :
            this.$router.push({
              path: 'GoodsBrowse',
              // eslint-disable-next-line standard/object-curly-even-spacing
              query: {title: item.text }
            });
            break
          case 'chat' :
            device.openChat();
            break
          case 'paymoney' :
            // 付款
            device.payMoney();
            break;
          case 'storedvalue':
            // 儲值
            device.storedValue();
            break;
          case 'reservation' :
            // 预约
            this.$router.push({
              path: 'Reservation',
              // eslint-disable-next-line standard/object-curly-even-spacing
              query: {title: item.text }
            });
            break
          default:
            break
        }

        // console.log(item)
      }
    }
  }
</script>

<style>
  .index-bottom {
    bottom: 0;
    width: 100%;
    background-color: #27356b;
    padding: 5px 0;
    height: 60px;
    position: fixed;
    z-index: 10;
  }

  .index-bottom .row {
    text-align: center;
    padding: 0 10px;
  }

  .index-bottom .row img {
    height: 28px;
    width: 28px;
    /*border-radius: 20px;*/
  }

  .index-bottom .row p {
    color: #ffffff;
    font-size: 10px;
    margin-top: 7px
  }

</style>

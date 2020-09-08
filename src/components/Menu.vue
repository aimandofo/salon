<template>
  <div>
    <div style="
          background-color: rgba(0, 0, 0, 0.2);
          height: 100%;
          width: 100%;
          position: absolute;
          "
         v-show="visibilityMenu"
         @click="visibilityMenu=false"
    >
    </div>
    <div class="menu" ref="menu" v-show="visibilityMenu">
      <img src="../assets/img/bg-sidebar.png"/>
      <div class="menu-content">
        <div @click="closeMenu">
          <button type="button" class="btn btn-primary"
                  style="background-color: rgba(0, 0, 0, 0);
                  border-color:rgba(0, 0, 0, 0)"
          >
            <img src="../assets/img/icon-close.png"
                 style="width: 20px;height: 20px">
          </button>
        </div>
        <div style="margin-top: 20px;text-align: center">
          <div v-for="vo in funlist(data)"
               style="text-align:center;
                margin-top: 10px;
                margin-bottom: 0px"
               @click="onClickMenuItem(vo)"
          >
            <button type="button" class="btn btn-primary"
            >
            {{vo.text}} <!--门店介绍-->
            </button>
          </div>

        </div>
        <div style="position:fixed;
        bottom: 10px;height: 100px;text-align: center">
          <img src="../assets/img/discount.png"
               style="height: 58px;width: 70px">
          <div style="font-size: 16px;font-weight: bold;">
            檢拾優惠卷
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import device from '../utils/device'
  import Bottom from './Bottom'

  export default {
    components: {Bottom},
    props: {
      data: {
        type: Array,
        default: [],
        required: true
      }
    },
    data () {
      return {
        visibilityMenu: false
      }
    },
    methods: {
      openMenu () {
        this.visibilityMenu = true
      },
      closeMenu () {
        this.visibilityMenu = false
      },
      funlist (data) {
        let rel = []
        const param = [
          'storefront',
          'cook',
          /* 'menubrowse', */
          'sharepicture',
          'viewblogs',
          'order',
          'facilities',
          'leavemessage'
        ]
        // console.log(this.data)
        for (let n = 0; n < param.length; n++) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].parameter === param[n]) {
              rel.push({
                parameter: data[i].parameter,
                text: data[i].text,
                icon: data[i].icon,
                islogin: data[i].islogin
              })
              break
            }
          }
        }
        rel.push({
          parameter: '/',
          text: '回首頁'
        })
        return rel
      },

      onClickMenuItem (item) {
        let page = null;
        this.visibilityMenu = false
        switch (item.parameter) {
          case 'viewblogs':
            page = 'Blogs';
            break
          case 'cook':
            page = 'WorkInfo';
            break
          case 'storefront':
            page = 'ShopInfo';
            break
          case 'sharepicture' :
            // 发型创意
            page = 'MyHairstyle';
            break
          case 'menubrowse' :
            this.$router.push({
              path: 'GoodsBrowse',
              // eslint-disable-next-line standard/object-curly-even-spacing
              query: {title: item.text }
            });
            break
          case '/':
            device.closeView();
            break;
          case 'facilities':
            // 十步設施
            device.openPage(item.parameter, item.text)
            break;
          case 'leavemessage':
            // 留言
            device.openPage(item.parameter, item.text)
            break;
          case 'order':
            device.openPage(item.parameter, item.text)
            break
          default:
            return
        }

        if (page === null) {
          return
        }
        this.$router.push({
          path: page,
            // eslint-disable-next-line standard/object-curly-even-spacing
          query: {title: item.text} // JSON.stringify(item)
        }
        )
      }

    }
  }
</script>

<style>
  .menu {
    height: 100%;
    width: 70%;
    position: absolute;
    top: 0;
    z-index: 100;
    background-color: #7e8c8d;
  }

  .menu img {
    width: 100%;
    height: 100%;
  }

  .menu .menu-content {
    position: absolute;
    top: 20px;
    color: #ffffff;
    left: 20px;
    right: 20px;
    font-weight: bold;
    font-size: 22px;
    padding-top: 45px;
  }
  .menu .menu-content button{
    /*font-weight: bold;*/
    font-size: 22px;
    background-color: rgba(0, 0, 0, 0);
    border-color:rgba(0, 0, 0, 0);
  }
</style>

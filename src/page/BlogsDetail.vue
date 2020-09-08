// 部落格詳細
<template>
  <div class="blogs-detail" >
    <BasePageBack ref="BasePageBack">
      <div slot="content" >
        <img :src="blogslist.image" style="width: 100%;height: 280px">
        <div style="margin: 30px;margin-top: 20px;color: #ffffff">
          <div class="row">
            <div class="col-9">
              {{blogslist.title}}
            </div>
            <div class="col-3">
              <div class="publish">
              {{getPublish(blogslist.publish)}}
              </div>
            </div>
          </div>

          <div class="ftli">
            <img src="../assets/img/facebook.png">
            <img src="../assets/img/twitter.png">
            <img src="../assets/img/line.png">
            <img src="../assets/img/instagram.png">
          </div>
          <div style="font-size: 14px">
            {{blogslist.description}}
          </div>
        </div>
      </div>
    </BasePageBack>
  </div>
</template>


<script>
  import BasePageBack from '../components/BasePageBack'
  import moment from 'moment'
  export default {
    name: 'BlogsDetail',
    data () {
      return {
        blogslist: []
      }
    },
    components: {
      BasePageBack
    },
    async mounted () {
      let data = this.$route.query.data
      if (typeof data === 'undefined') {
        return
      }
      this.blogslist = JSON.parse(data)
      // console.log(blogslist)
    },
    async created () {
    },
    methods: {

      getPublish (time) {
        let ft = moment(time)
        // console.log(ft)
        ft = ft.format('M/D')
        if (ft === 'Invalid date') {
          return moment().format('M/D')
        }
        return ft
      }
    }
  }
</script>


<style scoped>

  .ftli {
    margin-top: 10px;margin-bottom: 10px
  }
  .ftli img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .publish {
    background-color: yellow;
    color: black;
    height: 60px;
    width: 60px;
    border-radius: 30px;
    text-align: center;
    margin: 0px auto;
    padding-top: 20px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

  }


</style>



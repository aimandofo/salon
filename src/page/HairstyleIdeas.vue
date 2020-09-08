// 发型创意
<template>

  <div>
    <BasePageBack ref="BasePageBack"
                  type="scroll-nav-def">
      <div slot="right-btn">
        <div v-show="isMy===true">
          <div>創建</div>
        </div>
      </div>
      <div slot="content">
        <div class="view-wrapper">
           <div>{{$route.query.uid}}  </div>
        </div>

      </div>

    </BasePageBack>
    <Bottom ref="bottom" :data="funData"/>
  </div>
</template>


<script>
  // import Goods from '../components/Goods'
  import Bottom from '../components/Bottom'
  import jglib from '../utils/JGLib'
  import BasePageBack from '../components/BasePageBack'

  export default {
    name: 'HairstyleIdeas',
    data () {
      return {
        funData: [],
        title: '',
        isMy: false
      }
    },
    components: {
      Bottom,
      BasePageBack
    },
    async mounted () {
      this.isMy = this.$route.query.uid === window.headers.userid;
      await this.initData()
    },
    methods: {

      async initData () {
        this.funData = await jglib.getFunList()
      }
    }

  }
</script>


<style lang="stylus" rel="stylesheet/stylus">
</style>



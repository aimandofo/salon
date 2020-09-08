// 我的发型記錄
<template>

  <div>
    <BasePageBack ref="BasePageBack"
                  type="scroll-nav-def">
      <div slot="right-btn">
        <div>
          <div>建立記錄</div>
        </div>
      </div>
      <div slot="content">
        <div class="view-wrapper">
           <div> </div>
        </div>

      </div>

    </BasePageBack>
    <Bottom ref="bottom" :data="funData"/>
  </div>
</template>


<script>
  import Bottom from '../components/Bottom'
  import jglib from '../utils/JGLib'
  import BasePageBack from '../components/BasePageBack'

  export default {
    name: 'MyHairstyle',
    data () {
      return {
        funData: [],
        title: ''
      }
    },
    components: {
      Bottom,
      BasePageBack
    },
    async mounted () {
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



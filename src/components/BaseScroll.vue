<template>
  <div>
    <slot name="header"></slot>
    <div class="scroll-nav-goods">
      <div slot="content">
        <div class="view-wrapper" :style="handleTop">
          <cube-scroll-nav @change="changeHandler"
                           :data="data"
                           :current="data.length>0 ? data[0].name : ''"
                           ref="cubescrollnav"
                           @sticky-change="stickyChangeHandler">
            <div class="sticky-header" slot="prepend" ref="stickyHeader">
              <slot name="stickyHeader"></slot>
            </div>
            <slot name="cubeScrollNavPanel"></slot>
            <div style="padding-bottom :300px"></div>
          </cube-scroll-nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import '../assets/css/app.css'

  const CHANGE_HANDLER = 'change_handler'
  export default {
    props: {
      data: {
        type: Array,
        default: [],
        required: true
      }
    },
    data () {
      return {
        scrollEvents: ['scroll'],
        handleTop: {top: '0px'}
      }
    },
    methods: {
      changeHandler (label) {
       // console.log(this.data,'changeHandler')
       //  console.log('changed to:', label)
      },
      stickyChangeHandler (current) {
       // console.log('sticky-change', current)
        if (current !== '') {
          this.handleTop = {top: '90px'}
        } else {
          this.handleTop = {top: '0px'}
        }
        this.$emit(CHANGE_HANDLER, current)
      }
    }
  }
</script>

<style>


</style>

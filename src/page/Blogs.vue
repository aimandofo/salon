// 部落格
<template>
  <div class="blogs">
    <BasePageBack  ref="BasePageBack" >
      <div slot="content" style="margin: 30px">
        <BlogsItem />
      </div>
    </BasePageBack>
  </div>
</template>


<script>
  import BasePageBack from '../components/BasePageBack'
  import BlogsItem from '../components/BlogsItem'
  export default {
    name: 'Blogs',
    data () {
      return {
      }
    },
    components: {
      BasePageBack,
      BlogsItem
    }
  }
</script>

<style scoped>
</style>



// 部落格 數據
<template>
  <div class="blogs">
  <div v-for="vo in blogs" class="blogsitem">
    <div @click="onClickBlog(vo)">
      <img :src="vo.image">
      <div class="row text" >
        <div class="col-8 colbg">
          <div class="title text-truncate">
            {{vo.title}}
          </div>
          <div class="description">
            {{vo.description}}
          </div>
        </div>
        <div class="col-4 colbg ">
          <div class="publish">
            {{getPublish(vo.publish)}}
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script>
  import jglib from '../utils/JGLib'
  import moment from 'moment';

  export default {
    name: 'BlogsItem',
    data () {
      return {
        blogs: []
      }
    },
    components: {
    },
    async mounted () {
      this.blogs = await jglib.getBlogs()
      // console.log(this.blogs, 'blogs')
    },
    methods: {
      onClickBlog (item) {
        // console.log(item, 'onClickblog')
        this.$router.push({
          path: 'BlogsDetail',
          query: {title: item.title, data: JSON.stringify(item)}
        }
        )
      },
      getPublish (time) {
        try {
          let ft = moment(time)
          // console.log(ft)
          ft = ft.format('M/D');
          if (ft === 'Invalid date') {
            return moment().format('M/D');
          }
          return ft
        } catch (e) {
          return moment().format('M/D');
        }
      }
    }
  }
</script>


<style scoped>
  .blogs .text{
    margin-top: -80px;
    color: #ffffff;
    margin-right: 0;
    margin-left: 0;
    height: 80px;
  }
  .blogs .blogsitem .row .colbg{
    background-color: rgba(0, 0, 0, 0.25);
  }
  .blogs .blogsitem .row .colbg .title{
    font-size: 18px;
    padding-top: 5px;
  }

  .blogs .blogsitem {
    width: 100%;
    margin-bottom: 20px;
  }
  .blogs .blogsitem img {
    width: 100%;
    height: 200px
  }
  .blogs .blogsitem .row .colbg .description{
    color: #ffffff;
    line-height:15px;
    font-size: 12px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin-top: 5px;
    overflow: hidden;
  }
  .blogs .blogsitem .publish{
    background-color: yellow;
    color: black;
    height: 60px;
    width: 60px;
    border-radius: 30px;
    text-align: center;
    margin: 10px auto;
    padding-top: 20px;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

  }


</style>



// work
<template>
  <div class="workinfo">
    <BasePageBack  ref="BasePageBack" >
      <div slot="content" style="margin: 50px 30px 30px;">
        <div v-for="vo in workinfo"
             style="margin-bottom: 20px;height: 360px" >
          <div style="width: 352px;height: 267px;
                  margin: 0 auto 0 0px;">
            <div style="position: absolute;
                   left: 42%;margin: 25px auto 0;">
              <div style="">
                <img :src="vo.headlogo"
                     style="width: 100px;
                      height: 100px;
                      border-radius: 50px;
                      margin: 0 auto;
                      border-width: 3px;
                      border-style: solid;
                      "/>
              </div>
              <div style="margin-top: -30px">
                <span style="margin-left: -45px;">
                  <button type="button" class="btn btn-notstyle"
                          style="margin-right: 10px"
                          @click="work(vo)"
                  >
                  <img src="../assets/img/icon-work.png"
                       style="width: 28px;height: 28px" />
                  </button>
                  <button type="button" class="btn btn-notstyle"
                          @click="chat(vo)"
                  >
                  <img src="../assets/img/work-chat.png"
                       style="width: 28px;height: 28px" />
                  </button>
                </span>

              </div>
            </div>

            <div style="margin-top: -30px">
              <img src="../assets/img/bg-blog-y.png"
                   style="width: 352px;height: 367px;
                   margin-top: 0;margin-left: -20px;"
              />
              <div style="margin-top: -255px;
              margin-left: -5px;
              text-align1: center"
              >
                <div style="margin-left: 150px;
                 margin-top: -35px;text-align: left;
                 padding-left: 80px;
                 padding-right: 20px;"
                     class="text-wrap">
                  {{vo.subtitle}}
                </div>
                <div style="font-size: 15px;text-align: center">
                  {{vo.name}}
                </div>
                <div style="margin-left: 90px;
                    margin-right: 20px;height: 90px;overflow: auto;"  >
                  {{vo.describe}}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </BasePageBack>
  </div>
</template>


<script>
  import BasePageBack from '../components/BasePageBack'
  import jglib from '../utils/JGLib'
  import device from '../utils/device'
  export default {
    name: 'WorkInfo',
    data () {
      return {
        workinfo: []
      }
    },
    components: {
      BasePageBack
    },
    async mounted () {
      this.workinfo = await jglib.getworkinfo();
    },
    async created () {},
    methods: {
      work (item) {
        this.$router.push({
          path: 'HairstyleIdeas',
            // eslint-disable-next-line standard/object-curly-even-spacing
          query: {title: item.name, uid: item.userid} // JSON.stringify(item)
        }
        )
      },
      chat (item) {
        device.openChat(item.userid)
      }
    }
  }
</script>


<style scoped>
</style>



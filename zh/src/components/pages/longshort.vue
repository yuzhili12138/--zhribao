<template>
  <div class="wrapper">
    <div ref="suoyou">
      <div class="header">
        <div class="n1" @touchstart="$router.go(-1)">
          <span class="iconfont back">&#xe614;</span>
        </div>
        <div class="n2">
          <span>{{long_length+short_length}}条评论</span>
        </div>
        <div class="n3" @touchstart="$router.go(-1)">
          <span class="iconfont back">&#xe630;</span>
        </div>
      </div>
      <!-- 长评论，与短品论 -->

      <div class="longer">
        <p>{{long_length}} 条长评</p>
      </div>

      <div class="tupian" v-if="imgShow" ref="img">
        <img src="../../common/images/2_02.jpg" alt>
      </div>

      <div class="pinlun" v-for="i in longarr" :key="i.id">
        <div class="pinlunleft">
          <img :src="i.avatar" alt>
        </div>
        <div class="pinlunright">
          <p>
            {{i.author}}
            <span
              class="iconfont info"
              @touchstart="longshort()"
            >&#xe60c;&nbsp;{{i.likes}}</span>
          </p>
          <div class="ziti">
            {{i.content}}
            <p class="timeer">{{i.time | timeFormat }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="shorter" @touchstart="chuxian($event)">
      <p class="tsete">{{short_length}}条短评</p>
    </div>

    <div v-if="change">
      <div class="pinlun" v-for="i in shortarr" :key="i.id">
        <div class="pinlunleft">
          <img :src="i.avatar" alt>
        </div>
        <div class="pinlunright">
          <p>
            {{i.author}}
            <span
              class="iconfont info"
              @touchstart="longshort()"
            >&#xe60c;&nbsp;{{i.likes}}</span>
          </p>
          <div class="ziti">
            {{i.content}}
            <p class="timeer">{{i.time | timeFormat }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      long_length: 0,
      short_length: 0,
      longarr: [],
      shortarr: [],
      imgShow: true,
      duanpinglun: true,
      change: true
    };
  },
  watch: {},
  filters: {},
  computed: {},
  methods: {
    chuxian(e) {
      // 获取短评论
      if (this.duanpinglun) {
        var id = this.$route.params.id;
        this.$http({
          url: API.long + id + "/short-comments"
        })
          .then(e => {
            this.shortarr = e.data.comments;
            // document.documentElement.scrollTop=this.$refs.img.offsetHeight
          })
          .then(e => {
            var a = this.$refs.suoyou.offsetHeight;
            this.$("body,html").animate({
              scrollTop: a
            });
          });
        this.duanpinglun = false;
        this.change = true;
      } else {
        this.$("body,html").animate(
          {
            scrollTop: 0
          },
          1000,
          () => {
            this.change = false;
            this.duanpinglun = true;
          }
        );
      }
    }
  },
  mounted() {
    var id = this.$route.params.id;

    // 获取长评论
    this.$http({
      url: API.zan + id
    }).then(e => {
      // console.log(e)
      this.long_length = e.data.long_comments;
      this.short_length = e.data.short_comments;

      if (this.long_length > 0) {
        this.imgShow = false;
        this.$http({
          url: API.long + id + "/long-comments"
        }).then(e => {
          this.longarr = e.data.comments;
        });
      }
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';

.header {
  color: white;
  header();
  z-index: 30;
  display: flex;
  div;
  color: white;
  font-size: 0.35rem;
  line-height: 1.2rem;

  span {
    font-size: 0.4rem;
    line-height: 1.2rem;
  }

  .n1 {
    flex: 1;
    margin-left: 0.4rem;
  }

  .n2 {
    flex: 6;

    // font-size 0.16rem!important
    span {
      font-size: 0.35rem !important;
    }
  }

  .n3 {
    float: right;
    margin-right: 0.2rem;
  }
}

.longer {
  margin-top: 1.2rem;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.3rem;
  border-bottom: 1px solid #f4f4f4;

  p {
    color: gray;
  }
}

.pinlun {
  display: flex;
  padding: 0.2rem;
  border-bottom: 1px solid #f4f4f4;

  .ziti {
    padding-right: 0.3rem;
    text-align: justify;
    font-size: 0.24rem;
    line-height: 0.3rem;

    .timeer {
      color: #808080;
      font-size: 0.2rem;
      font-weight: 0;
      font-weight: normal;
    }
  }

  .pinlunleft {
    padding-right: 0.15rem;

    img {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 50%;
      margin-top: 0.1rem;
    }
  }

  .pinlunright {
    flex: 1;

    p {
      color: #000;
      font-size: 0.25rem;
      font-weight: bold;
      line-height: 0.7rem;
      margin 0!important

      span {
        font-size: 0.24rem;
        color: #808080;
        float: right;
        padding-right: 0.1rem;
        font-weight: normal;
      }
    }
  }
}

.tupian {
  img {
    height: 8.6rem;
    width: 100vw;
  }
}

.shorter {
  border-top: 1px solid #f4f4f4;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-left: 0.3rem;
  border-bottom: 1px solid #f4f4f4;

  p {
    // padding 0!important
  }
}

.tsete {
  margin: 0 !important;
}
</style>
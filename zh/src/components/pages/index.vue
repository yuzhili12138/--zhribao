<template>
  <!-- 鼠标各种事件 -->
  <div
    class="wrapper"
    @touchstart="touchstart($event)"
    @touchmove="touchmove($event)"
    @touchend="touchend($event)"
    ref="box"
  >
    <header class="header">
      <i @touchstart="navChange($event)" class="nav iconfont">&#xe62b;</i>
      <span class="shouye">{{headername}}</span>
      <i class="login iconfont">&#xe794;</i>
      <i class="gengduo iconfont">&#xe612;</i>
    </header>
    <!-- 轮播图 -->
    <div class="swper">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="i in banners" :key="i.id">
          <img
            :src="i.image"
            alt
            class="dsdfsdfsd"
            @touchstart="touchstart($event,i.id)"
            @touchmove="touchmove($event,i.id)"
            @touchend="touchend($event,i.id)"
          >
          <div
            class="banner_tit"
            @touchstart="touchstart($event,i.id)"
            @touchmove="touchmove($event,i.id)"
            @touchend="touchend($event,i.id)"
          >{{i.title}}</div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 今日新闻 -->

    <div class="daynews" v-for="(i,index) in news" :key="index">
      <p class="xinwen">{{i.data.date}}</p>
      <ul class="woshiul">
        <li
          v-for="b in i.data.stories"
          :key="b.id"
          @touchstart="touchstart($event,b.id)"
          @touchmove="touchmove($event,b.id)"
          @touchend="touchend($event,b.id)"
        >
          <div>{{b.title}}</div>
          <img :src="b.images" alt>
        </li>
      </ul>
    </div>

    <!-- <div class="daynews" v-for='(i,index) in news'>
      <p class="xinwen">{{热门情况}} </p>
      <ul>
        <li v-for="i in news" :key="i.id">
          <div>{{i.title}}</div>
          <img :src="i.images" alt>
        </li>
      </ul> 
    </div>-->
    <!-- //导航,蒙板 -->
    <div class="mask" v-show="isShow" @touchstart="touchmask()">
      <!-- nav界面 -->
      <div class="con" ref="navCC" @touchstart="buuule($event)">
        <div class="con_header">
          <div class="con_h_t">
            <img src="../../common/images/timg.jpg" alt class="touxiang">
            <span class="con_name">what's your names</span>
          </div>
          <div class="con_h_b">
            <div class="xing" @touchstart="mede()">
              <span class="iconfont">&#xe625;</span>我的收藏
            </div>
            <div class="xiazai">
              <span class="iconfont">&#xe639;</span>离线下载
            </div>
          </div>
        </div>
        <div class="con_shouye">
          <span class="iconfont">&#xe60f;</span>首页
        </div>
        <div>
          <!-- nav内容区域现在为空白 -->
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
      banners: [],
      news: [],
      newss: [],
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0,
      screenHight: 0,
      scollTop: 0,
      riqi: "",
      date: "",
      num: 0,
      titile: {},
      biaoti: "",
      headername: "首页",
      isShow: false,
      kongzhi: true
    };
  },
  watch: {},
  computed: {},

  methods: {
    // 收藏
    mede() {
      this.$router.push("/wode");
    },

    link(id) {
      this.$router.push("/daynews/" + id);
    },
    //不冒泡
    buuule(e) {
      if (e.stopPropagation()) {
        e.stopPropagation;
      } else {
        e.cancelBubble = true;
      }
      e.returnValue = false;
      e.preventDefault();
    },
    touchmask() {
      this.$(".con").animate(
        {
          left: "-300%"
        },
        400,
        () => {
          this.isShow = !this.isShow;
        }
      );

      this.$(".mask").animate(
        {
          opacity: 0
        },
        400
      );
    },
    // 点击出现左边导航栏
    navChange(e) {
      this.isShow = !this.isShow;
      this.$(".con").animate(
        {
          left: 0
        },
        400
      );
      this.$(".mask").animate(
        {
          opacity: 1
        },
        200
      );
    },
    // 鼠标事件
    touchstart(e, id) {
      // console.log(e.touches[0].clientY)
      this.startY = e.touches[0].clientY;
      this.endY = 0;

      this.startX = e.touches[0].clientX;
      this.endX = 0;
    },
    touchmove(e, id) {
      this.endY = e.touches[0].clientY;
      this.endX = e.touches[0].clientX;
    },

    touchend(e, id) {
      // console.log(id)
      if (this.endY == 0) {
        if (id) {
          this.$router.push("/daynews/" + id);
          return;
        }
      } else {
        if (this.endY > this.startY + 30) {
          console.log("下化");
        }

        if (this.startY > this.endY + 30) {
          console.log("上划");
        }
        if (this.endX > this.startX + 30) {
          console.log("右划");
        }
        if (this.startX > this.endX + 30) {
          console.log("左划");
        }

        //获取整个框架的高度
        if (this.$refs.box.clientHeight) {
          var boxhight = this.$refs.box.clientHeight;
        }

        //屏幕到最后的时候加载数据

        if (this.kongzhi) {
          if (this.scollTop + this.screenHight > boxhight) {
            // 只可以运行一次
            this.kongzhi = false;
            this.data = new Date(this.data.getTime() - 24 * 60 * 60 * 1000);
            // console.log(this.data)

            var year = this.data.getFullYear();
            var month =
              this.data.getMonth() + 1 >= 10
                ? this.data.getMonth() + 1
                : "0" + (this.data.getMonth() + 1);
            var day = this.data.getDate();
            day = day >= 10 ? day : "0" + day;
            var week = this.data.getDay();
            var days = [
              "星期日",
              "星期一",
              "星期二",
              "星期三",
              "星期四",
              "星期五",
              "星期六"
            ];
            var weeks = days[week];
            //年月日格式
            this.riqi = String(year) + String(month) + String(day);

            this.$http({
              url: API.before + this.riqi
            })
              .then(d => {
                d.data.date =
                  String(month) + "月" + String(day) + "日" + " " + weeks;
                this.news.push(d);
                // console.log(this.news)
                // 加载完之后才为真
                this.kongzhi = true;
              })
              .catch(err => {
                console.log(err);
              });

            //   this.news.push(String(month)+'月'+String(day)+'日'+weeks)
          }
        }

        // console.log('--------------')
        // console.log(this.scollTop)
        // console.log(t_height)
        // console.log('--------------')
      }
    },
    // 实时监听滚动条
    handleScroll(e) {
      this.scollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      // 轮播高度
      if (document.getElementsByClassName("swper")[0]) {
        var x1Top = document.getElementsByClassName("swper")[0].offsetHeight;
      }

      if (this.scollTop < x1Top) {
        this.headername = "首页";
      }
      // 更换标题下滑

      // 头部高度
      if (document.getElementsByClassName("header")[0].offsetHeight) {
        var header_height = document.getElementsByClassName("header")[0]
          .offsetHeight;
      }

      var xinwen2last = document.getElementsByClassName("xinwen2");
      //判断网页中有没有这么元素
      if (xinwen2last.length > 0) {
        // 最后一个news2到顶部高度
        var x2Top =
          xinwen2last[xinwen2last.length - 1].offsetTop == "undefined"
            ? "undefined"
            : xinwen2last[xinwen2last.length - 1].offsetTop;

        var x2height =
          xinwen2last[xinwen2last.length - 1].offsetHeight == "undefined"
            ? "undefined"
            : // 最后一个news2自身高度
              xinwen2last[xinwen2last.length - 1].offsetHeight;
      }

      if (this.scollTop <= x2Top + x2height + header_height) {
        xinwen2last[xinwen2last.length - 1].className = "xinwen";
        if (xinwen2last.length - 1 != -1) {
          this.headername = xinwen2last[xinwen2last.length - 1].innerText;
        }
      }

      //一直滑动一只判断
      if (document.getElementsByClassName("xinwen")[0]) {
        var t_height = document.getElementsByClassName("xinwen")[0].offsetTop;
      }

      var header_height = document.getElementsByClassName("header")[0]
        .offsetHeight;

      if (document.getElementsByClassName("xinwen")[0]) {
        var t_name = document.getElementsByClassName("xinwen")[0].innerText;
      }

      if (t_height <= this.scollTop + header_height) {
        this.headername = t_name;
        document.getElementsByClassName("xinwen")[0].className = "xinwen2";
      }
    }
  },

  mounted() {
    //实时监听滚动条
    window.addEventListener("scroll", this.handleScroll, true);
    //获取今日
    this.data = new Date();
    //   获取屏幕高度
    if (document.documentElement.clientHeight) {
      this.screenHight = document.documentElement.clientHeight;
    }


// 进来加载2次，一次今天的新闻，一次昨天的新闻
    this.$http({
      url: API.index
    })
      .then(d => {
        //banner图
        this.banners = d.data.top_stories;
        console.log(d);
        d.data.date = "今日热闻";
        this.news.push(d);
        // console.log(this.news);
      })
      .then(d => {
        this.data = new Date(this.data.getTime() - 24 * 60 * 60 * 1000);
        // console.log(this.data)
        var year = this.data.getFullYear();
        var month =
          this.data.getMonth() + 1 >= 10
            ? this.data.getMonth() + 1
            : "0" + (this.data.getMonth() + 1);
        var day = this.data.getDate();
        day = day >= 10 ? day : "0" + day;
        var week = this.data.getDay();
        var days = [
          "星期日",
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六"
        ];
        var weeks = days[week];
        //年月日格式
        this.riqi = String(year) + String(month) + String(day);

        this.$http({
          url: API.before + this.riqi
        })
          .then(d => {
            d.data.date =
              String(month) + "月" + String(day) + "日" + " " + weeks;
            this.news.push(d);
            // console.log(this.news)
            // 加载完之后才为真
            this.kongzhi = true;
          })
          .catch(err => {
            console.log(err);
          });
      });
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/styl/index.styl';

// 头部
.header {
  header();
  z-index: 30;
  display: flex;

  .nav {
    tubian();
    font-size: $dian5;
    padding: 0 0.3rem;
  }

  .shouye {
    tubian();
    font-size: 0.33rem;
    flex: 10;
  }

  .login {
    tubian();
    font-size: $dian5;
    padding: 0 0.2rem;
    flex: 1;
  }

  .gengduo {
    tubian();
    font-size: $dian5;
    padding: 0 0.2rem;
    flex: 1;
  }
}

// 轮播图
.swper {
  margin-top: 1.2rem;
  height: 3.5rem;
  position: relative;

  img {
    height: 3.5rem;
    width: 100vw;
  }

  >>>.mint-swipe-indicator {
    background-color: gray;
    opacity: 1;
    width: 6px;
    height: 6px;
    margin: 0px 2px;
  }

  >>>.is-active {
    background-color: white;
  }

  .banner_tit {
    banner_t();
  }
}

// 今日新闻
.daynews {
  padding: 0 0.18rem;
  background-color: $bgc;

  .xinwen {
    height: 0.9rem;
    line-height: 0.9rem;
    color: #858585;
    // padding 0 0.1rem
    padding: 0rem 0.1rem 0rem 0.1rem;
    margin: 0px 0 !important;
  }

  .xinwen2 {
    height: 0.9rem;
    line-height: 0.9rem;
    color: #858585;
    // padding 0 0.1rem
    padding: 0rem 0.1rem 0rem 0.1rem;
    margin: 0px 0 !important;
  }

  .woshiul {
    overflow: hidden;
    padding-left: 0;

    li {
      display: flex;
      height: 1.5rem;
      background-color: #fff;
      border-radius: 0.1rem;
      margin-bottom: 0.2rem;
      box-shadow: 0rem 0.01rem 0.06rem gray;
      text-align: justify;
    }

    div {
      flex: 1;
      padding: 0.2rem;
      font-size: 0.3rem;
    }

    img {
      // vertical-align auto
      padding: 0.15rem;
      height: 1.2rem;
      width: 1.4rem;
    }
  }
}

.woshiul li:nth-last-child(1) {
  margin-bottom: 0rem;
}

// 导航
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  .con {
    position: absolute;
    top: 0;
    left: -300%;
    background-color: #fff;
    width: 85%;
    height: 100vh;

    .con_header {
      height: 2rem;
      background-color: $parbgc;

      .con_h_t {
        height: 1rem;
        vertical-align: middle;
        padding-left: 0.2rem;

        .touxiang {
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 50%;
          margin: 0.1rem auto;
        }

        .con_name {
          margin-left: 0.2rem;
          color: white;
          line-height: 1rem;
          font-size: 0.25rem;
        }
      }
    }

    .con_h_b {
      width: 100vw;
      display: flex;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 0.28rem;
      margin-top: 0.4rem;

      .xing {
        flex: 1;

        span {
          font-size: 0.3rem;
          margin-right: 0.3rem;
        }
      }

      .xiazai {
        flex: 1;
        margin-right: 0.1rem;

        span {
          font-size: 0.3rem;
          margin-right: 0.3rem;
        }
      }
    }
  }
}

.con_shouye {
  shouye();

  span {
    // margin 0.3rem
    spanspan();
  }
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 假如内容过长，一屏放不下，滚动条下拉覆盖不全 */
.ivu-spin-fix {
  position: fixed;
}
</style>


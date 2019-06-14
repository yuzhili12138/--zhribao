<template>
  <div class="wrapper">
    <header class="header">
      <i @touchstart="navChange($event)" class="nav iconfont">&#xe62b;</i>
      <span class="shouye">{{length}} 条收藏</span>
    </header>
    <ul class="woshiul">
        <li
          v-for="b in scArr"
          :key="b.id"
          @touchstart="touchstart($event,b.id)"
          @touchmove="touchmove($event,b.id)"
          @touchend="touchend($event,b.id)"
        >
          <div>{{b.title}}</div>
          <img :src="b.images" alt>
        </li>
      </ul>




<div class="mask" v-show="isShow" @touchstart="touchmask()">
      <!-- nav界面 -->
      <div class="con" ref="navCC" @touchstart="buuule($event)">
        <div class="con_header">
          <div class="con_h_t">
            <img src="../../common/images/timg.jpg" alt class="touxiang">
            <span class="con_name">名字</span>
          </div>
          <div class="con_h_b">
            <div class="xing" @touchstart='mede()'>
              <span class="iconfont">&#xe625;</span>我的收藏
            </div>
            <div class="xiazai">
              <span class="iconfont">&#xe639;</span>离线下载
            </div>
          </div>
        </div>
        <div class="con_shouye" @touchstart='$router.push("/")'>
          <span class="iconfont"
          >&#xe60f;</span>首页
        </div>
        <div>
          <!-- nav内容区域现在为空白 -->
        </div>
      </div>
    </div>
  </div>
</template>




<script type="text/ecmascript-6">
import sc from '../../components/common/index'
import API from '../../common/js/API'
export default {
  components: {},
  props: {},
  data() {
    return {
        isShow: false,
        scArr:[],
        length:0
    };
  },
  watch: {},
  computed: {},
  methods: {
      touchstart(e,id) {
      // console.log(e.touches[0].clientY)
      this.startY = e.touches[0].clientY;
      this.endY = 0;

      this.startX = e.touches[0].clientX;
      this.endX = 0;
    },
    touchmove(e,id) {
      this.endY = e.touches[0].clientY;
      this.endX = e.touches[0].clientX;
    },

    touchend(e, id) {
      if (this.endY == 0) {
        if (id) {
          this.$router.push("/daynews/" + id);
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
      }
    },
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
    }
    
  },
  mounted() {
      var sc=JSON.parse(localStorage.getItem('arr'))

      this.length=sc.length
      for(let i  in  sc){
        this.$http({
        url:API.info+sc[i]
    }).then(e=>{
        this.scArr.push(e.data)
    })          
    }
    
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/styl/index.styl';
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
  shouye()

  span {
    // margin 0.3rem
    spanspan()
  }
}


.woshiul {
    overflow: hidden;
    padding 1.3rem 0.2rem 0.5rem
    li {
      display: flex;
      height: 1.5rem;
      background-color: #fff;
      border-radius: 0.1rem;
      margin-bottom: 0.2rem;
      box-shadow: 0rem 0.01rem 0.06rem gray;
      text-align justify
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


.woshiul li:nth-last-child(1) {
  margin-bottom: 0rem;
}
     
</style>
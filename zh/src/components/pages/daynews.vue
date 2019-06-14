<template>
  <div class="wrapper">
    <div class="header">
      <div class="n1" @touchstart="$router.go(-1)">
        <span class="iconfont back">&#xe614;</span>
      </div>
      <div class="n2" @touchstart="b()">
        <span class="iconfont share" >&#xe63f;</span>
      </div>
      <div class="n3">
        <span class="iconfont xing" @touchstart="xing()">&#xe625;</span>
      </div>
      <div class="n4">
        <span class="iconfont info" @touchstart="longshort()">
          &#xe607;
          <i>{{pinlun}}</i>
        </span>
      </div>
      <div class="n5" @touchstart="dianzanzan()">
        <span class="iconfont zan">
          &#xe60c;
          <i class="changered">{{dianzan}}</i>
        </span>
      </div>
    </div>
    <div class="dongxi">
      <img :src="div_img" alt class="name">
    </div>
    <div class="head_b" v-html="div_str"></div>
    <!-- 分享 -->
    <div class="mask" v-show="shareing" @touchstart.self='shareing=false'>
          <div class="con" @touchstart.stop>
         <div class="con_title">
           分享
         </div>
      <div class="bdsharebuttonbox"><a href="#" class="bds_more" data-cmd="more"></a><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
      <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a></div>

          </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import Allarr from '../../components/common'
import API from "../../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      div_str: "",
      div_img: "",
      pinlun: 0,
      dianzan: 0,
      is: true,
      id: "",
      yellow: true,
      shareing:false
    };
  },
  watch: {},
  computed: {},
  methods: {
    b(){
      console.log('111111')
      this.shareing=true
    },
    xing() {

      var laArr=JSON.parse(localStorage.getItem('arr'))?JSON.parse(localStorage.getItem('arr')):[]
      
      if (this.yellow) {
        document.querySelector(".xing").style.color = "yellow";
        laArr.push(this.id)
        this.yellow = false;   
        localStorage.setItem('arr',JSON.stringify(laArr))
      } else {
        document.querySelector(".xing").style.color = "";
        this.yellow = true;

        for(let a in laArr){
          if(laArr[a].indexOf(this.id)!=-1){
          laArr.splice(a,1)
          }
          localStorage.setItem('arr',JSON.stringify(laArr))
        }
      }
      //  console.log(Allarr.Allarr)
    },
    longshort() {
      this.$router.push("/longshort/" + this.id);
    },

    dianzanzan() {
      //  console.log(this.is)
      if (this.is) {
        this.dianzan = Number(this.dianzan) + 1;
        document.querySelector(".zan").style.color = "#FF8C00";
        this.is = false;
      } else {
        this.dianzan = Number(this.dianzan) - 1;
        document.querySelector(".zan").style.color = "";
        this.is = true;
      }
    }
  },
  mounted() {
    //判断是否收藏
    this.id = this.$route.params.id;
    var a = this.$route.params.id;
    //  console.log(a)

    this.$http({
      url: API.info + a
    }).then(e => {
      // console.log(e);
      this.div_str = e.data.body;
      this.div_img = e.data.image;
    });
    //   获取点赞
    this.$http({
      url: API.zan + a
    }).then(e => {
      // console.log(e);
      this.pinlun = e.data.comments;
      this.dianzan = e.data.popularity;
    });

          if(JSON.parse(localStorage.getItem('arr'))){
                var a=JSON.parse(localStorage.getItem('arr'))
          for(let b in a){
        // console.log(Allarr.Allarr[b])
            if(a[b].indexOf(this.id)!=-1){
            document.querySelector(".xing").style.color = "yellow";
            this.yellow = false;
            return 
          }else{
            document.querySelector(".xing").style.color = "";
          }
      }
          }
        
          // console.log(typeof(JSON.parse()))
      



  }
};
</script>

<style lang='stylus' scoped>
@import '../../common/styl/index.styl';
@import url('http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3');
.header {
  header();
  z-index: 30;
  display: flex;

  div {
    color: white;
    font-size: 0.35rem;

    span {
      font-size: 0.4rem;
      line-height: 1.2rem;

      i {
        font-size: 0.3rem;
        margin: 0.1rem;
      }
    }
  }

  .n1 {
    flex: 3;
    margin-left: 0.4rem;
  }

  .n2 {
    flex: 1.5;
  }

  .n3 {
    flex: 1.5;
  }

  .n4 {
    flex: 2.5;
  }

  .n5 {
    flex: 2.5;
  }
}
.bdselect_share_box{
  display block !important;
}
.head_b {
  height: 3.5rem;
  position: relative;

  .banner_tit {
    banner_t();
  }

  >>>.headline .img-place-holder {
    height: 0px;
  }
}

.changered {
  color: white !important;
}

.dongxi {
  margin-top: 1.2rem;
  height: 3.5rem;

  img {
    width: 100vw;
    height: 100%;
  }
}
.mask
  background rgba(0,0,0,0.5)
  width 100vw
  height 100vh
  position fixed
  left 0
  top 0
  z-index 3000
  .con
    position fixed
    width 5rem
    height 5rem
    left 0
    top 0
    right 0
    bottom 0
    margin auto 
    background white
.bdsharebuttonbox
  position absolute
  left 0
  top 0
  width 5rem
  height 5rem

>>>.bdshare-button-style0-32 a
  display block
  width 80px!important
  height 51px!important
  margin-left: 0.1rem!important
.con_title
  // height 1rem
  font-size 0.4rem
  margin 0.3rem 
  // line-height 2rem
.bdsharebuttonbox
  margin-top .8rem
  margin-left .5rem
</style>


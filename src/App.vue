<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import { removeToken } from "@/utils/auth";
import { removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
import { mapGetters } from 'vuex'
export default {
  name: 'APP',
  computed: {
    ...mapGetters([
      'ProcessWsMessage',
      'processBlockAllList',
      'socket',
    ])
  },
  watch: {
    'ProcessWsMessage'(newVal) {
      const { msg, show } = newVal;
      if (show) {
        // this.$gtmessage({ message: '来信息了', type: 'success' });
        this.$gtmessage.success(msg);
        // console.log(' this.$store', this.$store.getters);
        // this.$store.commit('clearMessage');
        this.$store.dispatch('ws/clearMessage') //isProcessWsMessage
      }
    },
  },
  created() {
    if (sessionStorage.getItem("vuexstate")) {
      // console.log("created ---  从Session里面获取储存值 ..." + sessionStorage.getItem("vuexstate"))
      console.log("created ---  从store里面获取储存值 ..." + this.$store.state)
      let sizeInBytes = new Blob([sessionStorage.getItem("vuexstate")]).size;
console.log(`storeState 的近似大小为 ${sizeInBytes} 字节`);
      let storeState = JSON.parse(sessionStorage.getItem("vuexstate"));
      console.log('storeState',storeState);
      // 从原始数据中删除 ws 相关的部分
      // delete storeState.ws;
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          storeState
        )
      )
      sessionStorage.removeItem("vuexstate");
    }
    // console.log("created ---   结束")
    window.addEventListener("unload", this.saveState);
    window.addEventListener("beforeunload", this.saveState);

    // 存储需要记录的数据
    localStorage.setItem("refreshTime", new Date().getTime().toString());
  },
  mounted() {
    // 从本地存储中读取记录的数据
    const refreshTime = localStorage.getItem("refreshTime")
    console.log(`页面刷新时间：${new Date(parseInt(refreshTime)).toLocaleString()}`)
    if (this.$store.state.ws && this.$store.state.ws.isItConnected) {
      const data = {
        id: '101',
        token: this.$store.getters.token,
      }
      this.$store.dispatch('ws/onopenWebSocket', data)
      // this.onopenWebSocket()
      console.log('ws--app-true');
    } else {
      console.log('ws--app-false');
    }

    window.addEventListener("beforeunload", this.saveState);
    window.addEventListener("unload", this.saveState);
    window.addEventListener("load", () => {
      // console.log("加载完成，移除Session中的数据 ...");
      sessionStorage.removeItem("vuexstate");
    });
  },
  beforeDestroy() {
    // removeToken();
    // resetRouter();
    console.log('ws断开连接');
    // alert('ws断开连接')
    this.$store.dispatch('ws/disconnectWebSocket') // ws断开连接
  },
  destroyed() {
    this.$store.dispatch('ws/disconnectWebSocket') // ws断开连接
  }, //生命周期 - 销毁完成
  onDestroy() {
    //  alert('关闭浏览器');
    window.removeEventListener('beforeunload', this.saveState)
    window.removeEventListener("unload", this.saveState);
    // this.$store.commit("user/RESET_STATE");
    // alert("destroyed !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  },
  methods: {

    onopenWebSocket() {
      const data = { id: '101', token: store.getters.token, }
      console.log('刷新连接ws:onopenWebSocket');
      this.$store.dispatch('ws/onopenWebSocket', data)
    },
    disconnectWebSocket() {
      console.log('退出ws断开连接');
      this.$store.dispatch('ws/disconnectWebSocket') // ws断开连接
    },
    saveState() {
      // console.log("保存状态到Session ...");
      // window.sessionStorage["isopened"] = true;
      let storeState = this.$store.state
      // // 从原始数据中删除 ws 相关的部分
      // console.log(storeState,'storeState');
      // delete storeState.ws;
      sessionStorage.setItem("vuexstate", JSON.stringify(storeState));
    },
    // 定义一个函数来过滤状态中的特定属性  
    // filterState(key, value) {
    //   // 如果键是 'ws'，则返回 undefined（这样它就不会被包含在最终的字符串中）  
    //   // 否则，返回原始值  
    //   if (key === 'ws') {
    //     return undefined;
    //   }
    //   return value;
    // }
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

/* 加这个，隐藏el-scrollbar水平滚动条，下拉框显示不全*/
.el-scrollbar__wrap {
  overflow-x: hidden;
}

/* 加了这个，下拉框完整显示*/
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
  overflow: scroll !important;
}

.el-drawer__body {
  height: 0;
}

/*解决 富文本菜单  tinymce导致富文本弹窗在el-dialog后的问题*/
.tox-tinymce-aux {
  z-index: 9999 !important;
}

.el-table-filter {
  padding: 10px;
  overflow: auto;
}
</style>
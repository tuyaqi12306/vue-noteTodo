<template>
  <div class="editPage">
    <Setting
      v-if="showSetting"
      @closeSetting="showSetting = false"
      :todo="todo"
    ></Setting>
    <div class="header-fix">
      <span class="left iconfont">&#xeb8f;</span>
      <span class="right">
        <span class="iconfont shezhi" @click="showSetting = true">
          &#xe6a0;
        </span>
        <span class="iconfont" @click="goHome">&#xe617;</span>
      </span>
    </div>
    <div class="editContainer">
      <van-field
        :style="{ backgroundColor: todo.backgroundColor }"
        v-model.trim="todo.todoText"
        autosize
        type="textarea"
        placeholder="记笔记..."
      />
      <div class="foot" @click="addNote">
        保存
      </div>
    </div>
  </div>
</template>
<script>
import "../font/iconfont.css";
import Vue from "vue";
import Setting from "./Setting";
import { Field } from "vant";
Vue.use(Field);

export default {
  name: "Editing",
  components: {
    Setting
  },
  data() {
    return {
      message: "",
      showSetting: false
    };
  },
  methods: {
    addNote() {
      if (!this.todo.todoText) {
        this.$store.state.todos.pop();
        // this.$store.commit("addTodo", {
        //   id: this.id,
        //   todoText: text,
        //   showDeleteBox: false,
        //   backgroundColor: "rgb(223, 250, 255)"
        // });
      }
      this.saveValueToLocal();
      this.$router.push({ path: "/" });
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    saveValueToLocal() {
      // 存储 localStorage 数据为 Json 格式
      let todos = JSON.stringify(this.$store.state.todos);
      window.localStorage.setItem("key", todos);
    }
  },
  beforeCreate() {
    const id = Number(this.$route.params.id);
    const todos = this.$store.state.todos;
    if (!todos.filter(it => it.id === id)[0]) {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    todo() {
      const id = Number(this.$route.params.id);
      const todos = this.$store.state.todos;
      return todos.find(it => it.id === id);
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../common/stylus/variable";
.iconfont {
  font-family: "iconfont" !important;
  font-size: 36px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.editPage {
  position: relative;
}
/* 首部固定样式 */
.header {
  height: 180px;
}
.header-fix {
  box-sizing: border-box;
  height: 80px;
  padding: 20px;
  line-height: 40px;
  background-color: rgb(183, 223, 255);
}
.left {
  float: left;
}
.right {
  float: right;
}
.shezhi {
  margin-right: 80px;
}
.title-name {
  height: 80px;
  font-size: 44px;
  font-weight: 700;
}
.tab-item .router-link-active {
  color: $color-theme;
}
/* 笔记主体内容样式 */
.editContainer {
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
}
.van-cell {
  height: calc(100vh - 80px);
  font-size: 30px;
  background-color: rgb(205, 233, 255);
}
.foot {
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 22px;
  line-height: 50px;
  text-align: center;
  background-color: #ccc;
}
</style>

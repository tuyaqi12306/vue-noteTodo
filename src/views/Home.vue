<template>
  <div class="home">
    <div class="header">
      <div class="header-fix">
        <span class="left iconfont" @click="newTodo">&#xeb8f;</span>
        <span class="right">
          <span class="iconfont settingIcon">&#xe61f;</span>
          <span class="iconfont">&#xe617;</span>
        </span>
      </div>
      <div class="title-name">便笺</div>
    </div>
    <form action="/">
      <van-search
        v-model="value"
        placeholder="搜索..."
      />
    </form>
    <ul>
      <!-- 带冒号的双引号里面可当作js表达式， 对象的属性也可以是表达式 -->
      <li
        v-for="(item, index) in showTodos"
        :key="item.id"
        :style="{ 'background-color': item.backgroundColor, boxShadow: '0 0 20px ' + item.backgroundColor }"
      >
        <router-link :to="'/editing/' + item.id">
          <p>{{ item.todoText }}</p>
        </router-link>
        <span class="iconfont delete" @click="showDeleteItem(index)"> &#xe601; </span>
        <div class="deleteItemBox" v-if="item.showDeleteBox">
          <div class="confirmBox">
            <p>是否要删除此笔记？</p>
            <div><input type="radio" />不再询问</div>
            <div class="confirmButton">
              <span @click="deleteItem(index)">删除</span>
              <span @click="showDeleteItem(index)">保留</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import "../font/iconfont.css";
import Vue from "vue";
import { Search } from "vant";
import { mapState } from "vuex";
// store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
// 拿到store中的所有状态，避免一个一个都声明为计算属性
Vue.use(Search);

export default {
  name: "Home",
  components: {},
  data() {
    return {
      value: "",
      itemBackgroundColor: {
        background: "rgb(255,255,255,0)",
        boxShadow: "inset 0 10px 10px rgb(255,255,255,0)"
      }
    };
  },
  computed: {
    // todos() {
    //   // store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
    //   return this.$store.state.todos;
    // }
    ...mapState({
      todos: "todos"
    }),
    showTodos() {
      return this.todos.filter(it => it.todoText.includes(this.value));
    }
  },
  methods: {
    // onSearch(val) {
    //   Toast(val);
    // },
    newTodo() {
      const length = this.$store.state.todos.length;
      let newId;
      if (length == 0) {
        newId = 1;
      } else {
        newId = this.$store.state.todos[length - 1].id + 1;
      }
      this.$store.state.todos.push({
        id: newId,
        todoText: "",
        showDeleteBox: false,
        backgroundColor: "rgb(223, 250, 255)"
      });
      this.$router.push("/editing/" + newId);
    },
    showDeleteItem(index) {
      this.todos[index].showDeleteBox = !this.todos[index].showDeleteBox;
    },
    deleteItem(index) {
      this.todos.splice(index, 1);
      this.showDeleteBox = false;
      this.saveValueToLocal();
    },
    changedBgColor(index) {
      if (index != 0) {
        this.itemBackgroundColor.background = "#fff";
      } else {
        this.itemBackgroundColor.background = "rgb(255,255,255,0)";
      }
    },
    getStorageValue() {
      // 读取 localStorage 中 Json 格式数据
      let value = localStorage.getItem("key");
      if (value) {
        let jsonValue = JSON.parse(value);
        this.$store.state.todos = jsonValue;
      }
    },
    saveValueToLocal() {
      // 存储 localStorage 数据为 Json 格式
      let todos = JSON.stringify(this.$store.state.todos);
      localStorage.setItem("key", todos);
    }
  },
  created() {
    // localStorage的方法非常简单，就是基本的增删查：
    // getItem(name)：根据指定的名字name获取对应的值。
    // setItem(name, value)：为指定的name设置一个对应的值。
    // removeItem(name)：删除由name指定的名值对。
    this.getStorageValue();
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../common/stylus/variable"
.iconfont {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.home {
  height: 100vh;
  background-image: url("../imgs/bg-empty.jpg");
  background-size: 100%;
}
// 首部样式
.header {
  height: 180px;
}
.header-fix {
  box-sizing: border-box;
  height: 80px;
  pading: 20px;
  line-height: 40px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.settingIcon {
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
// 搜索框样式
.van-search{
  padding: 0;
  background-color: #eee;
}
.van-cell {
  font-size: 30px;
  line-height: 60px;
  border-radius: 5px;
  background-color: #eee;
}
.van-search__content {
  padding-left: 0;
}
// 下拉列表样式
ul {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
ul li {
  height: 60px;
  margin: 10px 0;
  position: relative;
  /* border-style: insert; */
  background-color: rgb(205, 233, 255);
}
.delete {
  display: none;
}
li:hover .delete {
  display: inline-block;
  position: absolute;
  right: 20px;
  top: 15px;
  cursor: pointer;
}
li:hover .delete::before {
  content: "删除笔记";
  display: block;
  width: 80px;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  position: absolute;
  left: -20px;
  top: -35px;
  text-align: center;
  background-color: #fff;
}
// 删除此笔记样式
.deleteItemBox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.6);
  // opacity: 0.5;
  z-index: 666;
}
.confirmBox {
  box-sizing: border-box;
  width: 260px;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  // opacity: 1;
  z-index: 888;
}
.confirmButton {
  // float: right;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.confirmButton > * {
  width: 70px;
  height: 30px;
  display: inline-block;
  margin: 0 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
  background-color: rgb(238, 238, 238);
}
.confirmButton > *:hover{
  background-color: rgb(0, 124, 191);
}
</style>

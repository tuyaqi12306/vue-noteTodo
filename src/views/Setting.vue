<template>
  <div class="settingContainer">
    <div class="horizontal">
      <label
        v-for="item in colorList"
        :key="item.backgroundColor"
        :class="{ active: todo.backgroundColor === item.backgroundColor }"
        @click="changeBackgroundColor(item)"
      >
        <input type="radio" name="bgcSeting" hidden />
      </label>
    </div>
    <div class="twoRow">
      <div @click="showNoteList">
        <span class="iconfont">&#xe600;</span>
        笔记列表
      </div>
      <div @click="deleteNote">
        <span class="iconfont">&#xe601;</span>
        删除笔记
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Setting",
  props: ["todo"],
  data() {
    return {
      colorList: [
        { backgroundColor: "rgb(255, 230, 110)" },
        { backgroundColor: "rgb(161, 239, 155)" },
        { backgroundColor: "rgb(255, 175, 223)" },
        { backgroundColor: "rgb(215, 175, 255)" },
        { backgroundColor: "rgb(158, 223, 255)" },
        { backgroundColor: "rgb(209, 209, 209)" },
        { backgroundColor: "rgb(118, 118, 118)" }
      ]
    };
  },
  computed: {
    // todos() {
    //   return this.$store.state.todos;
    // }
  },
  methods: {
    changeBackgroundColor(item) {
      this.todo.backgroundColor = item.backgroundColor;
      this.$emit("closeSetting");
    },
    showNoteList() {
      this.$router.push({ path: "/" });
    },
    deleteNote() {
      let length = this.$store.state.todos.length;
      for (let i = 0; i < length; i++) {
        if (this.$store.state.todos[i].id === this.todo.id) {
          this.$store.state.todos.splice(i, 1);
          break;
        }
      }
      this.saveValueToLocal();
      this.$router.push({ path: "/" });
    },
    saveValueToLocal() {
      // 存储 localStorage 数据为 Json 格式
      let todos = JSON.stringify(this.$store.state.todos);
      localStorage.setItem("key", todos);
    }
  }
};
</script>

<style scoped>
.settingContainer {
  width: 100%;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
}
.horizontal {
  width: 100%;
  display: flex;
}
.horizontal * {
  height: 100px;
  flex: 1;
  box-sizing: border-box;
}
.active {
  border: 1px solid #666;
}
/* input {
  display: hidden;
} */
.horizontal :nth-child(1) {
  background-color: rgb(255, 230, 110);
}
.horizontal :nth-child(2) {
  background-color: rgb(161, 239, 155);
}
.horizontal :nth-child(3) {
  background-color: rgb(255, 175, 223);
}
.horizontal :nth-child(4) {
  background-color: rgb(215, 175, 255);
}
.horizontal :nth-child(5) {
  background-color: rgb(158, 223, 255);
}
.horizontal :nth-child(6) {
  background-color: rgb(209, 209, 209);
}
.horizontal :nth-child(7) {
  background-color: rgb(118, 118, 118);
}
.twoRow {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 10px;
  background: #fff;
  box-shadow: inset 0 -10px 10px rgb(209, 209, 209);
}
.twoRow * {
  height: 60px;
  box-sizing: border-box;
  padding: 10px;
}
.twoRow *:hover {
  color: red;
}
.iconfont {
  margin-right: 20px;
  font-size: 20px;
}
</style>

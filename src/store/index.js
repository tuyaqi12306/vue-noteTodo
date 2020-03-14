import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 组件里的DOM元素触发事件，通过掉用this.$store.commit方法，然后去触发mutations改变state.
export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        todoText: "aaa",
        showDeleteBox: false,
        backgroundColor: "rgb(223, 250, 255)"
      },
      {
        id: 2,
        todoText: "bbb",
        showDeleteBox: false,
        backgroundColor: "rgb(161, 239, 155)"
      },
      {
        id: 3,
        todoText: "ccc",
        showDeleteBox: false,
        backgroundColor: "rgb(255, 175, 223)"
      }
    ]
  },
  // mutation 必须是同步函数
  mutations: {
    // 第一个参数为state,此处是占位符
    addTodo(_, todo) {
      this.state.todos.push(todo);
    }
  },
  actions: {},
  modules: {}
});

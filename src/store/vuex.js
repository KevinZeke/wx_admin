import Vue from "vue"
import Vuex from "vuex"
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
//import actions from "./actions";
import createLogger from "vuex/dist/logger"

Vue.use(Vuex);

//判断是否处在开发环境，如果是就开启vuex的数据来源监测，是否通过mutations的方法来改变state数据
const debug = process.env.NODE_ENV !== "production";

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    //actions,
    strict:debug,
    //log插件，查看数据
    plugins:debug?[createLogger()]:[]
});

export default store;
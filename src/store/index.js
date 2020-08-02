import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blogs: [],
    activeBlog: {},
    profile: {},
  },
  mutations: {
    setBlogs(state, blogsData) {
      state.blogs = blogsData
    },
    setActiveBlog(state, blogData) {
      state.activeBlog = blogData
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
  },
  actions: {
    async getBlogs({ commit }) {
      try {
        let res = await api.get("blogs")
        console.log(res.data)
        commit("setBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getActiveBlog({ commit }, blogId) {
      try {
        let res = await api.get("blogs/" + blogId)
        console.log(res.data);
        commit("setActiveBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },

    async addComment({ commit }, data) {
      try {
        let res = await api.post("comments/", { blogId: data.route, body: data.comment, creatorEmail: data.userEmail })
        console.log("comment posted");
        this.dispatch("getActiveBlog", data.route)
      } catch (error) {
        console.error(error)
      }
    },

    // AUTH 0 FUNCTIONS
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

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
    userBlogs: [],
    userComments: [],
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
    setUserBlogs(state, blogs) {
      state.userBlogs = blogs
    },
    setUserComments(state, comments) {
      state.userComments = comments
    }
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

    async publishBlog({ commit }, data) {
      try {
        let res = await api.post("blogs/", data)
        console.log(res)
        this.dispatch("getUserBlogs")
      } catch (error) {
        console.error(error);
      }
    },

    async editBlog({ commit }, data) {
      try {
        let res = await api.put("blogs/" + data.route, data.newBlog)
        console.log(res)
        this.dispatch("getActiveBlog", data.route)
      } catch (error) {
        console.error(error);
      }
    },

    async deleteBlog({ commit }, blogId) {
      try {
        let res = await api.delete("blogs/" + blogId)
      } catch (error) {
        console.error(error);
      }
    },

    async deleteComment({ commit }, commentId) {
      try {
        await api.delete("comments/" + commentId)
        this.dispatch("getActiveBlog", this.state.activeBlog.blog._id)
      } catch (error) {
        console.error(error);
      }
    },

    async getUserBlogs({ commit }) {
      try {
        let res = await api.get("profile/blogs/")
        console.log(res)
        commit("setUserBlogs", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async getUserComments({ commit }) {
      try {
        let res = await api.get("profile/comments/")
        console.log(res)
        commit("setUserComments", res.data)
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

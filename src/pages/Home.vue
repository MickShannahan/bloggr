<template>
  <div class="component">
    <h1 class="my-3 mb-4 ml-1">Welcome to Bloggr</h1>
    <div class="row justify-content-center">
      <div class="card-columns col-11">
        <Blog v-for="blog in blogs" :blogData="blog" :key="blog._id" />
      </div>
    </div>
  </div>
</template>


<script>
import Blog from "../components/Blog";
export default {
  name: "component",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBlogs");
    this.$store.dispatch("getProfile");
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
  },
  methods: {},
  components: { Blog },
};
</script>


<style>
</style>
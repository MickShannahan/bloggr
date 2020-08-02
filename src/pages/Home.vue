<template>
  <div class="component">
    <h1 class="mb-3">Welcome to Bloggr</h1>
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
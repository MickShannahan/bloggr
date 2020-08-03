<template>
  <div
    class="Blog card col-blog-block corners shadow-sm mb-3 bg-light border-0"
    @click="moveToBlogDetail"
  >
    <div class="creator-bubble">
      <img class="img-fluid" :src="blogData.creator.picture" alt />
    </div>
    <div class="overlay-fade corners-b"></div>
    <div class="bg-primary corners-t p-1 pl-4 text-light">
      <small class="text-fade pl-1">{{nameNoEmail}}</small>
    </div>
    <h5 class="pl-2 pt-1 mb-0 border-rounded corners-t border-bottom">{{blogData.title}}...</h5>
    <div class="pb-3 pr-3 pl-3 height-body overflow-hidden">{{blogData.body}}</div>
  </div>
</template>


<script>
export default {
  name: "Blog",
  data() {
    return {};
  },
  computed: {
    nameNoEmail() {
      let reducedName = this.blogData.creator.name.split("@");
      return reducedName[0];
    },
  },
  methods: {
    moveToBlogDetail() {
      this.$store.dispatch("getActiveBlog", {});
      this.$router.push({
        name: "BlogDetail",
        params: { id: this.blogData._id },
      });
    },
  },
  components: {},
  props: ["blogData"],
};
</script>


<style scoped>
.col-blog-block {
  border-top-right-radius: 0%;
  border-top-left-radius: 0%;
  border-bottom: 4px solid rgba(109, 110, 0, 0.5) !important;
  width: 28vw;
  min-height: 15vh;
  max-height: 32vh;
}
.overlay-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 10% 0;
  background-image: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.75)
  );
}
.creator-bubble {
  box-shadow: 2px 2px rgba(9, 54, 54, 0.5);
  background-color: rgb(178, 201, 162);
  text-overflow: clip;
  overflow: hidden !important;
  width: 35px;
  height: 35px;
  top: -10px;
  left: -15px;
  position: absolute;

  border-radius: 45%;
}
.height-body {
  max-height: 20vh;
}
</style>
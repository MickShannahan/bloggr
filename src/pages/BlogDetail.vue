<template>
  <div class="row justify-content-center m-3">
    <div class="col-3 author-card-blog bg-light corners px-0 mr-2 drop-shadow">
      <img class="img-fluid mb-3 corners-t" :src="blog.creator.picture" alt />
      <h5 class="text-center p-2">{{nameNoEmail}}</h5>
    </div>
    <div class="col bg-light corners drop-shadow">
      <div class="row corners bg-darker">
        <div
          class="col-12 bg-primary corners-t p-2 pl-4 mb-0 text-light d-flex align-items-center justify-content-between"
        >
          <h4>{{blog.title}}</h4>
          <small class="text-fade ml-4">{{blog.createdAt}}</small>
          <i class="fa fa-heart mr-3"></i>
        </div>
        <div class="BlogDetail col-12 bg-light corners-b text-dark shadow-sm border-bottom p-3">
          {{blog.body}}
          <button
            v-if="this.$auth.isAuthenticated"
            class="btn col-3 offset-9 btn-outline-warning btn-block p-0"
            data-toggle="collapse"
            data-target="#comment-form"
          >comment</button>
        </div>
        <form id="comment-form" class="collapse col-12 p-2" @submit.prevent="addComment">
          <div class="form-group">
            <input
              v-model="commentInput"
              type="text"
              name
              id
              class="form-control"
              placeholder="enter you comment"
              aria-describedby="helpId"
            />
          </div>
          <button type="submit" class="btn btn-warning btn-block p-1">post comment</button>
        </form>

        <div
          v-for="comment in comments"
          :key="comment.id"
          class="BlogDetail col-12 corners-b p-3 pl-5 border-bottom"
        >{{comment.body}}</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "BlogDetail",
  data() {
    return {
      commentInput: "",
    };
  },
  mounted() {
    this.$store.dispatch("getActiveBlog", this.$route.params.id);
    console.log(this.$auth.userInfo.email);
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog.blog;
    },
    comments() {
      return this.$store.state.activeBlog.comments;
    },
    nameNoEmail() {
      let reducedName = this.blog.creator.name.split("@");
      return reducedName[0];
    },
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment", {
        route: this.blog._id,
        comment: this.commentInput,
        userEmail: this.$auth.userInfo.email,
      });
      $(".collapse").collapse("hide");
    },
  },
  components: {},
};
</script>


<style>
.author-card-blog {
  max-height: 50vh;
}
</style>
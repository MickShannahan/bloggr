<template>
  <div class="row p-4">
    <!-- MODAL -->
    <div class="modal fade" id="createBlog" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <form class="modal-content corners" @submit.prevent>
          <div class="modal-header">
            <h5 name="title" class="modal-title">What to write...</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <div aria-hidden="true">&times;</div>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input v-model="blogTitle" class="form-control" />
            </div>
            <div class="form-group">
              <textarea v-model="blogContent" class="form-control blog-body" id="message-text"></textarea>
              <small id="helpId" class="form-text text-muted">make it a good one</small>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" @click="publishBlog(false)">Save Draft</button>
            <button class="btn btn-warning" data-dismiss="modal" @click="publishBlog(true)">Post</button>
          </div>
        </form>
      </div>
    </div>

    <div class="col font-italic">
      <h5>{{nameNoEmail + "'s blogs"}}</h5>
      <div
        v-for="blog in userBlogs"
        :key="blog._id"
        class="col-12 p-2 corners"
        @click="moveToPage(blog.id)"
      >
        <div class="row bg-light corners drop-shadow">
          <div
            class="bg-primary corners-t col-12 d-flex align-items-center justify-content-between p-3 text-light"
          >
            <h5>{{blog.title}}</h5>
            <small class="text-fade">{{blog.createdAt}}</small>
          </div>
          <p class="col-12 bg-light pl-4 pt-2">{{blog.body}}</p>
        </div>
      </div>
    </div>
    <div class="col-5 corners bg-light mx-2">
      <div class="row about text-center drop-shadow corners justify-content-center">
        <h1 class="bg-primary corners-t text-light p-1 w-100">{{nameNoEmail}}</h1>
        <img class="rounded col-12" :src="profile.picture" alt />
        <p class="col-12">{{ profile.email }}</p>
        <div class="col-12 corners-b border-bottom shadow-sm">
          <button
            class="btn btn-warning m-3 font-weight-bold"
            data-toggle="modal"
            data-target="#createBlog"
          >+blog</button>
          <h5>comments on other blogs</h5>
        </div>
        <div
          v-for="comment in userComments"
          :key="comment.id"
          class="col-12 px-2 p-1 corners-b border-bottom"
        >
          {{comment.body}}
          <i
            class="fa fa-arrow-right text-secondary"
            @click="moveToPage(comment.blogId)"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      blogContent: "",
      blogTitle: "",
    };
  },
  mounted() {
    this.$store.dispatch("getProfile");
    this.getUserBlogs();
    this.getUserComments();
  },
  computed: {
    blogs() {
      this.$store.state.blogs;
    },
    profile() {
      return this.$store.state.profile;
    },
    nameNoEmail() {
      if (this.profile != {}) {
        let reducedName = this.profile.name.split("@");
        return reducedName[0];
      }
    },
    userBlogs() {
      if (this.$store.state.userBlogs.length > 0) {
        return this.$store.state.userBlogs;
      } else {
        return [{ body: "this user hasn't written any blogs yet" }];
      }
    },
    userComments() {
      let comments = this.$store.state.userComments;
      // comments.filter(
      //   (comment) =>
      //     comment.blogId == this.blogs.find(blog.id == comment.blogId).id
      // );
      return comments;
    },
  },
  methods: {
    getUserBlogs() {
      this.$store.dispatch("getUserBlogs");
    },
    getUserComments() {
      this.$store.dispatch("getUserComments");
    },
    moveToPage(blogId) {
      this.$router.push({ name: "BlogDetail", params: { id: blogId } });
    },

    publishBlog(input) {
      this.$store.dispatch("publishBlog", {
        title: this.blogTitle,
        body: this.blogContent,
        imgUrl: "",
        tags: [],
        published: input,
        creatorEmail: this.profile.email,
      });
      this.closeModal();
    },

    closeModal() {
      $("#createBlog").modal("toggle");
    },
  },
  components: {},
};
</script>

<style scoped>
img {
  max-width: 100px;
}

.blog-body {
  min-height: 25vh;
  max-width: 100%;
}
</style>

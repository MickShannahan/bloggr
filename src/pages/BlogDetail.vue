<template>
  <div class="row justify-content-center m-3">
    <div class="modal fade" id="editBlog" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <form class="modal-content corners" @submit.prevent>
          <div class="modal-header">
            <h5 name="title" class="modal-title">Making Changes...</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <div aria-hidden="true">&times;</div>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input v-model="editBlogTitle" class="form-control" />
              <small id="helpId" class="form-text text-muted">Change up the title maybe?</small>
            </div>
            <div class="form-group">
              <textarea v-model="editBlogBody" class="form-control blog-body" id="message-text"></textarea>
              <small id="helpId" class="form-text text-muted">Grammer is important</small>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline-primary" @click="toggleModal">cancel</button>
            <button class="btn btn-warning" data-dismiss="modal" @click="editPost">Post Changes</button>
          </div>
        </form>
      </div>
    </div>

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
          <small class="text-fade ml-4 mr-3">{{blog.createdAt}}</small>
          <div v-if="user.email == blog.creator.email">
            <!-- EDIT BUTTON -->
            <button @click="toggleModal" class="btn">
              <i class="fa btn fa-file-text text-light"></i>
            </button>
            <!-- DELETE BUTTON -->
            <button @click="deletePost" class="btn">
              <i class="fa btn fa-times text-light"></i>
            </button>
          </div>
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
        >
          <div class="row">
            <div class="col-11">
              {{comment.body}}
              <small
                class="text-secondary ml-3"
              >{{comment.creator.name.split("@")[0]}}</small>
            </div>
            <button
              v-if="comment.creator.email == user.email"
              class="col btn btn-outline-dark p-0 pb-1 mr-1"
              @click="deleteComment(comment.id)"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
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

      editBlogTitle: "",
      editBlogBody: "",
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

    user() {
      return this.$auth.userInfo;
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

    editPost() {
      this.$store.dispatch("editBlog", {
        route: this.blog.id,
        newBlog: {
          title: this.editBlogTitle,
          body: this.editBlogBody,
        },
      });
      this.closeModal();
    },
    deletePost() {
      this.$store.dispatch("deleteBlog", this.blog.id);
      this.$router.push({ name: "Home" });
    },
    deleteComment(commentId) {
      this.$store.dispatch("deleteComment", commentId);
    },
    toggleModal() {
      this.editBlogTitle = this.blog.title;
      this.editBlogBody = this.blog.body;
      $("#editBlog").modal("toggle");
    },
  },
  components: {},
};
</script>


<style>
.author-card-blog {
  max-height: 50vh;
}

.blog-body {
  min-height: 25vh;
  max-width: 100%;
}
</style>
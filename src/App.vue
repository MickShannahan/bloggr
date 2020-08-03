<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
import { setBearer, api } from "./store/AxiosStore";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      setBearer(this.$auth.bearer);
      //NOTE if you want to do something everytime the user logs in, do so here
    }
  },
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

.text-fade {
  color: rgba(255, 255, 255, 0.651);
}

.bg-darker {
  background-color: rgb(239, 240, 222);
}
.corners-t {
  border-top-right-radius: 18px !important;
}
.corners-b {
  border-bottom-left-radius: 18px !important;
}

.corners {
  border-top-right-radius: 18px !important;
  border-bottom-left-radius: 18px !important;
}

.drop-shadow {
  box-shadow: 2px 2px rgba(9, 54, 54, 0.5);
}
</style>

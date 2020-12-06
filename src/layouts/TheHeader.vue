<template>
  <!-- Navigation -->
  <div class="fixed-top">
    <header class="topbar">
      <div class="container">
        <div class="row">
          <!-- social icon-->
          <div class="col-sm-12">
            <ul class="social-network">
              <li>
                <a class="waves-effect waves-dark" href="#"
                  ><i class="fa fa-facebook"></i
                ></a>
              </li>
              <li>
                <a class="waves-effect waves-dark" href="#"
                  ><i class="fa fa-twitter"></i
                ></a>
              </li>
              <li>
                <a class="waves-effect waves-dark" href="#"
                  ><i class="fa fa-linkedin"></i
                ></a>
              </li>
              <li>
                <a class="waves-effect waves-dark" href="#"
                  ><i class="fa fa-pinterest"></i
                ></a>
              </li>
              <li>
                <a class="waves-effect waves-dark" href="#"
                  ><i class="fa fa-google-plus"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
    <nav class="navbar navbar-expand-lg navbar-dark mx-background-top-linear">
      <div class="container">
        <a class="navbar-brand" href="#" style="text-transform: uppercase"
          >MakeTodo</a
        >
        <div class="collapse navbar-collapse">
          <router-link to="/"><li class="menu-item">Home</li></router-link>
           <div class="vlock-wrap d-flex" v-if="userIsLoginded && loginedUserName !=''">
          <li class="menu-item mr-4">
            <span class="mr-2"><i class="far fa-user"></i></span> {{ loginedUserName }}
          </li>
          <li  class="menu-item" @click="signOut">
            Log Out<span class="ml-2"><i class="fas fa-door-open"></i></span>
          </li>
           </div>
          <li v-else class="menu-item">
            <router-link to="/register">Register</router-link>
          </li>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from "firebase/app";

/* import {mapGetters} from 'vuex'; */
export default {
  data() {
    return {};
  },

  methods: {
     signOut() {
      firebase
        .auth()
        .signOut()
        .then(function () {
           location.reload()
        })
        .catch(function (error) {
          console.log(error)
        });
    },
  },

  computed: {
    userIsLoginded() {
      return this.$store.state.userStatus;
    },
    loginedUserName() {
      return this.$store.state.userName;
    },

  /*   ...mapGetters(['logOutUser']) */
  },

      created(){
    firebase.auth().onAuthStateChanged((user)=>{
       if(user){
          this.$store.state.userName = user.displayName;
          this.$store.state.userStatus = true;
       }
    })
  }
  
};
</script>


<style scoped>
.navbar {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 5px;
}

.menu-item > a {
  color: #ffffff;
  cursor: pointer;
}
.menu-item {
  color: #ffffff;
  cursor: pointer;
}

.navbar-collapse {
  max-width: 350px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

/*
headeer top
*/
.topbar {
  background-color: #212529;
  padding: 0;
}

.topbar .container .row {
  margin: -7px;
  padding: 0;
}

.topbar .container .row .col-md-12 {
  padding: 0;
}

.topbar p {
  margin: 0;
  display: inline-block;
  font-size: 13px;
  color: #f1f6ff;
}

.topbar p > i {
  margin-right: 5px;
}
.topbar p:last-child {
  text-align: right;
}

header .navbar {
  margin-bottom: 0;
}

.topbar li.topbar {
  display: inline;
  padding-right: 18px;
  line-height: 52px;
  transition: all 0.3s linear;
}

.topbar li.topbar:hover {
  color: #1bbde8;
}

.topbar ul.info i {
  color: #131313;
  font-style: normal;
  margin-right: 8px;
  display: inline-block;
  position: relative;
  top: 4px;
}

.topbar ul.info li {
  float: right;
  padding-left: 30px;
  color: #ffffff;
  font-size: 13px;
  line-height: 44px;
}

.topbar ul.info i span {
  color: #aaa;
  font-size: 13px;
  font-weight: 400;
  line-height: 50px;
  padding-left: 18px;
}

.mb-class {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

ul.social-network {
  border: none;
  margin: 0;
  padding: 0;
}

ul.social-network li {
  border: none;
  margin: 0;
}

ul.social-network li i {
  margin: 0;
}

ul.social-network li {
  display: inline;
  margin: 0 5px;
  border: 0px solid #2d2d2d;
  padding: 5px 0 0;
  width: 32px;
  display: inline-block;
  text-align: center;
  height: 32px;
  vertical-align: baseline;
  color: #000;
}

ul.social-network {
  list-style: none;
  margin: 5px 0 10px -25px;
  float: right;
}

.waves-effect {
  position: relative;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  vertical-align: middle;
  z-index: 1;
  will-change: opacity, transform;
  transition: 0.3s ease-out;
  color: #fff;
}
a {
  color: #0a0a0a;
  text-decoration: none;
}

li {
  list-style-type: none;
}
.bg-image-full {
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
  -o-background-size: cover;
}
.bg-dark {
  background-color: #222 !important;
}

.mx-background-top-linear {
  background: -webkit-linear-gradient(45deg, #2a9d8f 48%, #1b1e21 48%);
  background: -webkit-linear-gradient(left, #2a9d8f 48%, #1b1e21 48%);
  background: linear-gradient(45deg, #2a9d8f 48%, #1b1e21 48%);
}



@media (max-width: 576px) {
  .nav-item > .nav-link {
    color: black;
    font-size: 18px;
  }

  .navbar-nav {
    display: flex;
    justify-content: space-between;
  }
}
</style>
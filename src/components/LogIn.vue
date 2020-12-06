<template>
  <base-container>
    <div class="card bg-light">
      <h2 class="text-center p-4">Log In</h2>
      <article class="card-body mx-auto" style="max-width: 400px">
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Email address"
            type="email"
            v-model="curentEmail"
          />
        </div>
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i></span>
          </div>
          <input
            class="form-control"
            placeholder="Enter password"
            type="password"
            v-model="currentPassword"
          />
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-block"
            @click="signIn"
          >
            Log In
          </button>
        </div>
        <p class="text-center">
          Do not Have an account?
          <router-link to="register"><a href="#">Register Now</a></router-link>
        </p>
      </article>
    </div>
  </base-container>
  <register-with-providers></register-with-providers>
</template>

<script>
import firebase from "firebase/app";
import RegisterWithProviders from "./RegisterWithProviders.vue"
export default {
  components:{
     RegisterWithProviders
  },
  data() {
    return {
      curentEmail: "",
      currentPassword: "",
    };
  },
  methods: {
   signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.curentEmail, this.currentPassword)
        .then((user) => {
          if (user) {
            alert("you log in successfully");
            this.$router.push("/");
            /* temporary test */
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.$store.state.userName = user.displayName;
                this.$store.state.userStatus = true;
              }
            });
            /*  */
          }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    },
  },

  /*  created(){
    firebase.auth().onAuthStateChanged((user)=>{
       this.authUser = user
       if(user){
          this.displayText = user.displayName,
          this.displayImage = user.photoURL
       }
    })
  }, */
};
</script>
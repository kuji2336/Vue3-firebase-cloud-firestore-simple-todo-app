<template>
  <base-container>
    <div class="card bg-light">
      <h2 class="text-center p-4">Create Account</h2>
      <article class="card-body mx-auto" style="max-width: 400px">
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-user"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="userName"
            type="name"
            v-model="userName"
          />
        </div>
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
            v-model="Email"
          />
        </div>
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i></span>
          </div>
          <input
            class="form-control"
            placeholder="Create password"
            type="password"
            v-model="Password"
          />
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-block"
            @click="createAccaount"
          >
            Create Account
          </button>
        </div>
        <p class="text-center">
          Have an account?
          <router-link to="/LogIn"><a href="">Log In</a></router-link>
        </p>
      </article>
    </div>
  </base-container>
  <register-with-providers></register-with-providers>
</template>


<script>
import firebase from "firebase/app";
import {db} from '../fireBaseConfig/db';
import RegisterWithProviders from './RegisterWithProviders'
export default {
  components:{
    RegisterWithProviders
  },
  data(){
    return{
        userName:'',
        Email:'',
        Password:'',
    }
  },
  methods: {
    createAccaount() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.Email, this.Password)
        .then((user) => {
          /* Update user name with sync function */
          var firebaseCurrentUser = firebase.auth().currentUser
            firebaseCurrentUser.updateProfile({
              displayName: this.userName,
            })
           if(user){
            alert('You registered Succesfully')
            this.$router.push('/')
            window.location.href = 'http://localhost:8080/'
            db.collection("users").doc(user.user.uid)
          } 
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorCode, errorMessage);
        });
    },
  },
};
</script>
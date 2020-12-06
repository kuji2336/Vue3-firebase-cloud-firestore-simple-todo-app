<template>
  <base-container>
    <div class="register-width_providers">
      <div class="costum-btn" @click="signWithProviders">
        <a href="#" class="btn btn-block btn-google btn-google-styled">
          <i class="fab fa-google" style="color:#F4B400"></i
          ><span class="ml-3 main-btn-text">Login via Google account</span></a
        >
      </div>
    </div>
  </base-container>
</template>


<script>
import firebase from "firebase/app";
export default {
  methods: {
     /* Google authentication */
    signWithProviders() {
      var matchmedia = window.matchMedia("(max-width:576px)");
      const provider = new firebase.auth.GoogleAuthProvider();
      /* Show Login popup if user uses dekstop, otherwise redirect to the google page*/
      if (matchmedia.matches) {
        firebase
          .auth()
          .signInWithRedirect(provider)
          .then(function (result) {
            console.log(result);
            window.location.href = "http://localhost:8080/";
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(email);
            console.log(credential);
            console.log(errorCode);
            console.log(errorMessage);
          });
      } else {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(function (result) {
            console.log(result);
            window.location.href = "http://localhost:8080/";
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(email);
            console.log(credential);
            console.log(errorCode);
            console.log(errorMessage);
          });
      }
    },
  },
};
</script>


<style scoped>
.btn-google-styled {
  background-color: #4285f4;
}

.costum-btn {
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
}

.main-btn-text {
  color:#ffffff;
  font-weight: 700;
}
</style>
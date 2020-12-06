<template>
  <div class="container container-main">
    <base-container>
      <div class="input-field">
        <div class="input-inner">
          <input
            class="costum-input"
            type="text"
            placeholder="enter your todos"
            @input="disableButton"
            @keyup.enter="logTodo"
            v-model="newTodo"
          />
          <button @click="logTodo" :disabled="disabled">Add</button>
        </div>
      </div>
    </base-container>
    <base-container>
      <div class="empty-todo" v-if="renderTodos.length === 0">
        <h1 class="text-center">
          {{ loginedUserName }} You don't have any Todos<span
            style="font-size: 30px"
            >&#128553;</span
          >
        </h1>
      </div>
      <div class="todos-content" else>
        
          <transition-group name="bounce-out-top" tag="ul">
            <li
            v-for="todo in renderTodos"
            :key="todo"
            :class="{ completed: todo.isComplete }"
          >
            <span>{{ todo.todo }}</span>
            <p class="d-flex" style="float: right">
              <input
                type="checkbox"
                class="completed-class"
                v-model="todo.isComplete"
                @click="complete(todo)"
              />
              <i class="fas fa-trash icon-float" @click="removeTodo(todo)"></i>
            </p>
          </li>
          </transition-group>
        
      </div>
      <!--  <ul>
          <li v-for="y in msg" :key="y">{{y.todo}}</li>
      </ul>
      <button @click="render">render</button> -->
    </base-container>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { db } from "../fireBaseConfig/db.js";
import firebase from "firebase/app";
export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      completetodo: false,
      disabled: true,
      msg: [],
    };
  },

  methods: {
    logTodo() {
      if (this.newTodo.length === 0) {
        alert("Please enter something");
      } else {
        const newArr = {
          isComplete: false,
          todo: this.newTodo,
        };
        this.todos.unshift(newArr);
        this.$store.commit("logEnteredTodos", this.todos);
        /* fetch("https://todo-ab6fb.firebaseio.com/todos.json", {
          method: "POST",
          headers: {
            "Content-Type": "applicaton/json",
          },
          body: JSON.stringify({
            todo: this.newTodo,
            isComplete: false,
          }),
        }); */
        /* db.collection("users")
          .add({
            todo: this.newTodo,
            isComplete:false
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          }); */
        db.collection("users").doc(firebase.auth().currentUser.uid).set({
          todos: this.renderTodos,
        });
        this.newTodo = "";

        /* update items in firebase  */
      }
    },

    disableButton() {
      if (this.newTodo.length === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },

    test() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              this.$store.commit("logEnteredTodos", doc.data().todos);
            });
        }
      });
    },

    complete(todo) {
      todo.isComplete = !todo.isComplete;
      console.log(todo);
      /*  this.renderTodos.forEach(element => {
         console.log(element.isComplete)
       }); */
      db.collection("users").doc(firebase.auth().currentUser.uid).set({
        todos: this.renderTodos,
      });
    },

    /*  completeTodo(todo) {
      this.renderTodos.indexOf(todo);
    }, */

    removeTodo(todo) {
       this.renderTodos.splice(this.renderTodos.indexOf(todo), 1)
      var Ref = db.collection("users").doc(firebase.auth().currentUser.uid);
      // Remove the 'capital' field from the document
      Ref.update({
        todos: this.renderTodos
      });
    },
  },

  computed: {
    ...mapGetters(["renderTodos"]),
    loginedUserName() {
      return this.$store.state.userName;
    },
  },

  /* created() {
    let x = this;
    dbRefTodos.on("value", (snapshot) => {
      let data = snapshot.val();
      if (data === null) {
        console.log("no items in bd");
      } else {
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            todo: data[key].todo,
            isComplete: data[key].isComplete,
            id: key,
          });
        });
        x.todos = messages;
        this.$store.commit("logEnteredTodos", this.todos);
      }
    });
  }, */

  created() {
    this.test();

    /* db.collection("users").doc(firebase.auth().currentUser.uid).get().then(doc=>{
        return this.todos = doc.data().todos
     }) */
  },
};
</script>




<style scoped>

.todo-list {
	-webkit-animation: slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@-webkit-keyframes todo-list {
  0% {
    -webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
    transform: translateY(-600px) rotateX(-30deg) scale(0);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotateX(0) scale(1);
    transform: translateY(0) rotateX(0) scale(1);
    -webkit-transform-origin: 50% 1400px;
    transform-origin: 50% 1400px;
    opacity: 1;
  }
}
@keyframes todo-list {
  0% {
    -webkit-transform: translateY(-600px) rotateX(-30deg) scale(0);
    transform: translateY(-600px) rotateX(-30deg) scale(0);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0) rotateX(0) scale(1);
    transform: translateY(0) rotateX(0) scale(1);
    -webkit-transform-origin: 50% 1400px;
    transform-origin: 50% 1400px;
    opacity: 1;
  }
}


.bounce-out-top-leave-to {
	-webkit-animation: bounce-out-top 1.5s both;
	animation: bounce-out-top 1.5s both;
}



@-webkit-keyframes bounce-out-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  5% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  15% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  25% {
    -webkit-transform: translateY(-38px);
    transform: translateY(-38px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  52% {
    -webkit-transform: translateY(-75px);
    transform: translateY(-75px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  70% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  85% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-800px);
    transform: translateY(-800px);
    opacity: 0;
  }
}
@keyframes bounce-out-top {
  0% {
    -webkit-transform: translateY(0);
     transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  5% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  15% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  25% {
    -webkit-transform: translateY(-38px);
    transform: translateY(-38px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  38% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  52% {
    -webkit-transform: translateY(-75px);
    transform: translateY(-75px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  70% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  85% {
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-800px);
    transform: translateY(-800px);
    opacity: 0;
  }
}

.bounce-out-top-move {
  transition: 0.8s ease-out;
}



.input-field {
  padding: 40px;
}
.completed {
  background-color: rgb(128, 133, 128);
  opacity: 0.6;
  text-decoration: line-through;
}
button {
  border: 1px solid #2a9d8f;
  border-radius: 18px;
  padding: 10px 25px;
  margin-left: 10px;
  background-color: #2a9d8f;
  color: #ffffff;
  cursor: pointer;
  outline: none;
}

.active {
  text-decoration: underline;
}

.empty-todo {
  padding: 10px;
}

.input-inner {
  display: flex;
  justify-content: space-between;
}

.costum-input {
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid rgb(202, 198, 198);
  outline: none;
}
.icon-float {
  float: right;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 20px;
  text-align: left;
  transition: 0.4s ease-in-out;
  font-size: 19px;
  cursor: pointer;
}

li:hover {
  background-color: #2a9d8f;
  transition: 0.4s ease-in;
  color: #ffffff;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
}

.todos-content > ul > li {
  position: relative;
}

.costum-check {
  position: absolute;
  cursor: pointer;
  height: 20px;
  border: 1px solid red;
  width: 20px;
  right: 55px;
  top: 17px;
}

.container-main {
  margin-top: 140px;
}

input.completed-class {
  height: 21px;
  width: 40px;
  margin-right: 18px;
  cursor: pointer;
}

@media (max-width: 576px) {
  .empty-todo > h1 {
    font-size: 18px;
  }
  .input-field {
    padding: 10px;
  }
}
</style>
import {createStore} from 'vuex'

const store = createStore({
    state(){
        return{
           todos:[],
           userStatus:null,
           userName:'',
        }
    },

    mutations:{
      logEnteredTodos(state,payload){
         state.todos = payload
      },

    },
    getters:{
      renderTodos(state){
          return state.todos
      },
      logOutUser(state){
        return state.userStatus
      }
     },

     actions:{

     }
})



export default store;

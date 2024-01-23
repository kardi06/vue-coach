import { createStore } from "vuex";
import coaachModule from "./modules/coaches/index";

const store = createStore({
    modules:{
        coaches:coaachModule,
    },
    state(){
        return {
            userId:'c3'
        }
    },
    getters:{
        userId(state){
            return state.userId;
        }
    }
});

export default store;
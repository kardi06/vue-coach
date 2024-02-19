import { createStore } from "vuex";
import coaachModule from "./modules/coaches/index";
import requestModule from "./modules/requests/index";

const store = createStore({
    modules:{
        coaches:coaachModule,
        requests:requestModule
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
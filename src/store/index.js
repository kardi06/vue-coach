import { createStore } from "vuex";
import coaachModule from "./modules/coaches/index";

const store = createStore({
    modules:{
        coaches:coaachModule,
    },
    state(){

    },
});

export default store;
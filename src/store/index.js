import { createStore } from "vuex";
import coaachModule from "./modules/coaches/index";
import requestModule from "./modules/requests/index";
import authModule from "./modules/auth/index"

const store = createStore({
    modules:{
        coaches:coaachModule,
        requests:requestModule,
        auth:authModule
    },
});

export default store;
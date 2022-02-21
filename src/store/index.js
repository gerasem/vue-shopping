import {createStore} from "vuex";
import {cart} from "@/store/modules/cart.js";

export default createStore({
    modules: {
        cart
    },
})
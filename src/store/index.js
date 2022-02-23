import {createStore} from "vuex";
import {cart} from "@/store/modules/cart.js";
import {items} from "@/store/modules/items.js";

export default createStore({
    modules: {
        cart,
        items
    },
})
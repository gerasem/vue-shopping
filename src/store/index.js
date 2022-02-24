import {createStore} from "vuex";
import {cart} from "@/store/modules/cart.js";
import {items} from "@/store/modules/items.js";

export default createStore({
    state() {
        return {
            loading: true,
            loadingTime: ""
        }
    },
    mutations: {
        // todo action
        setLoading1(state, value) {
            if (value) {
                state.loading = true;
                state.loadingTime = Date.now();
                console.log('time created', state.loadingTime)
            } else {
                const timeClose = Date.now();
                const timeDifference = timeClose - state.loadingTime;
                console.log('time close', timeClose);
                console.log('time difference', timeDifference);
                if (timeDifference >= 500) {
                    console.log('to long time')
                    state.loading = false;
                } else {
                    // state.loading = false
                    // setTimeout(() => {
                    //     state.loading = false
                    // }, 500 - timeDifference);
                }
            }
        },

        setLoading(state, value) {
            state.loading = value;
        }
    },
    actions: {
        setLoading({commit}, value) {
            if (value) {
                commit('setLoading', true);
            } else {
                setTimeout(() => {
                    commit('setLoading', false);
                    console.log('set loading false')
                }, import.meta.env.VITE_TIMEOUT || 500);
            }
        }

    },
    modules: {
        cart,
        items
    },
})
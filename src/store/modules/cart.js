import {dataAPI} from "@/api/api.js";

export const cart = {
    state() {
        return {
            items: [],
        }
    },
    getters: {

    },
    mutations: {
        setInfo(state, data) {
            state.items = data.items;
        }
    },
    actions: {
        loadItems({commit}) {
            return new Promise((resolve) => {
                dataAPI.getPopularItems()
                    .then(response => {
                        commit('setInfo', response.info);
                        resolve();
                    })
                    .catch(e => console.log('VUEX error', e));
            })
        }
    },
}

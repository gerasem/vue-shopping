import {dataAPI} from "@/api/api.js";

export const items = {
    state() {
        return {
            search: "",
            allItems: []
        }
    },
    getters: {
        popularItems(state) {
            return state.allItems.filter(item => item.popular);
        },

        getItemsByCategory: (state) => (categoryId) => {
            return state.allItems.filter(item => item.category === categoryId)
        },

        getSearchedItem: (state) => (searchedItem) => {
            return state.allItems.filter(item => item.category === searchedItem.id)
        },
    },
    mutations: {
        setSearch(state, search) {
            state.search = search;
        },

        setAllItems(state, items) {
            state.allItems = items;
        }
    },
    actions: {
        getAllItems({commit}) {
            commit("setAllItems", dataAPI.getAllItems());
        }
    },
}

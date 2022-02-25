import {dataAPI} from "@/api/api.js";

export const items = {
    state() {
        return {
            search: "",
            selectedCategory: null,
            allItems: []
        }
    },
    getters: {
        popularItems(state) {
            return state.allItems.filter(item => item.popular);
        },

        getItemsByCategory: (state) => (categoryId) => {
            return state.allItems.filter(item => item.category === categoryId)
        }
    },
    mutations: {
        setSearch(state, search) {
            state.search = search;
        },

        setSelectedCategory(state, category) {
            state.selectedCategory = category;
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

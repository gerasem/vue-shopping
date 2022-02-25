import {dataAPI} from "@/api/api.js";

export const categories = {
    state() {
        return {
            selectedCategory: null,
            categories: []
        }
    },
    getters: {
        getCategoryBySlug:(state) => (slug) => {
            return state.categories.filter(item => item.slug === slug);
        },
    },
    mutations: {
        setCategories(state, categories) {
            state.categories = categories;
        },

        setSelectedCategory(state, category) {
            state.selectedCategory = category;
        },
    },
    actions: {
        getCategories({commit}) {
            commit("setCategories", dataAPI.getCategories());
        }
    },
}

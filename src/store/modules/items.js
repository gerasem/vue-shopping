export const items = {
    state() {
        return {
            search: "",
            selectedCategory: null
        }
    },
    getters: {},
    mutations: {
        setSearch(state, search) {
            state.search = search;
        },

        setSelectedCategory(state, category) {
            state.selectedCategory = category;
        }
    },
    actions: {},
}

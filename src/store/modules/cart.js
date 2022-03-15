export const cart = {
    state() {
        return {
            itemsInCart: [],
            cart: [],
        }
    },
    getters: {
        // return an object with total price and total count of items in cart
        getTotal(state) {
            if (!state.itemsInCart) return {price: 0, quantity: 0};
            const total = state.itemsInCart.reduce((total, item) => {
                const {price, quantity} = item;
                total.price += price * quantity;
                total.quantity += quantity || 0;
                return total;
            }, {price: 0, quantity: 0});
            if (total.price < 0 || total.quantity < 0) return {price: 0, quantity: 0};
            return total;
        }
    },
    mutations: {
        getItemsFromLS(state) {
            const readLS = localStorage.getItem("itemsInCart");
            if (readLS) {
                state.cart = JSON.parse(readLS);
            }
        },

        deleteCart(state) {
            state.itemsInCart = [];
            state.cart = [];
            localStorage.setItem("itemsInCart", JSON.stringify(state.cart));
        },

        pushItemToCart(state, item) {
            // Save item in LS
            const addItem = {
                id: item.id,
                quantity: 1,
            }
            state.cart = [...state.cart, addItem];

            // Save item in Store
            item.store[0].quantity = 1;
            state.itemsInCart = [...state.itemsInCart, item.store[0]]
        },

        incrementQuantityOfItemInCart(state, itemId) {
            const itemStore = state.itemsInCart.filter(itemCart => itemCart.id === itemId);
            const itemLS = state.cart.filter(item => item.id === itemId);
            itemStore[0].quantity++;
            itemLS[0].quantity++;
        },

        changeQuantityOfItem(state, item) {
            const itemStore = state.itemsInCart.filter(itemCart => itemCart.id === item.itemId);
            const itemLS = state.cart.filter(itemLS => itemLS.id === item.itemId);
            itemStore[0].quantity = item.quantity;
            itemLS[0].quantity = item.quantity;
        },

        saveToLS(state) {
            localStorage.setItem("itemsInCart", JSON.stringify(state.cart));
        },

        deleteItemFromCart(state, item) {
            state.itemsInCart = state.itemsInCart.filter(i => i !== item);
            state.cart = state.cart.filter(i => i.id !== item.id);
        }
    },
    actions: {
        initShoppingCart({commit, state, rootGetters}) {
            commit('getItemsFromLS');
            console.log('get cartLS', state.cart)
            if (state.cart) {
                state.cart.forEach(item => {
                    const itemInDB = rootGetters.getSearchedItem(item.id);
                    const mergedItem = {...item, ...itemInDB[0], quantity: item.quantity};
                    state.itemsInCart = [...state.itemsInCart, mergedItem];
                })
            }
        },

        addProductToCart({commit, state, rootGetters}, itemId) {
            const itemInCart = state.itemsInCart.filter(itemCart => itemCart.id === itemId);

            if (itemInCart.length) {
                commit('incrementQuantityOfItemInCart', itemId);
                commit('saveToLS');
            } else {
                const itemFromStore = rootGetters.getSearchedItem(itemId);
                commit('pushItemToCart', {
                    id: itemId,
                    store: itemFromStore
                });
                commit('saveToLS');
            }
        },

        changeQuantityOfItem({commit}, item) {
            commit("changeQuantityOfItem", {
                itemId: item.id,
                quantity: item.quantity
            });
            commit('saveToLS');
        },

        handleOnDeleteItem({commit}, item) {
            commit('deleteItemFromCart', item);
            commit('saveToLS');
        }
    },
}

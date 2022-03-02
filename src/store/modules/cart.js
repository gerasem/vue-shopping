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
            return state.itemsInCart.reduce((total, item) => {
                const {price, quantity} = item;
                total.price += price;
                total.quantity += quantity || 0;
                return total;
            }, {price: 0, quantity: 0});
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
            itemStore[0].quantity++;
            const itemLS = state.cart.filter(item => item.id === itemId);
            itemLS[0].quantity++;
        },

        saveToLS(state) {
            localStorage.setItem("itemsInCart", JSON.stringify(state.cart));
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

            console.log('is item in cart?', itemInCart);
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
        }
    },
}

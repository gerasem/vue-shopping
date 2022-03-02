export const cart = {
    state() {
        return {
            itemsInCart: [],
            cartLS: [],
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
                state.cartLS = JSON.parse(readLS);
            }
        },

        deleteCart(state) {
            state.itemsInCart = [];
            state.cartLS = [];
            localStorage.setItem("itemsInCart", JSON.stringify(state.cartLS));
        },

        pushItemToCart(state, item) {
            const addItem = {
                id: item.item.id,
                quantity: 1,
            }
            state.cartLS = [...state.cartLS, addItem];
            localStorage.setItem("itemsInCart", JSON.stringify(state.cartLS));
        },

        incrementQuantityOfItemInCart(state, item) {
            const cartItem = state.itemsInCart.filter(itemCart => itemCart.id === item.item.id);
            cartItem[0].quantity++;
        },
    },
    actions: {
        initShoppingCart({commit, state, rootGetters}) {
            commit('getItemsFromLS');
            console.log('get cartLS', state.cartLS)
            if (state.cartLS) {
                state.cartLS.forEach(item => {
                    const itemInDB = rootGetters.getSearchedItem(item.id);
                    const mergedItem = {...item, ...itemInDB[0]};
                    state.itemsInCart = [...state.itemsInCart, mergedItem];
                })
            }
        },

        addProductToCart({commit, state, rootState}, item) {
            const itemInCart = state.itemsInCart.filter(itemCart => itemCart.id === item.item.id);
            console.log('is item in cart?', itemInCart);
            if (itemInCart.length) {
                commit('incrementQuantityOfItemInCart', item);
            } else {
                const itemInDB = rootState.items.allItems.filter(itemDB => itemDB.id === item.item.id);
                const mergedItem = {...item, ...itemInDB[0], quantity: 1}
                state.itemsInCart = [...state.itemsInCart, mergedItem];
                commit('pushItemToCart', item);
            }
        }
    },
}

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
            if (!state.itemsInCart) return {price: 0, quantity: 0}
            return state.itemsInCart.reduce((total, item) => {
                const {price, quantity} = item;
                total.price += price;
                total.quantity += quantity || 0;
                return total
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
            localStorage.setItem("itemsInCart", null);
        },

        pushItemToCart(state, item) {
            const addItem = {
                id: item.item.id,
                quantity: 1,
            }
            state.cartLS = [...state.cartLS, addItem];
            localStorage.setItem("itemsInCart", JSON.stringify(state.cartLS));
        }
    },
    actions: {
        initShoppingCart({commit, state, rootState}) {
            commit('getItemsFromLS');
            console.log('get cartLS', state.cartLS)
            state.cartLS.forEach(item => {
                const itemInDB = rootState.items.allItems.filter(itemDB => itemDB.id === item.id);
                const mergedItem = {...item, ...itemInDB[0]}
                state.itemsInCart = [...state.itemsInCart, mergedItem]
            })
        },

        addProductToCart({commit, state}, item) {
            console.log('added items to cart vuex');
            commit('pushItemToCart', item)
        }
    },
}

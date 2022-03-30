export const cart = {
    state() {
        return {
            itemsInCart: [],
            cart: [],
            freeShippingFrom: 80,
            shippingCost: 5,
            coupon: {
                code: "",
                type: null,
                value: null,
                minOrder: null
            },

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
            if (state.coupon.value) {
                if (total.price < state.coupon.minOrder) {
                    state.coupon.value = null;
                    debugger
                    // total.price = total.price - state.coupon.value;
                }
                if (state.coupon.type === "%") {
                    total.price = total.price * (100 - state.coupon.value) / 100;
                    debugger
                    return total;
                }

                if (state.coupon.type === "€") {
                    if (total.price > state.coupon.value) {
                        total.price = total.price - state.coupon.value;
                        debugger
                        return total;
                    }
                }
            }
            return total;
        },

        freeShipping(state, getters) {
            return getters.getTotal.price >= state.freeShippingFrom;
        },

        totalPriceWithShipping(state, getters) {
            if (getters.freeShipping) {
                return getters.getTotal.price;
            } else {
                return getters.getTotal.price + state.shippingCost;
            }
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
        },

        setCoupon(state, coupon) {
            debugger
            if (!coupon) {
                state.coupon.type = null;
                state.coupon.value = null;
                debugger
                state.coupon.code = "";
            } else {
                state.coupon.type = coupon.type;
                state.coupon.value = coupon.value;
                state.coupon.minOrder = coupon.min_order;
            }
        },

        setCouponCode(state, couponCode) {
            state.coupon.code = couponCode;
        }
    },
    actions: {
        initShoppingCart({commit, state, rootGetters}) {
            commit('getItemsFromLS');
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

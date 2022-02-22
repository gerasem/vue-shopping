import {dataAPI} from "@/api/api.js";

export const cart = {
    state() {
        return {
            itemsInCart: [
                /*{
                    id: 1,
                    name: "lorem ipsum",
                    price: 29,
                    old_price: 35,
                    quantity: 2
                },
                {
                    id: 2,
                    name: "sdgsdf",
                    price: 89,
                    old_price: 92,
                    quantity: 1
                },
                {
                    id: 3,
                    name: "sdfsdf",
                    price: 21,
                    old_price: null,
                    quantity: 1
                },
                {
                    id: 4,
                    name: "sdfsdf",
                    price: 21,
                    old_price: null,
                    quantity: 1
                },*/
            ],
        }
    },
    getters: {
        // return an object with total price and total count of items in cart
        getTotal(state) {
            return state.itemsInCart.reduce((total, item) => {
                const {price, quantity} = item;
                total.price += price;
                total.quantity += quantity;
                return total
            }, {price: 0, quantity: 0});
        }
    },
    mutations: {
        getItemsFromLS(state) {
            // todo get ids and quantity from LS, then get another params from server
            const itemsFromLS = localStorage.getItem("itemsInCart");
            if(itemsFromLS) {
                state.itemsInCart = JSON.parse(itemsFromLS);
            }
        },

        pushItemToCart(state) {

        }
    },
    actions: {
        initShoppingCart({commit}) {
            commit('getItemsFromLS');
        },

        addProductToCart() {
            console.log('add items to cart vuex')
        }
    },
}

import axios from "axios";

const instance = axios.create({
    //baseURL: 'http://0.0.0.0:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

import categories from "./mock/categories.json"
import items from "./mock/items.json"
import coupons from "./mock/coupons.json"

export const dataAPI = {
    getCategories() {
        return categories;
    },

    getAllItems(id) {
        return items;
    },

    checkCoupon(couponCode) {
        if (coupons[couponCode]) {
            console.log('coupon is in list');
            return coupons[couponCode];
        } else {
            return false;
        }
    }
}

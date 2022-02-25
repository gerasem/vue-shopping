import axios from "axios";

const instance = axios.create({
    //baseURL: 'http://0.0.0.0:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

import categories from "./mock/categories.json"
import items from "./mock/items.json"


export const dataAPI = {
    getCategories() {
        return categories;
    },

    getAllItems(id) {
        return items;
    }
    /*
        getAccreditation(tan) {
            return instance.get(`/foo/${bar}`)
                .then(response => {
                    return response.data
                })
                .catch(e => {
                    console.error('', e);
                })
        },
        sendInvites(data) {
            return instance.post('/foo/bar', {
                data
            })
                .then(() => {
                    return true
                })
                .catch(e => {
                    console.error('', e);
                    return false;
                })
        }*/
}

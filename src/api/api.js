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
            return instance.get(`/accreditation/${tan}`)
                .then(response => {
                    return response.data
                })
                .catch(e => {
                    console.error('No data for accreditation', e);
                })
        },
        sendInvites(data) {
            return instance.post('/email/send_invites', {
                data
            })
                .then(() => {
                    return true
                })
                .catch(e => {
                    console.error('Error by sending invites', e);
                    return false;
                })
        }*/
}

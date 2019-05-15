var axios = require('axios');

var client = axios.create({
    baseURL: 'http://localhost:3000/api/v1/'
});

export default function ({ store }) {
    client.interceptors.request.use(
        config => {
            if (store.$auth.$storage._state['_token.local']) {
                config.headers.Authorization = `Bearer ${store.$auth.$storage._state['_token.local'].replace('Bearer ', '')}`;
            }

            return config;
        },
        error => Promise.reject(error)
    );
}

export {
    client
}

import axios from 'axios'

axios.defaults.baseURL = '/api'

function fetchDate(id) {
    return axios('/' + id);
}

export { fetchDate }

import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = '/api'

function fetchDate(id) {
    return axios('/'+id);
}

export default fetchDate;

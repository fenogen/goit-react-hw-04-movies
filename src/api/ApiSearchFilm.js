import axios from 'axios'

const API = {
    key:'3109059b24a52180767110da483040d6',
    page: 1,
    onPage: 12,
    search: '',
}

const getImage = (page, search) => {
    
    return axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API.key}`).then(responce => responce.data.results);

}

export { getImage }

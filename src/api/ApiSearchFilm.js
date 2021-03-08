import axios from 'axios'

const API = {
    key:'3109059b24a52180767110da483040d6',
    page: 1,
    onPage: 12,
    search: 'winter',
}

const getListTrends = (page, search) => {
    
    return axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API.key}`).then(responce => responce.data.results);

}

const getListSearch = (page, search) => {
    
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API.key}&language=en-US&page=${page}&include_adult=false&query=${search}`).then(responce => responce.data.results);

}

const getItemInfo = (id) => {
    
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API.key}&language=en-US`).then(responce => responce.data);
}

const getItemActors = (id) => {
    
    return axios.get(` https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API.key}&language=en-US`).then(responce => responce.data.cast);
}

const getItemReviews = (id) => {
    
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API.key}&language=en-US&page=1`).then(responce => responce.data.results[0]);
}


export { getListTrends, getListSearch, getItemInfo, getItemActors, getItemReviews }

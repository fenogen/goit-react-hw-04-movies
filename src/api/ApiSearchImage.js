import axios from 'axios'

const API = {
    key: '20057586-194248245024f7fdf6233c620',
    page: 1,
    onPage: 12,
    search: '',
}

const getImage = (page, search) => {
    return axios.get(`https://pixabay.com/api/?image_type=photo&key=${API.key}&page=${page}&per_page=${API.onPage}&orientation=horizontal&q=${search}`).then(responce => responce.data.hits);
}

export { getImage }

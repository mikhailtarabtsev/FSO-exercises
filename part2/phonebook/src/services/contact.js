import axios from "axios";

const baseURL = "/api/persons"

const getAll = () => {

    const request = axios.get(baseURL)
    return request.then(res => res.data)
}

const create = (newContact) => {
    const request = axios.post(baseURL, newContact)
    return request.then(res => res.data )
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(res => res.data)
}
const update = (id, newContact) =>{
    const request = axios.put(`${baseURL}/${id}`, newContact)
    return request.then(res => res.data)
}

export default {
    getAll,
    create,
    remove,
    update
}
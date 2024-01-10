import axios from "axios";
import {url} from "./requests.js";

export const addDirection = async (data) => {
    const endpoint = `${url}/directions`;
    const response = await axios.post(endpoint, data);
    return response.data
}

export const getDirections = async (id = null) => {
    const endpoint = id ? `${url}/directions/${id}` : `${url}/directions`;
    const response = await axios.get(endpoint);
    return response.data
}

export const editDirection = async (data) => {
    const endpoint = `${url}/directions/${data.id}`;
    const response = await axios.put(endpoint, data);
    return response.data
}

export const deleteDirection = async (id) => {
    console.log(id, 'deleteDirection')
    const endpoint = `${url}/directions/${id}`;
    const response = await axios.delete(endpoint);
    return response.data
}
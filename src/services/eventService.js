import {url} from "./requests.js";
import axios from "axios";


export const getEvents = async (id) => {
    const endpoint = id ? `${url}/event_result/${id}` : `${url}/event_result`;
    const response = await axios.get(endpoint);
    return response.data
}

export const addEvent = async (data) => {
    const endpoint = `${url}/event_result`;
    const response = await axios.post(endpoint, data);
    return response.data
}

export const editEvent = async (data) => {
    const endpoint = `${url}/event_result/${data.id}`;
    const response = await axios.put(endpoint, data);
    return response.data
}

export const deleteEvent = async (id) => {
    const endpoint = `${url}/event_result/${id}`;
    const response = await axios.delete(endpoint);
    return response.data
}

export const getEventResults = async (id) => {
    const endpoint = `${url}/event_result/results`;
    const response = await axios.get(endpoint);
    return response.data
}
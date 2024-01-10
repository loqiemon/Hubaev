import axios from "axios";
import {url} from "./requests.js";

export const getStudents = async (id = null) => {
    const endpoint = id ? `${url}/students/${id}` : `${url}/students`;
    const response = await axios.get(endpoint);
    return response.data
}

export const addStudent = async (data) => {
    const endpoint = `${url}/students`;
    const dat = {
        ...data,
        group_id: parseInt(data.group_id),
    }
    const response = await axios.post(endpoint, dat);
    return response.data
}

export const editStudent = async (data) => {
    const endpoint = `${url}/students/${data.id}`;
    const response = await axios.put(endpoint, data);
    return response.data
}

export const deleteStudent = async (id) => {
    const endpoint = `${url}/students/${id}`;
    const response = await axios.delete(endpoint);
    return response.data
}

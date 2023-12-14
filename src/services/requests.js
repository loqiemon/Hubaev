import axios from "axios";

export const url = 'http://151.0.50.17:25565';


export const getDirections = async (id = null) => {
    const endpoint = id ? `${url}/directions/${id}` : `${url}/directions`;
    const response = await axios.get(endpoint);
    return response.data
}

export const addDirection = async (data) => {
    const endpoint = `${url}/directions`;
    const response = await axios.post(endpoint, data);
    return response.data
}


export const getDisciplines = async (id = null) => {
    const endpoint = id ? `${url}/disciplines/${id}` : `${url}/disciplines`;
    const response = await axios.get(endpoint);
    return response.data
}



export const getGroups = async (id = null) => {
    const endpoint = id ? `${url}/groups/${id}` : `${url}/groups`;
    const response = await axios.get(endpoint);
    return response.data
}

export const getStudents = async (id = null) => {
    const endpoint = id ? `${url}/students/${id}` : `${url}/students`;
    const response = await axios.get(endpoint);
    return response.data
}


export const getCurriculums = async (id = null) => {
    const endpoint = id ? `${url}/curriculums/${id}` : `${url}/curriculums`;
    const response = await axios.get(endpoint);
    return response.data
}


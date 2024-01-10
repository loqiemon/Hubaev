import axios from "axios";

export const url = 'http://151.0.50.17:25565';



export const getDisciplines = async (id = null) => {
    const endpoint = id ? `${url}/disciplines/${id}` : `${url}/disciplines`;
    const response = await axios.get(endpoint);
    return response.data
}

export const addDiscipline = async (data) => {
    const endpoint = `${url}/disciplines`;
    const response = await axios.post(endpoint, data);
    return response.data
}

export const editDiscipline = async (data) => {
    const endpoint = `${url}/disciplines/${data.id}`;
    const response = await axios.put(endpoint, data);
    return response.data
}

export const deleteDiscipline = async (id) => {
    const endpoint = `${url}/disciplines/${id}`;
    const response = await axios.delete(endpoint);
    return response.data
}


export const getGroups = async (id = null) => {
    const endpoint = id ? `${url}/groups/${id}` : `${url}/groups`;
    const response = await axios.get(endpoint);
    return response.data
}

export const addGroup = async (data) => {
    const endpoint = `${url}/groups`;
    const newData = {
        ...data,
        date_from: parseInt(data.date_from),
        date_year: parseInt(data.date_to),
        direction_id: parseInt(data.direction),
    }
    const response = await axios.post(endpoint, newData);
    return response.data
}

export const editGroup = async (data) => {
    const endpoint = `${url}/groups/${data.id}`;
    const response = await axios.put(endpoint, data);
    return response.data
}

export const deleteGroup = async (id) => {
    const endpoint = `${url}/groups/${id}`;
    const response = await axios.delete(endpoint);
    return response.data
}






export const getCurriculums = async (id = null) => {
    const endpoint = id ? `${url}/curriculums/${id}` : `${url}/curriculums`;
    const response = await axios.get(endpoint);
    return response.data
}

export const addCurriculum = async (data) => {
    const endpoint = `${url}/curriculums`;
    const newData = {
        direction_id: parseInt(data.direction_id),
        discipline_id: parseInt(data.discipline_id),
        typeExam: parseInt(data.typeExam),
        semester: parseInt(data.semester),
    }
    const response = await axios.post(endpoint, newData);
    return response.data
}

export const editCurriculum = async (data) => {
    const endpoint = `${url}/curriculums/${data.id}`;
    const response = await axios.put(endpoint, data);
    return response.data
}

export const deleteCurriculum = async (id) => {
    const endpoint = `${url}/curriculums/${id}`;
    const response = await axios.delete(endpoint);
    return response.data
}


export const addMark = async (data) => {
    const endpoint = `${url}/students`;
    const response = await axios.post(endpoint, data);
    return response.data
}


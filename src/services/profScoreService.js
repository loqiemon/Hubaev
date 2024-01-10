import axios from "axios";
import {url} from "./requests.js";

const url_prof_score = `${url}/prof_score`;

export const getProfScore = async (id = null) => {
    const endpoint = id ? `${url_prof_score}/${id}` : `${url_prof_score}`;
    const response = await axios.get(endpoint);
    return response.data
}

export const addProfScore = async (data) => {
    const endpoint = `${url_prof_score}`;
    const response = await axios.post(endpoint, {
        'student_id': parseInt(data.student_id),
        'curriculum_id': parseInt(data.curriculum_id),
        'score': parseInt(data.score)
    });
    return response.data
}

export const editProfScore = async (data) => {
    const endpoint = `${url_prof_score}/${data.id}`;
    const response = await axios.put(endpoint, data);
    return response.data
}

export const deleteProfScore = async (id) => {
    const endpoint = `${url_prof_score}/${id}`;
    const response = await axios.delete(endpoint);
    return response.data
}

export const getProfScoreResult = async (params) => {
    const endpoint = `${url_prof_score}/results`;
    console.log(params)
    const response = await axios.get(endpoint, {params});
    return response.data
}
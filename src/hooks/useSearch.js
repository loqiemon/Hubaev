import {useEffect, useState} from "react";


export const useSearch = (props) => {
    const [search, setSearch] = useState('');
    const [searchedArray, setSearchedArray] = useState([]);

    function copyObjectWithoutIdFields(originalObject) {
        const copiedObject = {};

        for (const key in originalObject) {
            if (originalObject.hasOwnProperty(key) && !key.includes('id')) {
                // Копируем только те поля, которые не содержат подстроку 'id'
                copiedObject[key] = originalObject[key];
            }
        }

        return copiedObject;
    }

    useEffect(() => {
        try {
            if (search) {
                setSearchedArray(props.array.filter(item => {

                    const obj = Object.values(copyObjectWithoutIdFields(item)).join(' ').toLowerCase();
                    console.log(obj)
                    return obj.includes(search.toLowerCase())
                }));
            } else {
                setSearchedArray(props.array);
            }
        } catch (e) {
            setSearchedArray(props.array);
        }
    }, [props.array, search]);

    return {
        search,
        setSearch,
        searchedArray,
        setSearchedArray,
    }
}
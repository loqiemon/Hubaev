import {useEffect, useState} from "react";


export const useSearch = (props) => {
    const [search, setSearch] = useState('');
    const [searchedArray, setSearchedArray] = useState([]);


    useEffect(() => {
        if (search) {
            setSearchedArray(props.array.filter(item => item.name.toLowerCase().includes(search.toLowerCase())));
        } else {
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
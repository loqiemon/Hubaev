import styled from 'styled-components';
import {useEffect, useState} from "react";

const useFilter = (props) => {
  const {filters, propsArray} = props;
  const [filteredArray, setFilteredArray] = useState(propsArray);

    useEffect(() => {
        if (Object.values(filters).some(value => value !== '')) {
            setFilteredArray(prev => {
                return propsArray?.filter(item => {
                    return Object.entries(filters).every(([key, value]) => {
                        return item[key] === value;
                    });
                });
            });
        } else {
            setFilteredArray(propsArray);
        }
    }, [propsArray, filters]);

    // useEffect(() => {
    //     if (Object.values(filters).some(value => value !== '')) {
    //         Object.entries(filters).map(([key, value]) => {
    //             setFilteredArray(prev => ({
    //                 prev.filter(item => {
    //                     return item[key] === value
    //                 })
    //             }))
    //         })
    //
    //     } else {
    //         setFilteredArray(propsArray);
    //     }
    //
    // }, [propsArray, filters]);



  return ({

  });
};

export {useFilter};

const Container = styled.div`

`


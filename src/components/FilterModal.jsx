import styled from 'styled-components';
import Select from './Select.jsx';
import {useEffect, useState} from "react";
import { getGroups} from "../services/requests.js";
import {getDirections} from "../services/directionService";

const FilterModal = (props) => {
  const {isActive, handleFilterShow, setFilters, filterReset} = props;
  const [filtersBefore, setFiltersBefore] = useState({});
  const [filtersOptions, setFiltersOptions] = useState({
      'semester': [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7}, {value: 8}],
      'direction': [],
      'group_name': []
  });

    useEffect(() => {
        getDirections().then(res => {
            setFiltersOptions(prev => ({
                ...prev,
                'direction': res.map(item => ({ value: item.name }))
            }));
        })
        getGroups().then(res => {
            setFiltersOptions(prev => ({
                ...prev,
                'group_name': res.map(item => ({ value: item.name }))
            }));
        })
    }, []);



  const handleReset = () => {
      // setFilters([]);
      filterReset();
      handleFilterShow();
  }

    const handleApply = () => {
        setFilters(prev => {
            const updatedFilters = {...filtersBefore};
            console.log(filtersBefore)
            return updatedFilters;
        });
        handleFilterShow();
    }

    const handleChange = (e, name) => {
        setFiltersBefore(prev => {
            const updatedFilters = {
                ...prev,
                [name]: e.target.value
            };

            if (e.target.value === '') {
                delete updatedFilters[name];
            }

            return updatedFilters;
        });
    };


  return (
    <Container className={isActive ? 'active' : ''}>
        <Title>Фильтр</Title>
        <SelectDiv>
            <Select value={filtersBefore['semester']} onChange={(e) => handleChange(e, 'semester')} name='semester' options={filtersOptions.semester} label={'Семестр'} value_field={'value'}  />
            <Select value={filtersBefore['direction']} onChange={(e) => handleChange(e, 'direction')} name="direction" options={filtersOptions.direction} label={'Направление'} value_field={'value'}  />
            <Select value={filtersBefore['group_name']} onChange={(e) => handleChange(e, 'group_name')} name="group_name" options={filtersOptions.group_name} label={'Группа'} value_field={'value'}  />
        </SelectDiv>
        <ButtonDiv>
            <Button onClick={handleReset}>Сбросить</Button>
            <Button onClick={handleApply}>Применить</Button>
        </ButtonDiv>
    </Container>
  );
};

export {FilterModal};

const Container = styled.div`
  opacity: 0;
  position: absolute;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 4px 47.6px 0px rgba(30, 30, 30, 0.20);
  top: 0;
  right: -5px;
  padding: 30px 20px;
  min-width: 270px;
  transition: opacity .5s, top .5s;
  pointer-events: none;
  
  &.active {
    opacity: 1;
    pointer-events: all;
    top: 55px;
    //right: -5px;
  }
`

const ButtonDiv = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  gap: 55px;
`

const Button = styled.button`
  border-radius: 10px;
  padding: 11px 25px;
  border: 1px solid var(--130-f-1-e, #130F1E);
  transition: all .3s;
  color: var(--130-f-1-e, #130F1E);
  font-size: 20px;
  font-weight: 400;
  
  &:nth-child(2) {
    color: #fff;
    border-radius: 10px;
    background: var(--8-b-5-ff-6, #8B5FF6);
    &:hover {
      background: #703af5;
    }
  }
`

const Title = styled.div``

const SelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`


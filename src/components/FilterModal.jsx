import styled from 'styled-components';
import Select from './Select.jsx';
import {useState} from "react";

const FilterModal = (props) => {
  const {isActive, handleFilterShow, setFilters, filterReset} = props;
  const [filtersBefore, setFiltersBefore] = useState([]);


  const handleReset = () => {
      // setFilters([]);
      filterReset();
      handleFilterShow();
  }

    const handleApply = () => {
        setFilters(prev => {
            const updatedFilters = [...prev, ...filtersBefore];
            setFiltersBefore([]);
            return updatedFilters;
        });
        handleFilterShow();
    }

    const handleChange = (e) => {
        setFiltersBefore(prev => {
            return [
                ...prev,
                e.target.value
            ]
        })
    }

  return (
    <Container className={isActive ? 'active' : ''}>
        <Title>Фильтр</Title>
        <SelectDiv>
            <Select onChange={handleChange} options={[{value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}]} label={'Семестр'} />
            <Select onChange={handleChange} options={[]} label={'Направление'} />
            <Select onChange={handleChange} options={[]} label={'Группа'} />
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
  top: 55px;
  right: -75px;
  padding: 30px 20px;
  min-width: 270px;
  transition: all .5s;
  pointer-events: none;
  
  &.active {
    opacity: 1;
    pointer-events: all;
    right: -5px;
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


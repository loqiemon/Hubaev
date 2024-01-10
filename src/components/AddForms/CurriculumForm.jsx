import styled from 'styled-components';
import Select from "../Select.jsx";
import {useEffect, useState} from "react";
import {addCurriculum, getDisciplines} from "../../services/requests.js";
import {getDirections} from "../../services/directionService";

const CurriculumForm = (props) => {
  const {} = props;
  const [directions, setDirections] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

  const clearForm = () => {
    props.setForm(prev => ({}));
  }

  const handleAdd = () => {
    if (
        props.form.semester &&
        props.form.direction_id &&
        props.form.discipline_id &&
        props.form.typeExam
    ) {
      addCurriculum(props.form).finally(_ => props.setIsOpen(false));;
      clearForm();
    } else {
      // Handle validation error, e.g., show an error message
      console.error("Validation failed");
    }
  }

  useEffect(() => {
    getDirections()
        .then(res => setDirections(res.map(el => ({...el, value: el.name}))))
    getDisciplines()
        .then(res => setDisciplines(res.map(el => ({...el, value: el.name}))))
  }, []);


  return (
      <Container>
        <Select
            label="Направление"
            options={directions}
            onChange={e => props.setForm(prev => ({...prev, direction_id: e.target.value}))}
            value_field="id"
        />
        <Select
            label="Дисциплина"
            options={disciplines}
            onChange={e => props.setForm(prev => ({...prev, discipline_id: e.target.value}))}
            value_field="id"
        />
        <Select
            label="Экзамен"
            options={[{value: 0}, {value: 1}]}
            onChange={e => props.setForm(prev => ({...prev, typeExam: e.target.value}))}
            value_field="id"
        />
        <Select
            label="Семестр"
            options={[{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6}, {value: 7}, {value: 8}]}
            onChange={e => props.setForm(prev => ({...prev, semester: e.target.value}))}
            value_field="value"
        />
        <ButtonDiv>
          <Button onClick={clearForm}>Сбросить</Button>
          <Button onClick={handleAdd}>Добавить</Button>
        </ButtonDiv>
      </Container>
  );
};

export {CurriculumForm};

const ButtonDiv = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  gap: 55px;
`

const Button = styled.button`
  border-radius: 10px;
  padding: 7px 18px;
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

const Container = styled.div`
  padding-top: 20px;
`

const Input = styled.input`
  color: #212121;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #DCDCDC;
  width: 100%;
  padding-bottom: 5px;
  margin-top: 15px;

  &:invalid {
    border-color: red;
  }
`



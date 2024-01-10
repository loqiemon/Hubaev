import styled from 'styled-components';
import {useEffect, useState} from "react";
import {getCurriculums, getDisciplines} from "../../services/requests.js";
import Select from "../Select.jsx";
import {getStudents} from "../../services/userService.js";
import {addProfScore} from "../../services/profScoreService.js";

const MarkForm = (props) => {
  const {} = props;
    const [disciplines, setDisciplines] = useState([]);
    const [students, setStudents] = useState([]);

  const clearForm = () => {
    props.setForm(prev => ({}));
  }

  const handleAdd = () => {
    if (
        props.form.curriculum_id &&
        props.form.student_id &&
        props.form.score
    ) {
      addProfScore(props.form).finally(_ => props.setIsOpen(false));;
      clearForm();
    } else {
      console.error("Validation failed");
    }
  }

  useEffect(() => {
    // getDisciplines()
    //     .then(res => setDisciplines(res.map(el => ({...el, value: `${el.name}`}))))
        // .then(res => setDisciplines(res.map(el => ({...el, value: `${el.direction} - ${el.name}`}))))

    getCurriculums()
          .then(res => setDisciplines(res.map(el => ({...el, value: `${el.direction_name} - ${el.discipline_name}`}))))
    getStudents()
        .then(res => setStudents(res.map(el => ({...el, value: el.fio}))))
  }, []);

  return (
      <Container>
        <Select
            label="Дисциплина"
            options={disciplines}
            onChange={e => props.setForm(prev => ({...prev, curriculum_id: e.target.value}))}
            value_field="id"
        />
        <Select
            label="Студент"
            options={students}
            onChange={e => props.setForm(prev => ({...prev, student_id: e.target.value}))}
            value_field="id"
        />
        <Input
            placeholder="Оценка"
            pattern="\d{0,3}"
            // type="number"
            value={props.form.score}
            onChange={e => props.setForm(prev => ({...prev, score: e.target.value}))}
        />
        <ButtonDiv>
          <Button onClick={clearForm}>Сбросить</Button>
          <Button onClick={handleAdd}>Добавить</Button>
        </ButtonDiv>
      </Container>
  );
};

export {MarkForm};

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



import styled from 'styled-components';
import {useEffect, useState} from "react";
import {getDirections} from "../../services/directionService";
import {addGroup} from "../../services/requests.js";
import Select from "../Select.jsx";
import {addStudent} from "../../services/userService.js";

const StudentForm = (props) => {
    const [groups, setGroups] = useState([]);

    const clearForm = () => {
        props.setForm(prev => ({}));
    }

    const handleAdd = () => {
        if (
            props.form.fio &&
            props.form.group_id
        ) {
            addStudent(props.form).finally(_ => props.setIsOpen(false));;
            clearForm();
        } else {
            console.error("Validation failed");
        }
    }

    useEffect(() => {
        getDirections()
            .then(res => setGroups(res.map(el => ({...el, value: el.name}))))
    }, []);

  return (
    <Container>
        <Input
            placeholder="ФИО"
            value={props.form.fio}
            onChange={e => props.setForm(prev => ({...prev, fio: e.target.value}))}
        />
        <Select
            label="Группа"
            options={groups}
            onChange={e => props.setForm(prev => ({...prev, group_id: e.target.value}))}
            value_field="id"
        />
        <ButtonDiv>
            <Button onClick={clearForm}>Сбросить</Button>
            <Button onClick={handleAdd}>Добавить</Button>
        </ButtonDiv>
    </Container>
  );
};

export {StudentForm};

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

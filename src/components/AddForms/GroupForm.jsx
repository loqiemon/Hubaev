import styled from 'styled-components';
import {addGroup} from "../../services/requests.js";
import {getDirections} from "../../services/directionService";
import Select from "../Select.jsx";
import {useEffect, useState} from "react";

const GroupForm = (props) => {
    const [directions, setDirections] = useState([]);
    
    const clearForm = () => {
        props.setForm(prev => ({}));
    }

    const handleAdd = () => {
        if (
            props.form.name &&
            props.form.direction &&
            props.form.date_from &&
            props.form.date_to &&
            /^\d{4}$/.test(props.form.date_from) &&
            /^\d{4}$/.test(props.form.date_to) &&
            parseInt(props.form.date_from, 10) <= parseInt(props.form.date_to, 10)
        ) {
            addGroup(props.form).finally(_ => props.setIsOpen(false));
            clearForm();
        } else {
            // Handle validation error, e.g., show an error message
            console.error("Validation failed");
        }
    }

    useEffect(() => {
        getDirections()
            .then(res => setDirections(res.map(el => ({...el, value: el.name}))))
    }, []);

    return (
        <Container>
            <Input
                placeholder="Название группы"
                value={props.form.name}
                onChange={e => props.setForm(prev => ({...prev, name: e.target.value}))}
            />
            <Select
                label="Направление"
                options={directions}
                onChange={e => props.setForm(prev => ({...prev, direction: e.target.value}))}
                value_field="id"
            />
            <Input
                placeholder="Год начала обучения"
                pattern="\d{0,4}"
                // type="number"
                value={props.form.date_from}
                onChange={e => props.setForm(prev => ({...prev, date_from: e.target.value}))}
            />
            <Input
                placeholder="Год окончания обучения"
                pattern="\d{0,4}"
                // type="number"
                value={props.form.date_to}
                onChange={e => props.setForm(prev => ({...prev, date_to: e.target.value}))}
            />
            <ButtonDiv>
                <Button onClick={clearForm}>Сбросить</Button>
                <Button onClick={handleAdd}>Добавить</Button>
            </ButtonDiv>
        </Container>
    );
};

export {GroupForm};


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

import styled from 'styled-components';
import {addDirection} from "../../services/requests.js";

const DirectionForm = (props) => {
  const {} = props;

  const clearForm = () => {
    props.setForm(prev => ({...prev, name: ''}));
  }

  const handleAdd = () => {
    if (props.form.name) {
      addDirection(props.form);
      clearForm();
    }
  }

  return (
    <Container>
        <Input
            placeholder="Направления"
            value={props.form.name}
            onChange={e => props.setForm(prev => ({...prev, name: e.target.value}))}
        />
        <ButtonDiv>
            <Button onClick={clearForm}>Сбросить</Button>
            <Button onClick={handleAdd}>Добавить</Button>
        </ButtonDiv>
    </Container>
  );
};

export {DirectionForm};

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
`


import styled from 'styled-components';
import {useState} from "react";
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const types = {
    'Направления': {name: 'directions', columns: 1},
    'Дисциплины': {name: 'disciplines', columns: 1},
    'Группы': {name: 'groups', columns: 4},
    'Студенты': {name: 'students', columns: 2},
    'Учебные планы': {name: 'curriculums', columns: 4}
}

const ModalForm = (props) => {
  const {children} = props;
    const [type, setType] = useState('Направления');
    const [data, setData] = useState({
        'Направления': [],
        'Дисциплины': [],
        'Группы': [],
        'Студенты': [],
        'Учебные планы': []
    });
    const location = useLocation();

    const { search } = location;
    const queryParams = new URLSearchParams(search);


    const locationParam = queryParams.get('location');
    const isSelected = (name) => {
        console.log(locationParam)
        if (!locationParam && name === 'Направления') {
            return 'active';
        }
        return locationParam === name ? 'active' : '';
    }


    const navigate = useNavigate();
    const handleClick = (type) => {
        setType(type);
        navigate({
            pathname: window.location.pathname,
            search: `?location=${type}`,
        });
    }

  return (
    <Container>
        <Title>Добавить</Title>
        <Links>
            <Link className={isSelected('Направления')} onClick={_ => handleClick('Направления')} >Направление</Link>
            <Link className={isSelected('Дисциплины')} onClick={_ => handleClick('Дисциплины')}>Дисциплину</Link>
            <Link className={isSelected('Группы')} onClick={_ => handleClick('Группы')}>Группу</Link>
            <Link className={isSelected('Студенты')} onClick={_ => handleClick('Студенты')} >Студента</Link>
            <Link className={isSelected('Учебные планы')} onClick={_ => handleClick('Учебные планы')}>Учебный план</Link>
            <Link className={isSelected('Оценки')} onClick={_ => handleClick('Оценки')}>Оценку</Link>
        </Links>
        <Line/>
        {children}

    </Container>
  );
};

export {ModalForm};

const Container = styled.div`

`

const Input = styled.input`

`



const Title = styled.div`
  color: #212121;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #dcdcdc;
`

const Link = styled.div`
  cursor: pointer;
  padding-bottom: 10px;
  transition: all .5s;
  
  &.active {
    border-bottom: 1px solid #212121;
  }
`

const Links = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 25px;
  color: #212121;
  font-size: 16px;
  font-weight: 500;
`
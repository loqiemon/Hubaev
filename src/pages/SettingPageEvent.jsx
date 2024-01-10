import styled from 'styled-components';
import {useLocation, useNavigate, useParams} from "react-router-dom";


const SettingPageEvent = (props) => {
    let { path } = useParams();

    const navigate = useNavigate();


    const goTo = (path) => {
        navigate({
            pathname: window.location.pathname + '/' + path,
        });
    }

    const isSelected = (path) => {
        return path === path ? "active" : ""
    }

  return (
    <Container>
      <Top>
          <LinkTo className={isSelected("eventTypes")} onClick={_ => goTo("eventTypes")}>Тип мероприятия</LinkTo>
          <LinkTo className={isSelected("events")} onClick={_ => goTo("events")}>Мероприятия</LinkTo>
          <LinkTo className={isSelected("results")}  onClick={_ => goTo("results")}>Результаты</LinkTo>
      </Top>
    </Container>
  );
};

export {SettingPageEvent};

const Container = styled.div`
  padding: 30px;
  background: #fff;
`

const  Top = styled.div`
 display: flex;
  gap: 15px;
  
`

const LinkTo = styled.span`
  color: #212121;
  font-size: 20px;
  font-weight: 500;
  &.active {
    border-bottom: 1px solid #212121;
    font-weight: 700;
  }
`


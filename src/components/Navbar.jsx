import styled from 'styled-components';
import {Link as LinkRouter, useLocation} from "react-router-dom";
import {useState} from "react";
import {createPortal} from "react-dom";
import {Modal} from "./Modal.jsx";
import {ModalForm} from "./ModalForm.jsx";
import {DirectionForm} from "./AddForms/DirectionForm.jsx";
import {DisciplineForm} from "./AddForms/DisciplineForm.jsx";
import {GroupForm} from "./AddForms/GroupForm.jsx";
import {StudentForm} from "./AddForms/StudentForm.jsx";
import {CurriculumForm} from "./AddForms/CurriculumForm.jsx";
import {MarkForm} from "./AddForms/MarkForm.jsx";

const Navbar = (props) => {
  const {} = props;
  const location = useLocation();
  const { search } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({});

  const queryParams = new URLSearchParams(search);
  const param1 = queryParams.get('location');


  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  }

  const handleClick = () => {
      setIsOpen(prev => !prev);
  }

  return (
    <Container>
        <Logo to="/">ЛС</Logo>
        <Links>
            <Link to="/" className={isActive("/")}>Учебная активность</Link>
            <Link to="/creativity" className={isActive("/creativity")}>Творческая активность</Link>
            <Link to="/setting-group" className={isActive("/setting-group?location=Направления")}>Управление группами</Link>
            <Link to="/setting-event/events" className={isActive("/setting-event")}>Управление мероприятиями</Link>
        </Links>
        <Button className={location.pathname === '/setting-group' ? 'active' : ''} onClick={handleClick} >Добавить</Button>
        {isOpen && createPortal(
            <Modal setIsOpen={setIsOpen} isOpen={isOpen} >
                <ModalForm>
                    {!param1 || param1 === 'Направления' && <DirectionForm form={form} setForm={setForm} setIsOpen={setIsOpen} />}
                    {param1 && param1 === 'Группы' && <GroupForm form={form} setForm={setForm} setIsOpen={setIsOpen}/>}
                    {param1 && param1 === 'Дисциплины' && <DisciplineForm form={form} setForm={setForm} setIsOpen={setIsOpen}/>}
                    {param1 && param1 === 'Учебные планы' && <CurriculumForm form={form} setForm={setForm} setIsOpen={setIsOpen}/>}
                    {param1 && param1 === 'Студенты' && <StudentForm form={form} setForm={setForm} setIsOpen={setIsOpen}/>}
                    {param1 && param1 === 'Оценки' && <MarkForm form={form} setForm={setForm} setIsOpen={setIsOpen}/>}
                </ModalForm>
            </Modal>,
            document.body
        )}
    </Container>
  );
};

export {Navbar};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 10px 0;
  position: relative;
`

const Logo = styled(LinkRouter)`
  font-size: 57px;
  font-weight: 800;
`

const Links = styled.div`
  display: flex;
  gap: 15px;
`

const Link = styled(LinkRouter)`
  font-size: 22px;
  font-weight: 500;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  
  &.active {
    border-radius: 10px;
    background: #FFF;
    box-shadow: 2px 2px 10px 0px rgba(19, 15, 30, 0.10);
  }
`

const Button = styled.button`
  border-radius: 10px;
  border: 1px solid #130F1E;
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 400;
  color: #130F1E;
  margin-left: auto;
  transition: all .5s;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: -50px;
  right: 0;
  
  &:hover {
    background: #130F1E;
    color: #f9f9fb;
  }
  
  &.active {
    opacity: 1;
    pointer-events: all;
    top: 25px;
  }
`


import styled from 'styled-components';
import {Link as LinkRouter, useLocation} from "react-router-dom";

const Navbar = (props) => {
  const {} = props;
  const location = useLocation();


  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  }

  return (
    <Container>
        <Logo>ЛС</Logo>
        <Links>
            <Link to="/" className={isActive("/")}>Учебная активность</Link>
            <Link to="/creativity" className={isActive("/creativity")}>Творческая активность</Link>
            <Link to="/setting" className={isActive("/setting")}>Управление группами</Link>
        </Links>
    </Container>
  );
};

export {Navbar};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  padding: 10px 0;
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


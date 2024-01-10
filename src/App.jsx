
import './App.css'
import {Navbar} from "./components/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import styled from "styled-components";
import {LearningPage} from "./pages/LearningPage.jsx";
import {SettingPage} from "./pages/SettingPage.jsx";
import {CreativityPage} from "./pages/CreativityPage.jsx";
import {StudentPage} from "./pages/StudentPage.jsx";
import {SettingPageEvent} from "./pages/SettingPageEvent.jsx";

function App() {
  return (
    <Container>
        <Navbar/>
            <Routes>
                <Route path="/" element={<LearningPage/>}/>
                <Route path="/setting-group" element={<SettingPage/>}/>
                <Route path="/setting-event/:path" element={<SettingPageEvent/>}/>
                <Route path="/Creativity" element={<CreativityPage/>}/>
                <Route path="/student/:student" element={<StudentPage/>}/>
            </Routes>
    </Container>
  )
}

export default App

const Container = styled.div`
 padding: 0 20px;
`

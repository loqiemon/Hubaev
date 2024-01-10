import styled, {keyframes} from 'styled-components';
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getStudents} from "../services/userService.js";
import ArrowLeft from '../assets/arrow-left.svg?react';
import {Link} from "react-router-dom";

import Arrow from "../assets/arrow.svg?react";
import {mock} from "./LearningPage.jsx";
import CloseIcon from "../assets/close.svg";
import SearchIcon from "../assets/search.svg";
import {FilterModal} from "../components/FilterModal.jsx";
import {Loader} from "../components/Loader.jsx";
import {useSearch} from "../hooks/useSearch.js";

const StudentPage = (props) => {
  const [student, setStudent] = useState({});
  const [filters, setFilters] = useState([]);
  const [stats, setStats] = useState(mock);
  const navigate = useNavigate();
  const { student: student_id } = useParams();
  const [resetFilters, setResetFilters] = useState(false);
  const [peopleStats, setpeopleStats] = useState([]);
  const {search, setSearch, searchedArray, setSearchedArray} = useSearch({array: peopleStats});

    useEffect(() => {
      getStudents(student_id)
          .then(res => setStudent(res))
    }, [student_id]);

  const filterReset = () => {
    let timer;
    clearTimeout(timer);

    setResetFilters(true);

    timer = setTimeout(() => {
      setFilters([]);
      setResetFilters(false);
    }, 500)

  }


  const handleFilterShow = () => {
    setfilterShow(prev => {
      if (!prev) {

      }
      return !prev
    });
  }

  const handleDeleteFilter = (filterKey) => {
    setFilters(prev => {
      const { [filterKey]: deletedFilter, ...rest } = prev;
      console.log(rest);
      return rest;
    });
  };

  return (
    <Container>
     <StudentInfo>
        <LeftCorner>
          <ArrowLeft style={{fill: '#212121'}} onClick={_ => navigate("/")} />
          <span>{student.fio}</span>
        </LeftCorner>
       <RightCorner>
         <span>{student.group_name}</span>
         <span>{student.direction_name}</span>
         <span>{student.fio}</span>
         <span>{student.date_from}-{student.date_to}</span>
       </RightCorner>
     </StudentInfo>
      <TopStats>
        {stats.map((stat) => (
            <TopStatsItem className='' key={stat.title}>
              <Stats>
                <BigStat>{stat.value}</BigStat>
                <SmallStat className={'small'}>
                  <Arrow />
                  <span>{stat.percent}%</span>
                </SmallStat>
              </Stats>
              <StatDesctipion>{stat.title}</StatDesctipion>
            </TopStatsItem>
        ))}
      </TopStats>
      <SubContainer>
        <Filters>
          <LeftFilters>
            {Object.entries(filters).map(([key, filter], index) => (
                <Filter
                    key={filter.name}
                    className={`filter-enter ${index} ${resetFilters ? 'filter-exit' : ''}`}
                >
                  <span>{key === 'semester' ? `Семестр ${filter}` : filter}</span>
                  <CloseIcon style={{stroke: '#212121'}} onClick={() => handleDeleteFilter(key)}/>
                </Filter>
            ))}
          </LeftFilters>
          {/*<RightFilters>*/}
          {/*  <Search>*/}
          {/*    <SearchIcon />*/}
          {/*    <input type="text" placeholder="Поиск" value={search} onChange={(event) => setSearch(event.target.value)}/>*/}
          {/*  </Search>*/}
          {/*  <FilterButton onClick={handleFilterShow}>Фильтр</FilterButton>*/}
          {/*  <FilterModal*/}
          {/*      filterReset={filterReset}*/}
          {/*      isActive={filterShow}*/}
          {/*      handleFilterShow={handleFilterShow}*/}
          {/*      setFilters={setFilters}*/}
          {/*  />*/}
          {/*</RightFilters>*/}
        </Filters>
        {/*<Loader/>*/}
        {/*<Table>*/}
        {/*  <span>ФИО</span>*/}
        {/*  <span>Группа</span>*/}
        {/*  <span>Курс</span>*/}
        {/*  <span>Направление</span>*/}
        {/*  <span>Профессиональный коэффициент</span>*/}
        {/*  {searchedArray.map((stat) => (*/}
        {/*      <React.Fragment key={stat.id}>*/}
        {/*        <SpanLink to={`/student/${stat.id}`}>{stat.fio}</SpanLink>*/}
        {/*        <span>{stat.group_name}</span>*/}
        {/*        <span>{stat.group_name[5]}</span>*/}
        {/*        <span>{stat.direction_name}</span>*/}
        {/*        <span>{stat.score}</span>*/}
        {/*      </React.Fragment>*/}
        {/*  ))}*/}
        {/*</Table>*/}
      </SubContainer>
    </Container>
  );
};

export {StudentPage};

const Container = styled.div`

`

const StudentInfo = styled.div`
  padding: 40px 30px;
  background: #fff;
  position: relative;
`

const LeftCorner = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  span {
    color: #212121;
    font-size: 26px;
    font-weight: 600;
  }
`

const RightCorner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #212121;
  text-align: right;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
`

const SpanLink = styled(Link)`
  padding-bottom: 10px;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #dcdcdc;
  cursor: pointer;
  transition: all .3s;
  
  &:hover {
    color: #8B5FF6;
    transform: scale(1.07);
  }
`


const Table = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr 110px 65px 140px .5fr;
  grid-auto-flow: row;
  color: #212121;
  span {
    padding-bottom: 10px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #dcdcdc;
  }
`

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 8px;
  border-radius: 10px;
  border: 1px solid #DCDCDC;
  height: 48px;
`

const RightFilters = styled.div`
  display: flex;
  gap: 25px;
  position: relative;
`

const LeftFilters = styled.div`
  display: flex;
  gap: 10px;
`

const SubContainer = styled.div`
  padding: 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 2px 2px 10px 0px rgba(19, 15, 30, 0.10);
`

const FilterButton = styled.button`
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  width: 144px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid #8B5FF6;
  background: #8B5FF6;
  transition: all .3s;

  &:hover {
    background: #703af5;
  }
`
const fadeInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInTop = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOutLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const fadeOutTop = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const fadeOutBottom = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: #F7F8FD;
  padding: 12px 17px;
  
  svg {
    cursor: pointer;
  }



  &.filter-enter:nth-child(odd) {
    animation: ${fadeInTop} 0.5s ease-in-out;
  }

  &.filter-enter:nth-child(even) {
    animation: ${fadeInBottom} 0.5s ease-in-out;
  }



  &.filter-exit:nth-child(odd) {
    animation: ${fadeOutTop} 0.5s ease-in-out;
  }

  &.filter-exit:nth-child(even) {
    animation: ${fadeOutBottom} 0.5s ease-in-out;
  }

  &.filter-enter:nth-child(1) {
    animation: ${fadeInLeft} 0.5s ease-in-out;
  }
  &.filter-exit:nth-child(1) {
    animation: ${fadeOutLeft} 0.5s ease-in-out;
  }
`

const Filters = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`

const Button = styled.button`
  
`

const TopStats = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;
`

const TopStatsItem = styled.div`
  width: 350px;
  height: 180px;
  border-radius: 20px;
  background: #FFF;
  padding: 30px 20px;
  box-shadow: 2px 2px 10px 0px rgba(19, 15, 30, 0.10);
  
  &.selected {
    border: 1px solid #130F1E;
    background: #130F1E;
    color: #fff;
    .small {
      background: #E4E3E3;
      color: #212121;
      svg {
        fill: #212121;
      }
    }
  }
`

const BigStat = styled.span`
  font-size: 56px;
  font-weight: 500;
`

const SmallStat = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  border-radius: 15px;
  background: var(--8-b-5-ff-6, #8B5FF6);
  padding: 4px 8px;
  margin-bottom: 8px;

  svg {
    fill: #fff;
  }
`

const StatDesctipion = styled.div`
  font-size: 16px;
`

const Stats = styled.div`
 display: flex;
 justify-content: space-between;
  align-items: flex-end;
`




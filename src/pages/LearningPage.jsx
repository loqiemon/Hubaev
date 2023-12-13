import {useState} from "react";


import styled, { keyframes } from 'styled-components';
import Arrow from '../assets/arrow.svg?react';
import SearchIcon from '../assets/search.svg?react';
import CloseIcon from '../assets/close.svg?react';
import {useSearch} from "../hooks/useSearch.js";

import {FilterModal} from "../components/FilterModal.jsx";

const mock = [
    {
        title: "cредний профессиональный коэффициент",
        value: 100,
        percent: 10
    },
    {
        title: "cтудентов в этом семестре участвовали в хакатонах",
        value: 100,
        percent: 10
    },
    {
        title: "студентов в этом семестре одержали победы в хакатонах",
        value: 100,
        percent: 10
    },
    {
        title: "студентов в этом семестре опубликовали научные статьи",
        value: 100,
        percent: 10
    },
    {
        title: "средний балл по экзаменам прошлого семестра",
        value: 100,
        percent: 20
    }
]

const mockPeople = [
    {
        name: "Иванов И.И.",
        id: 1,
        group: 'ИСТ-342',
        course: '1',
        direction: '1008786',
        coefficient: 0.8
    },
    {
        name: "Иванов И.И.",
        id: 1,
        group: 'ИСТ-342',
        course: '1',
        direction: '1008786',
        coefficient: 0.8
    },
    {
        name: "Иванов И.И.",
        id: 1,
        group: 'ИСТ-342',
        course: '1',
        direction: '1008786',
        coefficient: 0.8
    },
    {
        name: "Иванов И.И.",
        id: 1,
        group: 'ИСТ-342',
        course: '1',
        direction: '1008786',
        coefficient: 0.8
    }
]

const LearningPage = (props) => {
  const {} = props
const [stats, setStats] = useState(mock);
const [filters, setFilters] = useState([{name: "Фильтр 1"}, {name: "Фильтр 2"}, {name: "Фильтр 3"}]);
const [peopleStats, setpeopleStats] = useState(mockPeople);
const {search, setSearch, searchedArray, setSearchedArray} = useSearch({array: mockPeople});
const [filterShow, setfilterShow] = useState(false);
const [resetFilters, setResetFilters] = useState(false);

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

const handleDeleteFilter = (index) => {
    setFilters(prev => {
        return prev.filter((item, i) => i !== index)
    })
}

  return (
    <Container>
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
                    {filters.map((filter, index) => (
                        <Filter
                            key={filter.name}
                            className={`filter-enter ${index} ${resetFilters ? 'filter-exit' : ''}`}
                        >
                            <span>{filter.name}</span>
                            <CloseIcon style={{stroke: '#212121'}} onClick={() => handleDeleteFilter(index)}/>
                        </Filter>
                    ))}
                </LeftFilters>
                <RightFilters>
                    <Search>
                        <SearchIcon />
                        <input type="text" placeholder="Поиск" value={search} onChange={(event) => setSearch(event.target.value)}/>
                    </Search>
                    <FilterButton onClick={handleFilterShow}>Фильтр</FilterButton>
                    <FilterModal
                        filterReset={filterReset}
                        isActive={filterShow}
                        handleFilterShow={handleFilterShow}
                        setFilters={setFilters}
                    />
                </RightFilters>
            </Filters>
            <Table>
                <span>ФИО</span>
                <span>Группа</span>
                <span>Курс</span>
                <span>Направление</span>
                <span>Профессиональный коэффициент</span>
                {searchedArray.map((stat) => (
                    <>
                        <span>{stat.name}</span>
                        <span>{stat.group}</span>
                        <span>{stat.course}</span>
                        <span>{stat.direction}</span>
                        <span>{stat.coefficient}</span>
                    </>
                ))}
            </Table>
        </SubContainer>
    </Container>
  );
};

export {LearningPage};


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

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 75px;
`
const TopStats = styled.div`
  display: flex;
  gap: 30px;
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






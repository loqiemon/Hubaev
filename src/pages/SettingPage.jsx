import styled, {keyframes} from 'styled-components';
import {useEffect, useState} from "react";
import {deleteCurriculum, deleteDiscipline, deleteGroup, url} from "../services/requests.js";
import axios from "axios";
import {SettingsTable} from "../components/SettingsTable.jsx";
import SearchIcon from "../assets/search.svg?react";
import {FilterModal} from "../components/FilterModal.jsx";
import {useSearch} from "../hooks/useSearch.js";
import CloseIcon from "../assets/close.svg?react";
import {deleteDirection} from "../services/directionService.js";
import {deleteStudent} from "../services/userService.js";
import {useLocation} from "react-router-dom";

const types = {
    'Направления': {name: 'directions', columns: 2},
    'Дисциплины': {name: 'disciplines', columns: 2},
    'Группы': {name: 'groups', columns: 4},
    'Студенты': {name: 'students', columns: 2},
    'Учебные планы': {name: 'curriculums', columns: 4}
}

const SettingPage = (props) => {
  const {} = props;
  const [type, setType] = useState('Направления');
  const [filterShow, setfilterShow] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const [filters, setFilters] = useState([{name: "Фильтр 1"}, {name: "Фильтр 2"}, {name: "Фильтр 3"}]);
  const [data, setData] = useState({
    'Направления': [],
    'Дисциплины': [],
    'Группы': [],
    'Студенты': [],
    'Учебные планы': []
  });
    const {search, setSearch, searchedArray, setSearchedArray} = useSearch({array: data[type]});
    const location = useLocation();

    const { search1 } = location;
    const queryParams = new URLSearchParams(search1);


    const locationParam = queryParams.get('location');
  useEffect(() => {
    if (data[type].length === 0) {
      axios.get(`${url}/${types[type].name}`)
          .then(res => setData(prev => ({...prev, [type]: res.data})))
          .catch(err => console.log(err));
    }
  }, [type]);

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


  const isSelected = (name) => {
    return type === name ? 'active' : '';
  }

  const handleClick = (type) => {
    setType(type);
  }

  const handleDelete = (func, typeFunc, id) => {
     func(id).then(res => {
         setData(prev => {
             return {...prev, [typeFunc]: prev[typeFunc].filter(item => item.id !== res.id)}
         })
     })
  }


  return (
    <Container>
      <Links>
        <Link className={isSelected('Направления')} onClick={_ => handleClick('Направления')} >Направления</Link>
        <Link className={isSelected('Дисциплины')} onClick={_ => handleClick('Дисциплины')}>Дисциплины</Link>
        <Link className={isSelected('Группы')} onClick={_ => handleClick('Группы')}>Группы</Link>
        <Link className={isSelected('Студенты')} onClick={_ => handleClick('Студенты')} >Студенты</Link>
        <Link className={isSelected('Учебные планы')} onClick={_ => handleClick('Учебные планы')}>Учебные планы</Link>
      </Links>
        <Line/>
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

        {type === 'Направления' && <SettingsTable onDelete={id => handleDelete( deleteDirection, "Направления", id)} columns={2} labels={["Направление", '']} data={searchedArray} fields={['name']}/>}
        {type === 'Дисциплины' && <SettingsTable onDelete={id =>handleDelete( deleteDiscipline, "Дисциплины", id)}  columns={2} labels={["Дисциплина", '']} data={searchedArray} fields={['name']}/>}
        {type === 'Группы' && <SettingsTable onDelete={id => handleDelete(deleteGroup, "Группы", id)} columns={5} labels={["Группа", "Направление", "Год начала", 'Год окончания', '']} data={searchedArray} fields={['name', 'direction_name', 'date_from', 'date_to']}/>}
        {type === 'Студенты' && <SettingsTable onDelete={id => handleDelete(deleteStudent, "Студенты", id)} columns={3} labels={["Фио", "Группа", '']} data={searchedArray} fields={['fio', 'group_name']}/>}
        {type === 'Учебные планы' && <SettingsTable onDelete={id => handleDelete(deleteCurriculum, "Учебные планы", id) } columns={5} labels={["Направление", "Дисциплина", "Экзамен", 'Семестр', '']} data={searchedArray} fields={['direction_name', 'discipline_name', 'typeExam', 'semester']}/>}
    </Container>
  );
};

export {SettingPage};


const Container = styled.div`
  background: #FFF;
  border-radius: 20px;
  padding: 30px;
`

const Table = styled.div`
  border-radius: 10px;
  border: 1px solid #C2C2C2;
  padding: 10px 15px;
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`}; 
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
  display: flex;
  gap: 25px;
  color: #212121;
  font-size: 20px;
  font-weight: 500;
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

const LeftFilters = styled.div`
  display: flex;
  gap: 10px;
`

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
  margin-top: 40px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`
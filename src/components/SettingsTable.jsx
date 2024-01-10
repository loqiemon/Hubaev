import styled from 'styled-components';
import react from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SettingsTable = (props) => {
  const {columns, labels, data, fields} = props;
  return (
      <Table columns={columns}>
        {labels.map(label => (
            <span key={label}>{label}</span>
        ))}
        {data.length > 0 &&
            data.map((item, index) => (
                <react.Fragment key={index}>
                  {fields.map((field, idx) => (
                      <span key={idx}>{item[field]}</span>
                  ))}
                 <Buttons>
                     <Edit onClick={_ => props.onEdit(item)}/>
                     <Delete  onClick={_ => props.onDelete(item.id)}/>
                 </Buttons>
                </react.Fragment>
        ))}
      </Table>
  );
};

export {SettingsTable};

const Container = styled.div`
  transition: all .3s;
  &:hover {
    transform: scale(1.03);
    color: #8B5FF6;
  }
`

const Delete = styled(DeleteIcon)`
  transition: all .3s;

  &:hover {
    transform: scale(1.03);
    color: #de1938;
  }
`

const Edit = styled(EditIcon)`
  transition: all .3s;
  &:hover {
    transform: scale(1.1);
    color: #8B5FF6;
  }
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`

const Table = styled.div`
  border-radius: 10px;
  border: 1px solid #C2C2C2;
  padding: 10px 15px;
  margin-top: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  
  span {
    padding-bottom: 10px;
    margin-top: 15px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 1px solid #dcdcdc;
  }
`

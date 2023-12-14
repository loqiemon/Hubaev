import styled from 'styled-components';
import react from "react";

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
                </react.Fragment>
        ))}
      </Table>
  );
};

export {SettingsTable};

const Container = styled.div`
  
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

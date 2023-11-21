import React,{useEffect, useState} from 'react';
import Graph from './Graph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faCaretDown,
  faMinusCircle 
} from '@fortawesome/free-solid-svg-icons';
import WebSocketExample from './webSocketConnect';

// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import fruitables from './data.json'

export default function App() {
  const [data, setData] = useState(fruitables);

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   fetchTable1();
  // },[]);

  // const fetchTable1 = () => {
  //   setIsLoading(true);

  //   axios.get('http://localhost:8080/election/highestmargin').then((respon) => {
  //     const response = respon.data;
  //     setData(response);
  //   } )
  //   .finally(() => {
  //     setIsLoading(false); // Set loading state to false after the request is completed
  //   });
  // }

  const table1Style = {
        borderCollapse: 'collapse',
        width: '100%',
      };
    
      const table1HeaderStyle = {
        border: '1px solid black',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'center',
      };
    
      const table1CellStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'center',
      };


    return (
      <>
      <br/>
      <br/>
      <br/>
      <div>
          <center>
              <h2> Fruitables Demo Price Analysis </h2>
          </center>
      </div>
      <br/>
      <center>
      <table1 style={table1Style}>
        <thead>
          <tr>
            <th style={table1HeaderStyle}>Fruitable Name</th>
            <th style={table1HeaderStyle}>Current Price</th>
            <th style={table1HeaderStyle}>Price Change(in %)</th>
            <th style={table1HeaderStyle}>Previous Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data,index) => (
            <tr key={index}>
              <td style={table1CellStyle}>{data.name}</td>
              <td style={table1CellStyle}>{data.current_price}</td>
              <td style={table1CellStyle}>
                <span style={{color: data.color}}>
                  {data.price_change + " "}
                </span>
                {
                  data.price_change[0] === '-' ? (
                    <FontAwesomeIcon icon={faCaretDown} style={{ color: data.color }} />
                  ) : (
                    data.price_change[0] === '0' ? (
                      <FontAwesomeIcon icon={faMinusCircle} style={{ color: data.color }} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretUp} style={{ color: data.color }} />
                    )
                  )
                }

              </td>
              <td style={table1CellStyle}>{data.prev_price}</td>
            </tr>
          ))}
        </tbody>
      </table1>
      </ center>
      <Graph />
      <WebSocketExample />
      </>
    );
}
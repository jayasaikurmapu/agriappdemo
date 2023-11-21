import React, { useState, useEffect } from 'react';
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from 'sockjs-client';

function App() {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setConnected(false);
    setMessages([]);
  }, []);

  function connect() {
    const socket = new SockJS('http://localhost:8080/websocket-example');
    console.log(socket)
    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      setStompClient(client);
      setConnected(true);
      console.log('Connected: ' + frame);
      client.subscribe('/topic/user', (greeting) => {
        const receivedRecord = JSON.parse(greeting.body);
        console.log('Received Record: ', receivedRecord);
        // showGreeting(JSON.parse(greeting.body).content);
        showGreeting(receivedRecord.name);
      });
    });
  }

  function disconnect() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    setStompClient(null);
    setConnected(false);
    console.log('Disconnected');
  }

  function sendName() {
    if (stompClient) {
      stompClient.send('/app/user', {}, JSON.stringify({ name: name }));
    }
  }

  function showGreeting(message) {
    console.log(message)
    setMessages([...messages, message]);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="connect">WebSocket connection:</label>
              <button
                id="connect"
                className="btn btn-default"
                type="button"
                onClick={connect}
                disabled={connected}
              >
                Connect
              </button>
              <button
                id="disconnect"
                className="btn btn-default"
                type="button"
                onClick={disconnect}
                disabled={!connected}
              >
                Disconnect
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">What is your name?</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              id="send"
              className="btn btn-default"
              type="submit"
              onClick={sendName}
              disabled={!connected}
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>StockInfo</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message, index) => (
                <tr key={index}>
                  <td>{message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default App;

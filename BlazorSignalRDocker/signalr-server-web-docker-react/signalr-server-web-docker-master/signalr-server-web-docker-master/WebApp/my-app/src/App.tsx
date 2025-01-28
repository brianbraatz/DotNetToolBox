import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { HubConnection } from '@microsoft/signalr';

enum ConnectionMethods {
  RECEIVE_MESSAGE = 'ReceiveMessage',
  SEND_MESSAGE = 'SendMessage'
};

interface IAppProps {
  connection: HubConnection;
}

function App({ connection }: IAppProps) {
  const [ messages, setMessages ] = useState<string[]>([]);
  const [ message, setMessage ] = useState('');
  const [ name, setName ] = useState('');

  useEffect(() => {
    connection.on(ConnectionMethods.RECEIVE_MESSAGE, (username: string, message: string) => {
      setMessages([...messages, `${username}: ${message}`]);
    });
  }, [connection, messages]);

  const handleSend = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    connection.send(ConnectionMethods.SEND_MESSAGE, name, message)
    .then(() => {
      setMessage('');
    })
    .catch(console.error);
  }, [connection, message, name]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form action="#" onSubmit={handleSend}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          <br />
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} required />
          <button type="submit">Send message</button>
        </form>

        {messages.map((item, index) => <div key={`${index}-${item}`}>{item}</div>)}
        
      </header>
    </div>
  );
}

export default App;

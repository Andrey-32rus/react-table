import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { routes } from '../navigation/navigation';

export default function InputUsersPage() {

  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);

  const changePlayerName = text => {
    setPlayerName(text);
  }

  const removePlayer = i => {
    let newPlayers = [...players];
    newPlayers.splice(i, 1);
    setPlayers(newPlayers);
  }

  const savePlayer = () => {
    if (playerName === '') return;
    if (players.length >= 4) return;

    let newPlayers = [...players];
    newPlayers.push(playerName);
    setPlayers(newPlayers);
    setPlayerName('');
  }

  const startGame = () => {
    navigate(routes.scoreTable, {state: players});
  }

  return (
    <Container fluid>
      <h3>Введите имена игроков</h3>
      {players.map((player, i) => (
        <Row key={player + i} md className='mt-2'>
          <Col md='10'>
            <Form.Control type="text" defaultValue={player} disabled readOnly />
          </Col>
          <Col>
            <Button variant='success' onClick={() => removePlayer(i)}>Remove</Button>
          </Col>
        </Row>
      ))}
      {players.length < 4
        &&
        <Row md className='mt-4'>
          <Col md='8'>
            <Form.Control type="text" placeholder='имя игрока' value={playerName} onChange={e => changePlayerName(e.target.value)} />
          </Col>
          <Col>
            <Button variant='success' onClick={savePlayer}>Save</Button>
          </Col>
        </Row>}

      <Button variant='primary mt-3' onClick={startGame}>Start game</Button>
    </Container>
  )
}
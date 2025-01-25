import React from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { routes } from '../navigation/navigation';
import { useAppDispatch } from '../store/hooks'
import {useRouter} from "next/router";
import {setGameData} from "../store/slices/gameSlice";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};

const InputUsersPage: React.FC = () => {

    const dispatch = useAppDispatch()
    const router = useRouter();

    const [playerName, setPlayerName] = useState<string>('');
    const [players, setPlayers] = useState<string[]>([]);

    const changePlayerName = (text: string) => {
        setPlayerName(text);
    }

    const removePlayer = (i: number) => {
        let newPlayers = [...players];
        newPlayers.splice(i, 1);
        setPlayers(newPlayers);
    }

    const savePlayer = () => {
        if (playerName === '') return;
        if (players.length >= 10) return;

        let newPlayers = [...players];
        newPlayers.push(playerName);
        setPlayers(newPlayers);
        setPlayerName('');
    }

    const startGame = () => {
        if(players.length < 1)
            return;
        if (window.confirm('Результаты старой игры удаляться. Уверен?!')) {
            dispatch(setGameData({ players, rows: [], removedRows: [], savedRows: [] }))
            router.push(routes.scoreTable)
        }
    }

    return (
      <>
          <h3 className='text-center'>Введите имена игроков</h3>
          <Container fluid>
              {players.map((player, i) => (
                <Row key={player + i} className='mt-2'>
                    <Col sm='8' xs='8'>
                        <Form.Control type="text" defaultValue={player} disabled readOnly />
                    </Col>
                    <Col>
                        <Button variant='success' onClick={() => removePlayer(i)}>Remove</Button>
                    </Col>
                </Row>
              ))}
              {players.length < 10
                &&
                <Row className='mt-4'>
                    <Col sm='8' xs='8'>
                        <Form.Control type="text" placeholder='имя игрока' value={playerName} onChange={e => changePlayerName(e.target.value)} />
                    </Col>
                    <Col>
                        <Button variant='success' onClick={savePlayer}>Save</Button>
                    </Col>
                </Row>}

              <Button variant='primary mt-3' onClick={startGame}>Start game</Button>
          </Container>
      </>
    )
}

export default InputUsersPage

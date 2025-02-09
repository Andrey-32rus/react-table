import React, {JSX, useState} from 'react';
import {useAppDispatch} from "../store/hooks";
import {useRouter} from "next/router";
import {ScoreTableModel} from "../models/ScoreTableModel";
import {routes} from "../navigation/navigation";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {GetServerSideProps} from "next";
import path from "path";
import fs from "fs";
import GameTable from "../components/UI/GameTable";
import {setGameData} from "../store/slices/gameSlice";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";
import {getUserSession} from "../lib/userSession";

type Save = {
  name: string,
  data: ScoreTableModel,
}

interface Props {
  session: Session | null,
  saves: Save[] | null;
}


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const session = await getUserSession(() => getServerSession(context.req as any, context.res as any, authOptions as any))
  try {
    const filePath = path.resolve('saves.json');

    if (!fs.existsSync(filePath)) {
      console.error('Error reading game data: file not exists');
      return {
        props: {
          session,
          saves: null,
        },
      };
    }

    const saves: Save[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return {
      props: {
        session,
        saves, // Возвращаем объект с `gameData`
      },
    };
  } catch (error) {
    console.error('Error reading game data:', error);
    return {
      props: {
        session,
        saves: null, // В случае ошибки возвращаем объект с `gameData: null`
      },
    };
  }
};

const HistoryPage: React.FC<Props> = ({session, saves}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [game, setGame] = useState<ScoreTableModel | null>(null);

  const loadGame = async (gameName: string) => {
    if (!saves)
      return

    if (window.confirm('Результаты старой игры удалятся. Уверен?!')) {

      for (const save of saves) {
        if (save.name === gameName) {
          await dispatch(setGameData(save.data))
          router.push(routes.scoreTable);
        }
      }
    }
  }


  //
  // const deleteGame = (gameName: string) => {
  //     if (window.confirm('Удаляешь. Уверен?!')) {
  //         const updatedSaves = ls.deleteGameAndGetGames(gameName);
  //         setSaves(updatedSaves);
  //     }
  // };

  const backToHistory = () => {
    setGame(null)
  };

  const viewGameHistory = (gameName: string) => {
    if (!saves)
      return

    for (const save of saves) {
      if (save.name === gameName) {
        setGame(save.data)
      }
    }
  };

  //#region POPUP
  // const [show, setShow] = useState(false);
  //
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  //#endregion

  const renderSaves = () => {
    const rows: JSX.Element[] = [];

    if (!saves)
      return rows

    for (const save of saves) {
      const {name, data} = save;
      const row = (
        <Row key={name} className="mb-2 bordered-row">
          <Col sm="2" style={{cursor: 'pointer'}} onClick={() => viewGameHistory(name)}>
            {name}
          </Col>
          <Col style={{cursor: 'pointer'}} onClick={() => viewGameHistory(name)}>
            {JSON.stringify(data, null, 2)}
          </Col>
          <Col sm="1">
            <Button variant="success" onClick={() => loadGame(name)}>
              load
            </Button>
          </Col>
          <Col sm="1">
            <Button variant="danger">
              delete
            </Button>
          </Col>
        </Row>
      );
      rows.push(row);
    }
    return rows;
  };

  if (!session) {
    return (
      <Container fluid>
        <p>Пожалуйста, авторизуйтесь, для просмотра истории. История доступна только авторизованным пользователям.</p>
      </Container>
    )
  }

  return (
    <Container fluid>
      {game &&
        <>
          <Button className="mb-3" onClick={backToHistory}>
            {'<---'}
          </Button>
          <GameTable
            players={game.players}
            rows={game.rows}
            removedRows={new Set(game.removedRows)}
            savedRows={new Set(game.savedRows)}
          />
        </>
      }
      {!game && renderSaves()}
    </Container>
  );
};

export default HistoryPage;
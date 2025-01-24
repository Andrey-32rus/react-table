import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import ls from '../store/localStorageWrapper';
import { routes } from '../navigation/navigation';
import { useAppDispatch } from '../store/hooks';
import { setChangedData } from '../store/changeScoreTable/changeScoreTableSlice';
import ModalDialog from './ModalDialog';
import { ScoreTableModel } from '../models/ScoreTableModel';
import { useRouter } from 'next/router';

const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [saves, setSaves] = useState<Map<string, ScoreTableModel>>(ls.getSavedGames());

  const loadGame = (gameName: string) => {
    if (window.confirm('Результаты старой игры удалятся. Уверен?!')) {
      const gameData = saves.get(gameName);
      if (gameData) {
        dispatch(setChangedData(gameData));
        router.push(routes.scoreTable);
      }
    }
  };

  const deleteGame = (gameName: string) => {
    if (window.confirm('Удаляешь. Уверен?!')) {
      const updatedSaves = ls.deleteGameAndGetGames(gameName);
      setSaves(updatedSaves);
    }
  };

  const viewGameHistory = (gameName: string) => {
    router.push(`/history/${gameName}`);
  };

  //#region POPUP
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //#endregion

  const renderSaves = () => {
    const rows: JSX.Element[] = [];
    for (const [gameName, gameData] of Array.from(saves)) {
      const row = (
        <Row key={gameName} className="mb-2 bordered-row">
          <Col sm="2" style={{ cursor: 'pointer' }} onClick={() => viewGameHistory(gameName)}>
            {gameName}
          </Col>
          <Col style={{ cursor: 'pointer' }} onClick={() => viewGameHistory(gameName)}>
            {JSON.stringify(gameData, null, 2)}
          </Col>
          <Col sm="1">
            <Button variant="success" onClick={() => loadGame(gameName)}>
              load
            </Button>
          </Col>
          <Col sm="1">
            <Button variant="danger" onClick={() => deleteGame(gameName)}>
              delete
            </Button>
          </Col>
        </Row>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <Container fluid>
      {renderSaves()}
      <ModalDialog show={show} onHide={handleClose}>
        {{
          title: 'title',
          body: 'body',
          footer: (
            <>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </>
          ),
        }}
      </ModalDialog>
    </Container>
  );
};

export default HistoryPage;
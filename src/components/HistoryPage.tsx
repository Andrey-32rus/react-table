import React from 'react'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ls from '../store/localStorageWrapper';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { routes } from '../navigation/navigation';
import { useAppDispatch } from '../store/hooks'
import { setChangedData } from '../store/changeScoreTable/changeScoreTableSlice'
import ModalDialog from './ModalDialog';
import { ScoreTableModel } from '../models/ScoreTableModel'

 const HistoryPage = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [saves, setSaves] = useState<Map<string, ScoreTableModel>>(ls.getSavedGames());

  const loadGame = (gameName: string) => {
    if (window.confirm('Результаты старой игры удаляться. Уверен?!')) {
      const gameData = saves.get(gameName)
      if(gameData) {
        dispatch(setChangedData(gameData))
        navigate(routes.scoreTable);
      }
    }
  }

  const deleteGame = (gameName: string) => {
    if (window.confirm('Удаляешь. Уверен?!')) {
      var updatedSaves = ls.deleteGameAndGetGames(gameName)
      setSaves(updatedSaves)
    }
  }

  const viewGameHistory = (gameName: string) => {
    navigate(gameName)
  }

  //#region POPUS
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //#endregion

  const renderSaves = () => {
    let retVal: JSX.Element[] = [];
    for (const [gameName, gameData] of Array.from(saves)) {
        const row = (
          <Row key={gameName} className='mb-2 bordered-row'>
            <Col sm='2' style={{ cursor: 'pointer' }} onClick={() => viewGameHistory(gameName)}>
              {gameName}
            </Col>
            <Col style={{ cursor: 'pointer' }} onClick={() => viewGameHistory(gameName)}>
              {JSON.stringify(gameData, null, 2)}
            </Col>
            <Col sm='1'>
              <Button variant='success' onClick={() => loadGame(gameName)}>load</Button>
            </Col>
            <Col sm='1'>
              <Button variant='danger' onClick={() => deleteGame(gameName)}>delete</Button>
            </Col>
          </Row>
        )
        retVal.push(row);
    }

    return retVal;
  }

  return (
    <Container fluid>
      {renderSaves()}
      <ModalDialog 
        show={show}
        onHide={handleClose}>
          {{
          title: 'title',
          body: 'body',
          footer: 
          <>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </>
          }}
      </ModalDialog>
    </Container>
  )
}

export default HistoryPage
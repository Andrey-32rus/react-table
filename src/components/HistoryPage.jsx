import React from 'react'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ls from '../store/localStorageWrapper';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { routes } from '../navigation/navigation';
import { useDispatch } from 'react-redux'
import { setChangedData } from '../store/changeScoreTable/changeScoreTableSlice'
import ModalDialog from './ModalDialog';

export default function HistoryPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [saves, setSaves] = useState({});
  
  useEffect(() => {
    setSaves(ls.getSavedGames())
  }, [])

  const loadGame = (gameName) => {
    if (window.confirm('Результаты старой игры удаляться. Уверен?!')) {
      dispatch(setChangedData(saves[gameName]))
      navigate(routes.scoreTable);
    }
  }

  const deleteGame = (gameName) => {
    if (window.confirm('Удаляешь. Уверен?!')) {
      var updatedSaves = ls.deleteGameAndGetGames(gameName)
      setSaves(updatedSaves)
    }
  }

  //#region POPUS
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //#endregion

  const renderSaves = () => {
    let retVal = [];
    for (const key in saves) {
      if (Object.hasOwnProperty.call(saves, key)) {
        const element = saves[key];
        const row = (
          <Row key={key} className='mb-2'>
            <Col sm='2'>
              {key}
            </Col>
            <Col style={{cursor: 'pointer'}}>
            {JSON.stringify(element, null, 2)}
            </Col>
            <Col sm='1'>
              <Button variant='success' onClick={() => loadGame(key)}>load</Button>
            </Col>
            <Col sm='1'>
              <Button variant='danger' onClick={() => deleteGame(key)}>delete</Button>
            </Col>
          </Row>
        )
        retVal.push(row);
      }
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

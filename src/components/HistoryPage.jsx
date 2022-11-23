import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ls from '../store/localStorageWrapper';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { routes } from '../navigation/navigation';
import { useDispatch } from 'react-redux'
import { setChangedData } from '../store/changeScoreTable/changeScoreTableSlice'

export default function HistoryPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const saves = ls.getSavedGames();
  
  const loadGame = (gameName) => {
    if (window.confirm('Результаты старой игры удаляться. Уверен?!')) {
      dispatch(setChangedData(saves[gameName]))
      navigate(routes.scoreTable);
    }
      
  }

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
    </Container>
  )
}

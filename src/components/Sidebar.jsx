import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { routes } from '../navigation/navigation';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Sidebar() {

  const setActive = ({isActive}) => isActive ? 'nav-link active' : 'nav-link text-white'

  return (
    <Container fluid>
      <Row>
        <Col sm='3' xs='12' xl='2' className='px-0'>
          <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-sm-100">
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-4">1000</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <NavLink to={routes.inputUsers} className={setActive} aria-current="page">
                  Ввод игроков
                </NavLink>
              </li>
              <li>
                <NavLink to={routes.scoreTable} className={setActive}>
                  Страница игры
                </NavLink>
              </li>
              <li>
                <NavLink to={'history'} className={setActive}>
                  История игр
                </NavLink>
              </li>
            </ul>
          </div>
        </Col>
        <Col className='pt-3'>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

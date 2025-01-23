import React, { ReactNode } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface SidebarProps {
  children: ReactNode;  // Типизируем children как ReactNode
}

  const Sidebar: React.FC<SidebarProps> = ({ children }) => {

  const isActiveFunc = (props: {
    isActive: boolean;
    isPending: boolean;
  }) => props.isActive ? 'nav-link active' : 'nav-link text-white'

  return (
    <Container fluid>
      <Row>
        <Col sm='3' xs='12' xl='2' className='px-0'>
          <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-sm-100">
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-4">Игровая таблица</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <a  href="/score">Score</a>
              </li>
              <li>
                <a href="/inputUsers">Input Users</a>
              </li>
              <li>
                <a href="/history">History</a>
              </li>
            </ul>
          </div>
        </Col>
        <Col className='pt-3'>
          <div className="content">{children}</div> {/* Содержимое */}
        </Col>
      </Row>
    </Container>
  )
}

export default Sidebar
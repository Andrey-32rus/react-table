import React, { ReactNode, useEffect } from 'react';
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col sm="auto" xs="auto" xl="auto" className="background-color-graphite px-1">
          <button
            className="sidebar-toggle btn btn-primary mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>
          </button>
        </Col>
        <Col>
          <div className="content">{children}</div> {/* Содержимое */}
        </Col>
      </Row>
      {/* Кнопка для открытия сайдбара */}


      {/* Сайдбар */}
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        data-bs-backdrop="true"
        tabIndex={-1}
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Игровая таблица
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Закрыть"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>Выберите страницу</p>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a href="/inputUsers" className="nav-link">
                Ввод игроков
              </a>
            </li>
            <li className="nav-item">
              <a href="/score" className="nav-link">
                Таблица игры
              </a>
            </li>
            <li className="nav-item">
              <a href="/history" className="nav-link">
                История
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
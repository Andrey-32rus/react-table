import React, {ReactNode, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useRouter} from "next/router";
import Link from "next/link";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, []);

  const router = useRouter(); // Доступ к маршрутам

  const [currentPath, setCurrentPath] = useState<string>(''); // Текущее местоположение

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Устанавливаем текущий путь на клиентской стороне
      setCurrentPath(router.pathname);
    }
  }, [router.pathname]); // Обновляем, если путь изменился

  const isActive = (href: string) => {
    return currentPath === href ? 'nav-link active' : 'nav-link text-white';
  }

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm="auto" xs="auto" xl="auto" className="h-100 background-color-graphite px-1">
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
        className="offcanvas offcanvas-start text-bg-dark"
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
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link href="/inputUsers" className={isActive('/inputUsers')}>
                Ввод игроков
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/score" className={isActive('/score')}>
                Таблица игры
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/history" className={isActive('/history')}>
                История
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
import React, { ReactNode, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Состояние для открытия/закрытия сайдбара

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(router.pathname);
    }
  }, [router.pathname]);

  const isActive = (href: string) => {
    return currentPath === href ? 'nav-link active' : 'nav-link text-white';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Переключение состояния сайдбара
  };

  return (
    <Container fluid>
      <Row>
        {/* Сайдбар с анимацией */}
        <Col
          sm="3"
          xs="12"
          xl="2"
          className={`px-0 sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        >
          <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-sm-100">
            <a
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              href="/"
            >
              <span className="fs-4">Игровая таблица</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li>
                <Link href="/inputUsers" className={isActive('/inputUsers')}>
                  Ввод игроков
                </Link>
              </li>
              <li>
                <Link href="/score" className={isActive('/score')}>
                  Таблица игры
                </Link>
              </li>
              <li>
                <Link href="/history" className={isActive('/history')}>
                  История
                </Link>
              </li>
            </ul>
            <button className="btn btn-light mt-4" onClick={toggleSidebar}>
              {isSidebarOpen ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        </Col>
        <Col className="pt-3">
          <div className="content">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
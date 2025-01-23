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
      <Container fluid>
        <Row>
          <Col sm="3" xs="12" xl="2" className="px-0">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-sm-100">
              <a
                  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                  href="/"
              >
                <span className="fs-4">Игровая таблица</span>
              </a>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <Link href="/score" className={isActive('/score')}>
                    Score
                  </Link>
                </li>
                <li>
                  <Link href="/inputUsers" className={isActive('/inputUsers')}>
                    Input Users
                  </Link>
                </li>
                <li>
                  <Link href="/history" className={isActive('/history')}>
                    History
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col className="pt-3">
            <div className="content">{children}</div> {/* Содержимое */}
          </Col>
        </Row>
      </Container>
  );
};

export default Sidebar;
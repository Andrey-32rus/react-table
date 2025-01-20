import React, { useState, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { routes } from '../navigation/navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Sidebar: React.FC = () => {
    const [sidebarWidth, setSidebarWidth] = useState(300); // Начальная ширина сайдбара
    const isActiveFunc = (props: { isActive: boolean; isPending: boolean }) =>
        props.isActive ? 'nav-link active' : 'nav-link text-white';

    const sidebarRef = useRef<HTMLDivElement>(null); // Реф для сайдбара

    const onMouseDown = (e: React.MouseEvent) => {
        // Запоминаем начальное положение мыши и ширину сайдбара
        const startX = e.clientX;
        const startWidth = sidebarRef.current?.offsetWidth || 0;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            if (newWidth > 250 && newWidth < 1000) {
                setSidebarWidth(newWidth); // Обновляем ширину сайдбара
            } else {
                // Если ширина выходит за пределы, прекращаем обработку
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <Container fluid>
            <Row>
                <Col
                    sm="3"
                    xs="12"
                    xl="2"
                    className="px-0"
                    style={{
                        width: `${sidebarWidth}px`,
                        transition: 'width 0.2s ease',
                        position: 'relative', // Нужно для правильного позиционирования ползунка
                    }}
                    ref={sidebarRef}
                >
                    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-sm-100">
                        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-4">Игровая таблица</span>
                        </a>
                        <hr/>
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <NavLink to={'inputUsers'} className={isActiveFunc} aria-current="page">
                                    Ввод игроков
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={routes.scoreTable} className={isActiveFunc}>
                                    Страница игры
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'history'} className={isActiveFunc}>
                                    История игр
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    {/* Ползунок для изменения ширины */}
                    <div
                        onMouseDown={onMouseDown}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '10px',
                            height: '100%',
                            cursor: 'ew-resize',
                            backgroundColor: '#888', // Серый цвет для лучшей видимости
                            zIndex: 10, // Убедимся, что ползунок не перекрывается другими элементами
                        }}
                    ></div>
                </Col>
                <Col className="pt-3">
                    <Outlet/>
                </Col>
            </Row>
        </Container>
    );
};

export default Sidebar;
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { routes } from '../navigation/navigation';

export default function Sidebar() {

  const setActive = ({isActive}) => isActive ? 'nav-link active' : 'nav-link text-white'

  // "nav-link active"
  // "nav-link text-white"
  return (
    <div className='d-flex'>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-100" style={{ width: '180px' }}>
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
        </ul>
      </div>
      <Outlet/>
    </div>
  )
}

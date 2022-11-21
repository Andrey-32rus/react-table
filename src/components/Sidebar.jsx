import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { routes } from '../navigation/navigation';

export default function Sidebar() {
  return (
    <div className='d-flex'>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark vh-100" style={{ width: '180px' }}>
        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">Sidebar</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to={routes.inputUsers} className="nav-link active" aria-current="page">
              inputUsers
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.scoreTable} className="nav-link text-white">
              scoreTable
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet/>
    </div>
  )
}

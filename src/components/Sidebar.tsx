import React, {ReactNode, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faBookOpen, faTable, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {signOut, useSession} from "next-auth/react";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({children}) => {

  const {data: session} = useSession();

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, []);

  const [sidebarToggled, setSidebarToggled] = useState<boolean>(false);

  const sidebarToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', String(!sidebarToggled));
    setSidebarToggled(!sidebarToggled)
  }


  return (
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/*<!-- Sidebar Toggle-->*/}
        <button className="btn btn-link btn-sm order-0 ms-2 me-4 me-lg-0" id="sidebarToggle"
                onClick={sidebarToggleClick}>
          <FontAwesomeIcon icon={faBars}/>
        </button>
        {/*<!-- Navbar Brand-->*/}
        <a className="navbar-brand ps-3" href="/">React Table</a>
        {/*<!-- Navbar Search-->*/}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        </form>
        {/*<!-- Navbar-->*/}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="me-2">{session?.user?.name}</span>
              <FontAwesomeIcon icon={faUser} fixedWidth/>
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              {session && <li onClick={async () => await signOut()}><a className="dropdown-item">Logout</a></li>}
              {!session && <li><a className="dropdown-item" href="/auth/signin">Login</a></li>}
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <a className="nav-link" href="/inputUsers">
                  <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faUsers}/></div>
                  Ввод игроков
                </a>
                <a className="nav-link" href="/score">
                  <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faTable}/></div>
                  Игровая таблица
                </a>
                <a className="nav-link" href="/history">
                  <div className="sb-nav-link-icon"><FontAwesomeIcon icon={faBookOpen}/></div>
                  История
                </a>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              {session &&
                <>
                  <div className="small">Logged in as:</div>
                  {session.user?.name}
                </>
              }
              {!session &&
                <>
                  <div className="small">Not Logged in:</div>
                  Please Login
                </>
              }
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            {children}
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; React Table 2025</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
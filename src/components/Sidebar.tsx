import React, { ReactNode, useEffect } from 'react';

interface SidebarProps {
  children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, []);

  return (
    <div>
      {/* Кнопка для открытия сайдбара */}
      <button
        className="btn btn-primary mb-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        Открыть сайдбар
      </button>

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
            Меню
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Закрыть"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>Это содержимое сайдбара.</p>
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
    </div>
  );
};

export default Sidebar;
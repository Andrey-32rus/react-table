import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import ScoreTable from './components/ScoreTable';
import InputUsersPage from './components/InputUsersPage';
import HistoryPage from './components/HistoryPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GameHistoryPage from './components/GameHistoryPage';

const App: React.FC = () => {
  return (
      <Routes>
        <Route path={'/'} element={<Sidebar />}>
          <Route path={'inputUsers'} element={<InputUsersPage />} />
          <Route path={'score'} element={<ScoreTable />} />
          <Route path={'history'} element={<HistoryPage />} />
          <Route path={'history/:gameName'} element={<GameHistoryPage />} />
          <Route path='' element={<Navigate to="score" />}/>
        </Route>
        <Route path="*" element={<Navigate to="score" />}
        />
      </Routes>
  );
}

export default App;

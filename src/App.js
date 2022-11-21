import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScoreTable from './components/ScoreTable';
import InputUsersPage from './components/InputUsersPage';
import { Routes, Route } from 'react-router-dom';
import { routes } from './navigation/navigation';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Routes>
        <Route path={routes.inputUsers} element={<InputUsersPage/>}/>
        <Route path={routes.scoreTable} element={<ScoreTable />} />
        <Route path={'/side'} element={<Sidebar />} />
      </Routes>
    </>
  );
}

export default App;

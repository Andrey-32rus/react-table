import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScoreTable from './components/ScoreTable';
import InputUsersPage from './components/InputUsersPage';
import History from './components/History';
import { Routes, Route } from 'react-router-dom';
import { routes } from './navigation/navigation';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Sidebar />}>
          <Route path={''} element={<InputUsersPage />} />
          <Route path={'score'} element={<ScoreTable />} />
          <Route path={'history'} element={<History />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

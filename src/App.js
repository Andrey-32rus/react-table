import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ScoreTable from './components/ScoreTable';
import InputUsersPage from './components/InputUsersPage';
import { Routes, Route } from 'react-router-dom';
import { routes } from './navigation/navigation';

function App() {
  return (
    <>
      <Routes>
        <Route path={routes.inputUsers} element={<InputUsersPage/>}/>
        <Route path={routes.scoreTable} element={<ScoreTable />} />
      </Routes>
    </>
  );
}

export default App;

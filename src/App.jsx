import './App.css'
import { Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';
import Home from './components/Home';

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/calendar" element={<TrainingCalendar />} />
      </Routes>
    </>
  );
}

export default App

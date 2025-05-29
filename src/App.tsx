import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";

import './index.css';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <AppRouter />
    </Router>
  );
}

export default App;
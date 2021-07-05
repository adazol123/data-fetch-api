import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Header/Navbar';
import { route as Route } from './util/route';

function App() {
  return (
    <Router>
      <Navbar />
      <Route/>
    </Router>
  );
}

export default App;

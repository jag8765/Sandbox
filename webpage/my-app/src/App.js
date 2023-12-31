import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './pages';
import About from './pages/About';
import NewGame from './pages/NewGame';
import Login from './pages/Login';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/newGame' element={<NewGame />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import MainContent from './components/Dashboard/MainContent';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/dashboard" element={<Dashboard />} >
				 <Route path="" element={<MainContent/>}/>
			</Route>
		</Routes>
	);
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import MainContent from './components/Dashboard/MainContent';
import UserTasks from './components/UserTasks/UserTasks';
import RegisterPrivate from './components/PrivateRoutes/RegisterPrivate';
import DashboardPrivate from './components/PrivateRoutes/DashboardPrivate';

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<RegisterPrivate>
						<Register />
					</RegisterPrivate>
				}
			/>
			<Route
				path="/login"
				element={
					<RegisterPrivate>
						<Login />
					</RegisterPrivate>
				}
			/>
			<Route
				path="/dashboard"
				element={
					<DashboardPrivate>
						<Dashboard />
					</DashboardPrivate>
				}
			>
				<Route path="" element={<MainContent />} />
				<Route path="user/:id" element={<UserTasks />} />
			</Route>
		</Routes>
	);
}

export default App;

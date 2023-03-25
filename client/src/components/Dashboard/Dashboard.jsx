import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import './dashboard.css'
const Dashboard = () => {
	return (
		<div id="dashboard">
			<div id="navbar">
				<Navbar />
			</div>
			<div id="sidebar">
				<Sidebar />
			</div>
			<div id="outlet">
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;

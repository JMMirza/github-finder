import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layouts/alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);
		setUser(res.data);
		setLoading(false);
	};

	const getUserRepos = async (username) => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);
		setRepos(res.data);
		setLoading(false);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const searchUsers = async (text) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);
		setUsers(res.data.items);
		setLoading(false);
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => {
			setAlert(null);
		}, 5000);
	};
	return (
		<Router>
			<div className='App'>
				<Navbar title='GitHub Finder' icon='fab fa-github' />
				<div className='container'>
					<Alert alert={alert} />
					<Routes>
						<Route
							exact
							path='/'
							element={
								<Fragment>
									<Search
										searchUser={searchUsers}
										clearUsers={clearUsers}
										showClear={users.length > 0 ? true : false}
										setAlert={showAlert}
									/>
									<Users loading={loading} users={users} />
								</Fragment>
							}
						/>
						<Route exact path='/about' element={<About />} />
						<Route
							exact
							path='/user'
							element={
								<User
									getUser={getUser}
									getUserRepos={getUserRepos}
									user={user}
									repos={repos}
									loading={loading}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;

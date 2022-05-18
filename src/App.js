import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layouts/alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
	state = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		alert: null,
	};
	// async componentDidMount() {
	// 	this.setState({ loading: true });
	// 	const data = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({ users: data.data, loading: false });
	// }

	getUser = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);
		this.setState({ user: res.data, loading: false });
	};

	getUserRepos = async (username) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);
		this.setState({ repos: res.data, loading: false });
	};

	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	searchUsers = async (text) => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		console.log(res.data);
		this.setState({ users: res.data.items, loading: false });
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
		setTimeout(() => {
			this.setState({ alert: null });
		}, 5000);
	};

	render() {
		return (
			<Router>
				<div className='App'>
					<Navbar title='GitHub Finder' icon='fab fa-github' />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Routes>
							<Route
								exact
								path='/'
								element={
									<Fragment>
										<Search
											searchUser={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={this.state.users.length > 0 ? true : false}
											setAlert={this.setAlert}
										/>
										<Users
											loading={this.state.loading}
											users={this.state.users}
										/>
									</Fragment>
								}
							/>
							<Route exact path='/about' element={<About />} />
							<Route
								exact
								path='/user'
								element={
									<User
										getUser={this.getUser}
										getUserRepos={this.getUserRepos}
										user={this.state.user}
										repos={this.state.repos}
										loading={this.state.loading}
									/>
								}
							/>
						</Routes>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

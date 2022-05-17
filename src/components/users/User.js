import React, { Component } from "react";
// import { useLocation } from "react-router-dom";

export class User extends Component {
	// getParams = () => {
	// 	const { login } = useParams();
	// 	return login;
	// };
	componentDidMount() {
		const queryParams = new URLSearchParams(window.location.search);
		console.log(queryParams.get("username"));
		// const location = useLocation();
		this.props.getUser(queryParams.get("username"));
	}
	render() {
		// this.props.getUser(this.getParams);
		// console.log(this.props);
		const {
			name,
			avatar_url,
			location,
			_bio,
			blog,
			login,
			html_url,
			followers,
			following,
			public_repos,
			public_gists,
			hireable,
		} = this.props.user;

		const { loading } = this.props;
		return <div>{name}</div>;
	}
}

export default User;

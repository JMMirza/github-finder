import React, { Component } from "react";

export class User extends Component {
	componentDidMount() {
		console.log(this.props);
		this.props.getUser("brad");
	}

	render() {
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

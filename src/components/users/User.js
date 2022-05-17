import React, { Component, Fragment } from "react";
import { Spinner } from "../layouts/spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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

	static propTypes = {
		loading: PropTypes.bool,
		user: PropTypes.object.isRequired,
		getUser: PropTypes.func.isRequired,
	};
	render() {
		const {
			name,
			avatar_url,
			location,
			bio,
			company,
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
		if (loading) return <Spinner />;
		return (
			<Fragment>
				<Link to='/' className='btn btn-light'>
					{" "}
					Back To Search
				</Link>
				Hireable:{" "}
				{hireable ? (
					<i className='fas fa-check text-success'></i>
				) : (
					<i className='fas fa-times-circle text-danger' />
				)}
				<div className='card grid-2'>
					<div className='all-center'>
						<img
							src={avatar_url}
							className='round-img'
							alt=''
							style={{ width: "150px" }}
						/>
						<h1> {name} </h1>
						<p> {location} </p>
					</div>
					<div>
						{bio && (
							<Fragment>
								<h3>BIO</h3>
								<p>{bio}</p>
							</Fragment>
						)}
						<a
							href={html_url}
							className='btn btn-dark my-1'
							rel='noreferrer'
							target='_blank'
						>
							Visit Github Profile
						</a>
						<ul>
							<li>
								{login && (
									<Fragment>
										<strong>Username: </strong>
										{login}
									</Fragment>
								)}
							</li>
							<li>
								{company && (
									<Fragment>
										<strong>Company: </strong>
										{company}
									</Fragment>
								)}
							</li>
							<li>
								{blog && (
									<Fragment>
										<strong>Website: </strong>
										{blog}
									</Fragment>
								)}
							</li>
						</ul>
					</div>
				</div>
				<div className='card text-center'>
					<div className='badge badge-primary'>Followers: {followers}</div>
					<div className='badge badge-success'>Following: {following}</div>
					<div className='badge badge-light'>Public Repos: {public_repos}</div>
					<div className='badge badge-dark'>Public Gist: {public_gists}</div>
				</div>
			</Fragment>
		);
	}
}

export default User;

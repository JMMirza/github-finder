import React from "react";
import UserItems from "./UserItems";
import { Spinner } from "../layouts/spinner";
import PropTypes from "prop-types";

const Users = (props) => {
	if (props.loading) {
		return <Spinner />;
	} else {
		return (
			<div style={userStyle}>
				{props.users.map((user) => (
					<UserItems key={user.id} user={user} />
				))}
			</div>
		);
	}
};
const userStyle = {
	display: "grid",
	gridTemplateColumns: "repeat(3,1fr)",
	gridGap: "1rem",
};

Users.prototype = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};
export default Users;

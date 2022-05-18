import React from "react";
import PropTypes from "prop-types";

export const RepoItems = ({ repo }) => {
	return (
		<div className='card'>
			<h3>
				<a href={repo.html_url} rel='noreferrer' target='_blank'>
					{repo.name}
				</a>
			</h3>
		</div>
	);
};

RepoItems.prototypes = {
	repo: PropTypes.object.isRequired,
};

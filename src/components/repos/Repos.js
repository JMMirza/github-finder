import React from "react";
import { RepoItems } from "./RepoItems";
import PropTypes from "prop-types";

export const Repos = ({ repos }) => {
	return repos.map((repo) => <RepoItems repo={repo} key={repo.id} />);
};
Repos.prototypes = {
	repos: PropTypes.array.isRequired,
};

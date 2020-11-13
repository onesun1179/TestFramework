import React, {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import withStyles, { WithStylesProps } from "react-jss";
import AuthManager from "./AuthManager.screen";

interface HomeProps extends WithStylesProps<typeof styles> {}

interface Home {}
const styles = (theme) => ({});
const Home = ({ classes }: HomeProps) => {
	return <AuthManager />;
};

export default withStyles(styles)(Home);

import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export async function getStaticProps({ locale }) {
	// locale = "en-US"

	const appData = require("../data/i18n/" + locale + "/appData.ts").default;

	const pageDic = require("../data/i18n/" + locale + "/page.js")["/"];

	return {
		props: {
			currentPage: {
				title: pageDic.title,
				path: "/",
			},
			locale,
			appData,
			pageDic,
		},
	};
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		icon: {
			color: "rgba(255, 255, 255, 0.54)",
		},
	})
);

export default function Index() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container direction="row-reverse" spacing={1}>
				<Grid item xs={12} sm={3}>
					Hello, world!
				</Grid>
				<Grid item sm={9} xs={12}>
					Something
				</Grid>
			</Grid>
		</div>
	);
}

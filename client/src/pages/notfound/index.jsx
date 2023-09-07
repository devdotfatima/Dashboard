import React from "react";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				// backgroundColor: primary,
			}}
		>
			<Typography
				variant="h1"
				style={{ color: "white" }}
			>
				404 Page not Found
			</Typography>
		</Box>
	);
};

export default NotFound;

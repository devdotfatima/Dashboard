import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const NotFound = () => {
	const theme = useTheme();
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
				fontSize="1.75rem"
				sx={{ color: theme.palette.secondary[200] }}
			>
				404 Page not Found
			</Typography>
		</Box>
	);
};

export default NotFound;

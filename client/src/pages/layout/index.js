import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { getUser } from "api";

const Layout = () => {
	const isNonMobile = useMediaQuery("(min-width:600px)");
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const userId = useSelector((state) => state.global.userId);

	// Queries
	const { isLoading, isError, data, error } = useQuery(["user", userId], () =>
		getUser(userId)
	);
	if (isLoading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="60vh"
			>
				<CircularProgress md />
			</Box>
		);
	}

	const user = data?.data;
	if (isError) {
		return <span>Error: {error.message}</span>;
	}
	return (
		<Box
			display={isNonMobile ? "flex" : "block"}
			width="100%"
			height="100%"
		>
			<Sidebar
				user={user || {}}
				isNonMobile={isNonMobile}
				drawerWidth="250px"
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Box flexGrow={1}>
				<Navbar
					user={user || {}}
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				/>
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;

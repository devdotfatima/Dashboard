import {
	useTheme,
	AppBar,
	Toolbar,
	IconButton,
	InputBase,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
	ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { globalActions } from "state_managment";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	return (
		<AppBar
			sx={{
				position: "static",
				background: "none",
				boxShadow: "none",
			}}
		>
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<FlexBetween>
					<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						bgcolor={theme.palette.background.alt}
						borderRadius={"9px"}
						gap="3rem"
						p="0.1rem 1.5rem"
					>
						<InputBase placeholder="Search..." />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>

				<FlexBetween gap={"1.5rem"}>
					<IconButton onClick={() => dispatch(globalActions.setMode())}>
						{theme.palette.mode === "dark" ? (
							<DarkModeOutlined sx={{ fontSize: "25px" }} />
						) : (
							<LightModeOutlined sx={{ fontSize: "25px" }} />
						)}
					</IconButton>
					<IconButton>
						<SettingsOutlined sx={{ fontSize: "25px" }} />
					</IconButton>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
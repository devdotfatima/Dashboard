import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard from "pages/dashboard";
import Layout from "pages/layout";
import Products from "pages/products";
import Customers from "pages/customers";
import Transactions from "pages/transactions";
import Geography from "pages/geography";
import NotFound from "pages/notfound";
import Overview from "pages/overview";
import Daily from "pages/daily";
import Monthly from "pages/monthly";
import Breakdown from "pages/breakdown";

const queryClient = new QueryClient();
function App() {
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Routes>
							<Route element={<Layout />}>
								<Route
									path="/"
									element={
										<Navigate
											to="/dashboard"
											replace
										/>
									}
								/>
								<Route
									path="/dashboard"
									element={<Dashboard />}
								/>
								<Route
									path="/products"
									element={<Products />}
								/>

								<Route
									path="/customers"
									element={<Customers />}
								/>
								<Route
									path="/transactions"
									element={<Transactions />}
								/>
								<Route
									path="/geography"
									element={<Geography />}
								/>
								<Route
									path="/overview"
									element={<Overview />}
								/>
								<Route
									path="/daily"
									element={<Daily />}
								/>
								<Route
									path="/monthly"
									element={<Monthly />}
								/>
								<Route
									path="/breakdown"
									element={<Breakdown />}
								/>
							</Route>
							<Route
								path="*"
								element={<NotFound />}
							/>
						</Routes>
					</ThemeProvider>
				</BrowserRouter>
			</div>
		</QueryClientProvider>
	);
}

export default App;

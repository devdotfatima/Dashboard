import React, { useState } from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useQuery } from "react-query";
import { getTransactions } from "api";

const Transactions = () => {
	const theme = useTheme();

	// values to be sent to the backend
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(20);
	const [sort, setSort] = useState({});
	const [search, setSearch] = useState("");

	const [searchInput, setSearchInput] = useState("");

	const { isLoading, isError, data, error } = useQuery(
		["transactions", page, pageSize, sort, search],
		() =>
			getTransactions({
				page,
				pageSize,
				sort: JSON.stringify(sort),
				search,
			})
	);
	if (isLoading) {
		return (
			<>
				<Header
					title="TRANSACTIONS"
					subtitle="See your list of transactions."
				/>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					minHeight="60vh"
				>
					<CircularProgress />
				</Box>
			</>
		);
	}
	const transactions = data?.data?.transactions;
	if (isError) {
		return <span>Error: {error.message}</span>;
	}
	const columns = [
		{
			field: "_id",
			headerName: "ID",
			flex: 1,
		},
		{
			field: "userId",
			headerName: "User ID",
			flex: 1,
		},
		{
			field: "createdAt",
			headerName: "CreatedAt",
			flex: 1,
		},
		{
			field: "products",
			headerName: "# of Products",
			flex: 0.5,
			sortable: false,
			renderCell: (params) => params.value.length,
		},
		{
			field: "cost",
			headerName: "Cost",
			flex: 1,
			renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
		},
	];

	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="TRANSACTIONS"
				subtitle="Entire list of transactions"
			/>
			<Box
				height="80vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: theme.palette.primary.light,
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[100],
						borderTop: "none",
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${theme.palette.secondary[200]} !important`,
					},
				}}
			>
				<DataGrid
					loading={isLoading || !transactions}
					getRowId={(row) => row._id}
					rows={transactions || []}
					columns={columns}
					rowCount={transactions.length || 0}
					rowsPerPageOptions={[20, 50, 100]}
					pagination
					page={page}
					pageSize={pageSize}
					paginationMode="server"
					sortingMode="server"
					onPageChange={(newPage) => setPage(newPage)}
					onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
					onSortModelChange={(newSortModel) => setSort(...newSortModel)}
					components={{ Toolbar: DataGridCustomToolbar }}
					componentsProps={{
						toolbar: { searchInput, setSearchInput, setSearch },
					}}
				/>
			</Box>
		</Box>
	);
};

export default Transactions;

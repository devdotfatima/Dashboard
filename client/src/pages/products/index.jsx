import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Header from "components/Header";
import Product from "./components/product";
import { useQuery } from "react-query";
import { getProducts } from "api";

const Products = () => {
	const { isLoading, isError, data, error } = useQuery(
		["products"],
		getProducts
	);
	const isNonMobile = useMediaQuery("(min-width: 1000px)");
	if (isLoading) {
		return (
			<>
				<Header
					title="PRODUCTS"
					subtitle="See your list of products."
				/>
				<span>Loading...</span>;
			</>
		);
	}
	const products = data.data;
	if (isError) {
		return <span>Error: {error.message}</span>;
	}
	return (
		<Box m="1.5rem 2.5rem">
			<Header
				title="PRODUCTS"
				subtitle="See your list of products."
			/>
			<Box
				mt="20px"
				display="grid"
				gridTemplateColumns="repeat(4, minmax(0, 1fr))"
				justifyContent="space-between"
				rowGap="20px"
				columnGap="1.33%"
				sx={{
					"& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
				}}
			>
				{products.map(
					({
						_id,
						name,
						description,
						price,
						rating,
						category,
						supply,
						stat,
					}) => (
						<Product
							key={_id}
							_id={_id}
							name={name}
							description={description}
							price={price}
							rating={rating}
							category={category}
							supply={supply}
							stat={stat}
						/>
					)
				)}
			</Box>
		</Box>
	);
};

export default Products;

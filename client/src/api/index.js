import Axios from "axios";

const instance = Axios.create({
	baseURL: "http://localhost:6001",
});

export const getUser = (id) => instance.get(`/general/user/${id}`);
export const getProducts = () => instance.get(`/client/products`);
export const getCustomers = () => instance.get(`/client/customers`);
export const getTransactions = ({ page, pageSize, sort, search }) =>
	instance.get(`/client/transactions`, {
		params: {
			page,
			pageSize,
			search,
			sort,
		},
	});
export const getGeography = () => instance.get(`/client/geography`);

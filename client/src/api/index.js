import Axios from "axios";

const instance = Axios.create({
	baseURL: "http://localhost:6001",
});

export const getUser = (id) => instance.get(`/general/user/${id}`);

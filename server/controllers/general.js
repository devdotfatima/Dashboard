import { isValidObjectId } from "mongoose";
import User from "../models/User.js";
// import OverallStat from "../models/OverallStat.js";
// import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: "Invalid user ID" });
		}
		const user = await User.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import salesRoutes from "./routes/sales.js";
import managementRoutes from "./routes/management.js";

//DATA IMPORTS

import User from "./models/User.js";
import { dataUser } from "./data/index.js";

// CONFIGURATION

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ROUTES

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);

// Mongoose setup

const PORT = process.env.PORT || 9000;
console.log(PORT);
mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log("Server has started at ", PORT));
		//ONLY ADD DATA ONE TIME
		// User.insertMany(dataUser);
	})
	.catch((error) => console.log("error>>:", error));

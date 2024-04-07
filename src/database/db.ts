import mongoose from "mongoose";
import chalk from "chalk";

mongoose.connect(<string>process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log(chalk.red("Error occurred from the database"));
});
db.once("open", () => {
  console.log(chalk.cyan.underline.bold(`Successfully connected to database`));
});

export default db;

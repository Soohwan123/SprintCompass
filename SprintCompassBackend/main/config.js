import { config } from "dotenv";
config();
export const usersCollection = process.env.USERCOLLECTION;
export const atlas = process.env.DBURL;
export const sprintcompassDB = process.env.DB;
export const port = process.env.PORT;
export const graphql = process.env.GRAPHQLURL;
import { config } from "dotenv";
config();
export const usersCollection = process.env.USERCOLLECTION;
export const projectsCollection = process.env.PROJECTCOLLECTION;
export const projects_usersCollection = process.env.PROJECTUSERCOLLECTION;
export const atlas = process.env.DBURL;
export const sprintcompassDB = process.env.DB;
export const port = process.env.PORT;
export const graphql = process.env.GRAPHQLURL;
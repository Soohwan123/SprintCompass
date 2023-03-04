import { loadAlerts } from "./project1_setup.js";
import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import moment from 'moment';

const resolvers = {
    getallusers: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.usersCollection, {}, {});
    },
    adduser: async (args) => {
        let db = await dbRtns.getDBInstance();
        let user = {UniqueID: args.UniqueID,
            AccountID: args.AccountID,
            Password: args.Password,
            FirstName: args.FirstName,
            LastName: args.LastName,
            BirthDate: args.BirthDate,
            PhoneNumber: args.PhoneNumber,
            };
        let results = await dbRtns.addOne(db, cfg.usersCollection, user);
        return results.acknowledged ? user : null;  
    },
    getuser: async (args) => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, cfg.usersCollection, { UniqueID: args });
    },
};
export { resolvers };
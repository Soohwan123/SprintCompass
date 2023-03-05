import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import moment from 'moment';

const resolvers = {
    getallusers: async () => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findAll(db, cfg.usersCollection, {}, {});
    },
    getuser: async (args) => {
        let db = await dbRtns.getDBInstance();
        return await dbRtns.findOne(db, cfg.usersCollection, { UniqueID: args });
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
    addproject: async (args) => {
        let db = await dbRtns.getDBInstance();
        let project = {
            ProjectName: args.ProjectName,
            Stacks: args.Stacks,
            NumOfSprints: args.NumOfSprints,
            Description: args.Description,
            };
        let results = await dbRtns.addOne(db, cfg.projectsCollection, project);
        return results.acknowledged ? project : null;  
    },
};
export { resolvers };
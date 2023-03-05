const schema = `
type Query {
    getallusers : [User],
    getuser(UniqueID: String) : User,
}

type Mutation {
    adduser(
        UniqueID: String
        AccountID: String
        Password: String
        FirstName: String
        LastName: String
        BirthDate: String
        PhoneNumber: String
    ): User

    addproject(
        ProjectName: String
        Stacks: String
        NumOfSprints: Int
        Description: String
    ): Project
},

type User {
    UniqueID: String
    AccountID: String
    Password: String
    FirstName: String
    LastName: String
    BirthDate: String
    PhoneNumber: String
}

type Project {
    ProjectName: String
    Stacks: String
    NumOfSprints: String
    Description: String
}
  
`;
export { schema };
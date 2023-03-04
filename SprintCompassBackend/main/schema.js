const schema = `
type Query {
    getallusers : [User],
    adduser(User: User) : User,
    getuser(UniqueID: String) : User,
}

type Mutation {
    adduser(UniqueID: String
        AccountID: String
        Password: String
        FirstName: String
        LastName: String
        BirthDate: String
        PhoneNumber: String
        ): User
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
  
`;
export { schema };
const { ApolloServer, gql } = require('apollo-server');

// Toda reques é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POS/PUT/PATCH/DELETE)
// Scalar Types -> String, Int, Boolean, Float e ID

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        active: Boolean!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        hello: String
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email:String!): User!
    }
`;

const users = [
    { _id: String(Math.random()), name: 'Enzo', email: 'enzo@teste.com.br', active: true },
    { _id: String(Math.random()), name: 'Enzo 2', email: 'enzo2@teste.com.br', active: false },
    { _id: String(Math.random()), name: 'Enzo 3', email: 'enzo3@teste.com.br', active: true },
]

const resolvers = {
    Query: {
        hello: () => 'Hello world',
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find((users) => users.email === args.email);
        },
    },

    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                _id: String(Math.random()),
                name: args.email,
                email: args.email,
                active: args.true,
            }

            users.push(newUser);
            return newUser;
        }

    }
};

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`🔥 Server started at ${url}`));
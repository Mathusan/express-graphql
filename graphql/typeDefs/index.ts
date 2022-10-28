import {buildSchema, GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql'
import {signUp, logIn,} from '../../src/services/user.service'



const UserType = new GraphQLObjectType({
    name: 'User',
    fields :() =>({
        id : {type :GraphQLID},
        name: {type : GraphQLString},
        email: {type :GraphQLString},
        //password : {type: GraphQLString},
        token: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: UserType,
            args :{
                email : {type : GraphQLString},
                password : {type : GraphQLString}
            },
            async resolve(parent,args) {
                const {id, token} = await logIn({args})
                return {id,token}
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        register: { 
            type: UserType,
            args:{
                name : {type : GraphQLString},
                email : {type : GraphQLString},
                password : {type : GraphQLString},
            },
            async resolve(){

            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation:mutation
})










// export const schema =  buildSchema(`
//     type User{
//         id: ID!
//         name: String!
//         email: String!
//         password: String!
//         token: String!
//     }

//     type Query {  
//         login(email: String! , password:String!) : User!
//     }

//     input CreateUserInput {
//     name: String!
//     email: String!
//     password: String!
//     }

//     type Mutation {
//         register(registerInput: CreateUserInput!): User
//     } 
// `)
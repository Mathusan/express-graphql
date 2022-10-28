import {buildSchema, GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql'
import {signUp, logIn,} from '../../src/services/user.service'


const UserType = new GraphQLObjectType({
    name: 'User',
    fields:{
        id : {type :GraphQLID},
        name: {type : GraphQLString},
        email: {type :GraphQLString},
        //password : {type: GraphQLString},
        token: {type: GraphQLString}
    }

})

const AuthPayload = new GraphQLObjectType({
    name:'Payload',
    fields:{
        token : { type: GraphQLString},
        id : { type: GraphQLID}
    }
        
    
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        login: {
            type: AuthPayload,
            args :{
                email : {type : GraphQLString},
                password : {type : GraphQLString}
            },
            async resolve(parent,args) {
                const data = await logIn({email:args.email,password:args.password})
                console.log(data)
                return data
            }
        },
        test : {
            type: AuthPayload,
            resolve(){
                const token = "test"
                const id = "testid"
                return{
                    token:token,
                    id:id
                }
            }

        }
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        register: { 
            type: AuthPayload,
            args:{
                name : {type : GraphQLString},
                email : {type : GraphQLString},
                password : {type : GraphQLString},
            },
            async resolve(parent,args){
                const data = await signUp({name:args.name, email:args.email, password:args.password})
                console.log(data)
                return data
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})



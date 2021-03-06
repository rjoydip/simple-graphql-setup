const {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');
const axios = require('axios');

const BASE_URL = `http://localhost:3000/users`;

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'users fields and types',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Simple hello world',
    fields: {
        users: {
            type: new GraphQLList(userType),
            resolve: (source, args, context) => {
                return axios.get(`${BASE_URL}`).then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: queryType
})
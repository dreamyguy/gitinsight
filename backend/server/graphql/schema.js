const graphql = require('graphql');
const axios = require('axios');
const requestRoot = require('./../../../config').requestRoot;

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// Define types

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`${requestRoot()}/companies/${parentValue.id}/users`)
          .then(resp => resp.data); // because 'axios' returns a 'data' obj
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`${requestRoot()}/companies/${parentValue.companyId}`)
          .then(resp => resp.data); // because 'axios' returns a 'data' obj
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, args) {
        return axios.get(`${requestRoot()}/users/${args.id}`).then(resp => resp.data); // because 'axios' returns a 'data' obj
      },
    },
    company: {
      type: CompanyType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, args) {
        return axios.get(`${requestRoot()}/companies/${args.id}`).then(resp => resp.data); // because 'axios' returns a 'data' obj
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        companyId: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, { firstName, age }) {
        return axios
          .post(`${requestRoot()}/users`, {
            firstName,
            age,
          })
          .then(resp => resp.data); // because 'axios' returns a 'data' obj
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, { id }) {
        return axios.delete(`${requestRoot()}/users/${id}`).then(resp => resp.data); // because 'axios' returns a 'data' obj
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        firstName: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
        companyId: {
          type: GraphQLString,
        },
      },
      resolve(parentValue, args) {
        return axios.patch(`${requestRoot()}/users/${args.id}`, args).then(resp => resp.data); // because 'axios' returns a 'data' obj
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

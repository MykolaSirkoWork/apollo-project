const {GraphQLError} = require('graphql');

const permissionErrors = {
	 UNAUTHORIZED: new GraphQLError('You are not authorized to perform this action.', {
		 extensions: {
			 code: 401,
		 }}),
   FORBIDDEN: new GraphQLError('You are not granted to perform this action.', {
	   extensions: {
		   code: 403,
	   }}),
	 INVALIDCREDS: new GraphQLError('Invalid credentials', {
		 extensions: {
			 code: 403,
		 }}),
	USEREXISTS: new GraphQLError('User already exists', {
		extensions: {
			code: 422,
		}})
}

module.exports = permissionErrors
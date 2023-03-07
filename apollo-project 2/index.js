const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config()



//Aollo Server
//typeDefs: GraphQl Type Definitions
//resolvers: How do we resolve queries/ mutations

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
	context: ({req}) => {
		const context = {
			headers: req.headers
		}
		return context
	},
	typeDefs,
	resolvers,
	cors: '*',
	origin: '*',
});


mongoose.connect(process.env.MONGODBURI, {useNewUrlParser: true})
	.then(() => {
		console.log("MongoDB connection successful");
		return server.listen(({port: 5000}))
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	})


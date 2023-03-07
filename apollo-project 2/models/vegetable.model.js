const {model, Schema } = require('mongoose');

const vegetableSchema = new Schema({
	id: String,
	name: String,
	price: Number,
});

module.exports = model('Vegetable', vegetableSchema);
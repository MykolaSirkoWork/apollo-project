const Fruit = require('../models/fruit.model');
const Vegetable = require('../models/vegetable.model');
const User = require('../models/user.model');
const {v4: uuid } = require('uuid');
const fruitService = require('../services/fruit.service');
const vegetableService = require('../services/vegetable.service');
const {userRoles,...userService} = require('../services/user.service');
const accessService = require('../services/access.service');


module.exports = {
	Query: {
		async login(_,{loginUserInput}){
			return userService.login(loginUserInput);
		},
		async fruit(
			_,
			{id},
			{headers}
		){
			await accessService.access(headers?.authorization, [userRoles.VEGETERIANMARY]);
			return fruitService.getFruit(id);
		},
		async fruits(
			_,
			__,
			{headers}
		){
			await accessService.access(headers?.authorization, []);
			return fruitService.getAllFruits();
		},

		async vegetable(
			_,
			{id},
			{headers}
		) {
			await accessService.access(headers?.authorization, [userRoles.FRUITJOHN]);
			return vegetableService.getVegetable(id);
		},
		async vegetables(
			_,
			__,
			{headers}
		){
			await accessService.access(headers?.authorization, []);
				return vegetableService.getAllVegetables();
		},
	},
	Mutation: {
		async createUser(
			_,
			{createUserInput}
		){
			console.log(createUserInput)
			return userService.createUser(createUserInput)
		},
		async createFruit(
			_,
			{createFruitInput},
			{headers}
		){
			await accessService.access(headers?.authorization, []);
			return fruitService.createFruit(createFruitInput);
		},
	
		async removeFruit(
			_,
			{id},
			{headers}
		){
			await accessService.access(headers?.authorization, [userRoles.VEGETERIANMARY]);
			return fruitService.removeFruit(id);
		},

		async updateFruit(
			_,
			{id, updateFruitInput},
			{headers}
		){
			await accessService.access(headers?.authorization, [userRoles.VEGETERIANMARY]);
			return fruitService.updateFruit(id, updateFruitInput);
		},

		async createVegetable(
			_,
			{createVegetableInput},
			{headers}
		){
			await accessService.access(headers?.authorization, []);
			return vegetableService.createVegetable(createVegetableInput);
		},

		async removeVegetable(
			_,
			{id},
			{headers}
		){
			await accessService.access(headers?.authorization, [userRoles.FRUITJOHN]);
			return vegetableService.removeVegetable(id);
		},

		async updateVegetable(
			_,
			{id, updateVegetableInput},
			{headers}
		){
			await accessService.access(headers?.authorization, [userRoles.FRUITJOHN]);
			return vegetableService.updateVegetable(id, updateVegetableInput);
		},
	}
}
const Vegetable = require("../models/vegetable.model");
const {v4: uuid} = require("uuid");

const vegetableService = {
	async createVegetable(createVegetable) {
		const vegetable = new Vegetable({
			id: uuid(),
			...createVegetable
		})
		return vegetable.save();
	},
	
	async getVegetable(id) {
		const [vegetable] = await Vegetable.find({id}).exec();
		if (!vegetable) {
			throw new Error('Vegetable not found');
		}
		return vegetable;
	},
	
	async getAllVegetables () {
		return Vegetable.find().exec();
	},
	
	async updateVegetable (id, updateVegetable) {
		const [vegetable] = await Vegetable.find({id});
		if (!vegetable) {
			throw new Error('Vegetable not found');
		}
		return Vegetable.findOneAndUpdate({id}, updateVegetable, {new: true});
	},
	
	async removeVegetable (id) {
		const vegetable = await Vegetable.find({id}).exec();
		if (!vegetable) {
			throw new Error('Vegetable not found');
		}
		await Vegetable.findOneAndRemove({id})
		return `vegetable with ${id} has been removed`;
	}

}

module.exports = vegetableService;
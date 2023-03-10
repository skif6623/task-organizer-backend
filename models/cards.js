const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require("joi");

const itemsSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
});

const cardsSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		items: {
			type: [itemsSchema],
			required: true,
		},
	},
	{versionKey: false, timestamps: true},
);

cardsSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	title: Joi.string().required(),
	items: Joi.array().required(),
});

const itemSchema = Joi.object({
	text: Joi.string().required(),
});

const updateItemsSchema = Joi.object({
	items: Joi.array().items(itemSchema).required(),
});

const schemas = {
	addSchema,
	updateItemsSchema,
};

const Card = model("card", cardsSchema);

module.exports = {
	Card,
	schemas,
};

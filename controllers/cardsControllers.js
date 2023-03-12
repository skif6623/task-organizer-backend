const {Card} = require("../models/cards");
const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
	const result = await Card.find();
	res.json(result);
};

const addCard = async (req, res) => {
	const result = await Card.create(req.body);
	res.status(201).json(result);
};

const removeById = async (req, res) => {
	const {cardId} = req.params;
	const result = await Card.findByIdAndDelete(cardId);

	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json(result);
};

const addItemById = async (req, res) => {
	const {cardId} = req.params;
	const newItem = req.body;
	const updatedCard = await Card.findOneAndUpdate({_id: cardId}, {$push: {items: newItem}}, {new: true});
	if (!updatedCard) {
		throw HttpError(404, "Not found");
	}

	res.json(updatedCard);
};

const deleteItemById = async (req, res) => {
	const {cardId, itemId} = req.params;
	const updatedCard = await Card.findOneAndUpdate({_id: cardId}, {$pull: {items: {_id: itemId}}}, {new: true});
	console.log(updatedCard);
	if (!updatedCard) {
		throw HttpError(404, "Not found");
	}

	res.json(updatedCard);
};

const updateItems = async (req, res) => {
	const {cardId} = req.params;

	const result = await Card.findByIdAndUpdate({_id: cardId}, req.body, {new: true});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

const updateManyItems = async (req, res) => {
	const {cardStartId, cardEndId} = req.params;

	const {taskStart, taskEnd} = req.body;

	const updatedTasksStart = Card.findByIdAndUpdate({_id: cardStartId}, {$set: {items: taskStart}});

	const updatedTasksEnd = Card.findByIdAndUpdate({_id: cardEndId}, {$set: {items: taskEnd}});

	const results = await Promise.all([updatedTasksStart, updatedTasksEnd]);

	if (!results.every(result => result)) {
		throw HttpError(404, "Not found");
	}

	const updatedCards = await Card.find({_id: {$in: [cardStartId, cardEndId]}});

	res.json(updatedCards);
};

module.exports = {
	getAll: ctrlWrapper(getAll),
	addCard: ctrlWrapper(addCard),
	removeById: ctrlWrapper(removeById),
	updateItems: ctrlWrapper(updateItems),
	updateManyItems: ctrlWrapper(updateManyItems),
	addItemById: ctrlWrapper(addItemById),
	deleteItemById: ctrlWrapper(deleteItemById),
};

const {Card} = require("../models/cards");
const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
	const result = await Card.find();
	res.json(result);
};

// const getById = async (req, res) => {
// 	const {cardId} = req.params;
// 	const result = await Card.findById(cardId);
// 	if (!result) {
// 		throw HttpError(404, "Not Found");
// 	}
// 	res.json(result);
// };

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

// const updateById = async (req, res) => {
// 	const {cardId} = req.params;

// 	const result = await Card.findByIdAndUpdate(cardId, req.body, {new: true});
// 	if (!result) {
// 		throw HttpError(404, "Not found");
// 	}
// 	res.json(result);
// };

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

// const updateItems = async (req, res) => {
// 	const {cardId} = req.params;

// 	const result = await Card.findByIdAndUpdate(cardId, req.body, {new: true});
// 	if (!result) {
// 		throw HttpError(404, "Not found");
// 	}
// 	res.json(result);
// };

module.exports = {
	getAll: ctrlWrapper(getAll),
	// getById: ctrlWrapper(getById),
	addCard: ctrlWrapper(addCard),
	removeById: ctrlWrapper(removeById),
	// updateById: ctrlWrapper(updateById),
	// updateFavorite: ctrlWrapper(updateItems),
	addItemById: ctrlWrapper(addItemById),
	deleteItemById: ctrlWrapper(deleteItemById),
};

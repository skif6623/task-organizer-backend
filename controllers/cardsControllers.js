const {Card} = require("../models/cards");
const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
	const result = await Card.find();
	res.json(result);
};

const getById = async (req, res) => {
	const {cardId} = req.params;
	const result = await Card.findById(cardId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const Add = async (req, res) => {
	const result = await Card.create(req.body);
	res.status(201).json(result);
};

const removeById = async (req, res) => {
	const {cardId} = req.params;
	const result = await Card.findByIdAndDelete(cardId);

	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.status(200).json({message: "card deleted"});
};

const updateById = async (req, res) => {
	const {cardId} = req.params;

	const result = await Card.findByIdAndUpdate(cardId, req.body, {new: true});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

// const updateFavorite = async (req, res) => {
// 	const {cardId} = req.params;

// 	const result = await Card.findByIdAndUpdate(cardId, req.body, {new: true});
// 	if (!result) {
// 		throw HttpError(404, "Not found");
// 	}
// 	res.json(result);
// };

module.exports = {
	getAll: ctrlWrapper(getAll),
	getById: ctrlWrapper(getById),
	Add: ctrlWrapper(Add),
	removeById: ctrlWrapper(removeById),
	updateById: ctrlWrapper(updateById),
	// updateFavorite: ctrlWrapper(updateFavorite),
};

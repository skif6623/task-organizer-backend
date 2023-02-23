const express = require("express");

const contacts = require("../../models/contacts");

const {HttpError} = require("../../helpers");

const router = express.Router();

const Joi = require("joi");

const schema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
});
// GET
router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.json(result);
	} catch (error) {
		next(error);
	}
});
// GET BY ID
router.get("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		const result = await contacts.getContactById(contactId);
		if (!result) {
			throw HttpError(404, "Not Found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});
// ADD
router.post("/", async (req, res, next) => {
	try {
		const {error} = schema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await contacts.addContact(req.body);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});
// DELETE
router.delete("/:contactId", async (req, res, next) => {
	try {
		const {contactId} = req.params;
		console.log(contactId);
		const result = await contacts.removeContact(contactId);

		console.log("result:", result);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});
// UPDATE
router.put("/:contactId", async (req, res, next) => {
	try {
		const {error} = schema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const {contactId} = req.params;

		const result = await contacts.updateContact(contactId, req.body);
		if (!result) {
			throw HttpError(404, error.message);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;

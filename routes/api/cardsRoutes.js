const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/cardsControllers");

const {schemas} = require("../../models/cards");

const {validateBody, isValidId} = require("../../middlewares");

router.get("/", ctrl.getAll);
router.post("/", validateBody(schemas.addSchema), ctrl.addCard);
router.delete("/:cardId", isValidId, ctrl.removeById);
router.post("/:cardId/items", ctrl.addItemById);
router.delete("/:cardId/items/:itemId", ctrl.deleteItemById);
router.put("/:cardId", isValidId, ctrl.updateItems);
router.put("/:cardStartId/:cardEndId", ctrl.updateManyItems);

module.exports = router;

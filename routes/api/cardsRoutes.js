const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/cardsControllers");

const {schemas} = require("../../models/cards");

const {validateBody, isValidId} = require("../../middlewares");

router.get("/", ctrl.getAll);
// router.get("/:cardId", isValidId, ctrl.getById);
router.post("/", validateBody(schemas.addSchema), ctrl.addCard);
router.delete("/:cardId", isValidId, ctrl.removeById);
router.post("/:cardId/items", ctrl.addItemById);
router.delete("/:cardId/items/:itemId", ctrl.deleteItemById);
// router.put("/:cardId", isValidId, validateBody(schemas.addSchema), ctrl.updateById);
// router.patch("/:cardId/items", isValidId, validateBody(schemas.updateItemsSchema), ctrl.updateFavorite);

module.exports = router;

const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/cardsControllers");

const {schemas} = require("../../models/cards");

const {validateBody, isValidId} = require("../../middlewares");

router.get("/", ctrl.getAll);
router.get("/:cardId", isValidId, ctrl.getById);
router.post("/", validateBody(schemas.addSchema), ctrl.Add);
router.delete("/:cardId", isValidId, ctrl.removeById);
router.put("/:cardId", isValidId, validateBody(schemas.addSchema), ctrl.updateById);
// router.patch("/:cardId", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;

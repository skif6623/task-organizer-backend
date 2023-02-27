const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contactsCtrls");

const schemas = require("../../schemas/contactsSchemas");

const {validateBody} = require("../../middlewares");

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", validateBody(schemas.addSchema), ctrl.Add);
router.delete("/:contactId", ctrl.removeById);
router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateById);

module.exports = router;

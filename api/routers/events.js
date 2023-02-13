const { Router } = require('express');

const eventsController = require('../controllers/events');
const authenticator = require('../middleware/authenticator');

const eventsRouter = Router();

eventsRouter.get("/", authenticator, eventsController.index);
eventsRouter.get("/:id", eventsController.show);
eventsRouter.get("/search/:string", eventsController.search);
eventsRouter.post("/", eventsController.create);
eventsRouter.patch("/interested/:id", eventsController.interested);
eventsRouter.patch("/not_interested/:id", eventsController.not_interested);
eventsRouter.patch("/attend/:id", eventsController.attend);
eventsRouter.patch("/not_attending/:id", eventsController.not_attending);
eventsRouter.delete("/:id", eventsController.destroy);

module.exports = eventsRouter;

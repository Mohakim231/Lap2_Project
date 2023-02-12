const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const userRouter = require('./routers/users');
const eventsRouter = require('./routers/events');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
    res.json({
        description: "It works :)"
    })
})

api.use("/users", userRouter);
api.use("/events", eventsRouter);

module.exports = api;
const Event = require("../models/events");

async function index(req, res) {
    try {
        const events = await Event.getAll();
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({"error": err.message})
    }
};

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({"error": err.message})
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const events = await Event.create(data);
        res.json(events);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const data = req.body;
        const result = await events.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.destroy();
        res.json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

module.exports = {
    index, show, create, destroy, update
}
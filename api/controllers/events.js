const Event = require("../models/events");
const Token = require('../models/token');

async function index(req, res) {
    try {
        const events = await Event.getAll();
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
};

async function show(req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
};

async function search(req, res) {
    try {
        const string = req.params.string
        console.log(string)
        const events = await Event.search(string);
        console.log(events)
        res.status(200).json(events)
    } catch (error) {
        res.status(404).json({"error": error.message})
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

async function interested (req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.interested();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function not_interested (req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.not_interested();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function attend (req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.attend();
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function not_attending (req, res) {
    try {
        const id = parseInt(req.params.id);
        const events = await Event.getOneById(id);
        const result = await events.not_attending();
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
    index, show, create, destroy, interested, not_interested, attend, not_attending, search
}
const db = require('../database/connect');

class Event {
    constructor ({ event_id, username, event_title, event_description, intrest}) {
        this.id = event_id;
        this.username = username
        this.title = event_title;
        this.description = event_description;
        this.intrest = intrest;
    }

    static async getAll() {
        const response = await db.query("SELECT event_id, event_title, username, event_description, intrest FROM events ORDER BY event_id DESC;");
        return response.rows.map(g => new Event(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM events WHERE event_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate event.")
        }
        return new Event(response.rows[0]);
    }

    static async create(data) {
        const { event_title, username, event_description } = data;
        const response = await db.query('INSERT INTO events (event_title, username, event_description) VALUES ($1, $2) RETURNING *;', [ event_title, username, event_description ]);

        return response.rows.map(w => new Event(w))
    }

    async interested() {
        const response = await db.query("UPDATE events SET intrest = $1 WHERE event_id = $2 RETURNING event_id, intrest;",
            [ this.intrest + 1, this.id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update intrest.")
        }
        return new Event(response.rows[0]);
    }

    async not_interested() {
        const response = await db.query("UPDATE events SET intrest = $1 WHERE event_id = $2 RETURNING event_id, intrest;",
            [ this.intrest - 1, this.id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update intrest.")
        }
        return new Event(response.rows[0]);
    }

    async attend() {
        const response = await db.query("UPDATE events SET attending = $1 WHERE event_id = $2 RETURNING event_id, attending;",
            [ this.attending + 1, this.id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update intrest.")
        }
        return new Event(response.rows[0]);
    }

    async not_attending() {
        const response = await db.query("UPDATE events SET attending = $1 WHERE event_id = $2 RETURNING event_id, attending;",
            [ this.attending - 1, this.id ]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update intrest.")
        }
        return new Event(response.rows[0]);
    }

    async destroy() {
        let response = await db.query('DELETE FROM events WHERE event_id = $1 RETURNING *;', [this.id]);

        return new Event(response.rows[0]);
    }
}

module.exports = Event;
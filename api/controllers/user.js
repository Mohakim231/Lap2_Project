const bcrypt = require('bcrypt');

const User = require('../models/users');

async function register (req, res) {
    
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        const result = await User.create({...data,password: hashedPassword})
        res.status(201).send(result);
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }

};

async function login (req, res) {
    
    try {
       const data = req.body;
       const user = await User.getOneByUsername(data.username);
       const authenticated = await bcryptcompare(data.password, user.password);
       if(!authenticated){
        throw new Error("Incorrect credentials");
       } else {
        res.status(200).json({ "authenticated": true });
       }
         
    } catch (error) {
        res.status(403).json({"error": error.message})
    }
};

module.exports = {
    register, login
}
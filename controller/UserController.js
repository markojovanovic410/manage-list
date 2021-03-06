const UserModel = require("../model/UserModel");

const UserController = class UserController {
    getAllUser = async function (req, res) {
        try {
            let data = await (new UserModel).getAllUser();
            if (data.success) {
                return res.status(200).json(data);
            }
            res.send(data);
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

    createUser = async function (req, res) {
        try {
            let data = await (new UserModel).createUser(req.body);
            if (data.success) {
                return res.status(200).json(data);
            }
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json(error.message);
        }

    }

    getUserById = async function (req, res) {
        let data = await (new UserModel).findById(req.params.id);
        if (data.success) {
            return res.status(200).send(data);
        }
        res.status(201).send(data);
    }

    updateUser = async function (req, res) {
        try {
            let data = await (new UserModel).updateUser(req);
            if (data.success) {
                return res.status(200).json(data);
            }
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

    deleteOne = async function (req, res) {
        let id = req.params.id;
        try {
            let data = await (new UserModel).deleteUser(id);
            if (data.success) {
                return res.status(200).json(data);
            }
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }

    login = async function (req, res) {
        try {
            let data = await (new UserModel).login(req.body);
            if (data.success) {
                return res.status(200).json(data);
            }
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

module.exports = UserController;
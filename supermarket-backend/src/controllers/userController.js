const UserModel = require('../models/userModel')
const jwtService = require('jsonwebtoken')

module.exports = {
    login: async (req, res) => {
        try {
            const result = await UserModel.findOne({ login: req.body.login, password: req.body.password })
            if (result) {
                const secret = "ffhbwgifiwvgiwrowfblgwngwNGBWJFWFMFNwj2jhbfwg~WGWWWW5GE494HEG1G4WG4WG4WGWG"
                const tokenResult = await jwtService.sign(req.body, secret)
                res.status(200).json({ message: "Usuário logado", token: tokenResult })

            } else {
                res.status(403).json({ message: `Credenciais inválidas` })
            }
        }
        catch (err) {
            res.status(403).send({ message: err.message })
        }
    },
    getUsers: (req, res) => {
        UserModel.find({}).select(["-__v]", "-_id"]).then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({ message: "Não foi possivel recuperar os usuários" })
        })

    },
    deleteUserById: async (req, res) => {

        try {
            await UserModel.deleteOne({ cpf: req.params.id })
            res.status(200).send({message: "Usuário removido com sucesso!" })
        }
        catch (err) {
            res.status(500).json({ message: "Não foi possível remover o usuário" })
        }
    },
    getUser: async (req, res) => {
        try {
            await UserModel.findById({mat: req.body.mat })
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({ message: "Não foi possível recuperar o usuário no momento" })
        }
    },
    updateUser: async (req, res) => {
        //Atualiza os dados de um usuário específico
        try {
            await UserModel.updateOne({ mat: req.body.mat }, req.body)
            res.status(200).send({ message: "usuário atualizado com sucesso!" })
        }
        catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" })
        }
    },
    //Criar um User
    createUser: async (req, res) => {
        try {

            const findResult = await UserModel.find({ login: req.body.login, email: req.body.email, password: req.body.password })
            if (findResult.length) {
                /**
                * Mesma lógica do caso anterior só que aqui nós temos uma response que deu errado
                */
                res.status(500).json({ message: `Usuário já existe` })
            } else {
                const createResult = await UserModel.create(req.body)
                res.status(201).json({ message: `0 usuário ${createResult.email} foi criado com sucesso!` })
            }
        }
        catch (err) {
            res.status(403).send({ message: 'Não foi possivel criar o usuário' })
        }
    }
}

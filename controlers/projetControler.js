var { status } = require('../utils/status');
const db = require('../models/index');
const pagination = require('../utils/pagination');
const { Op } = require('sequelize');

const getProjets = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = pagination(page, size);
        const rows = await db.projet.findAll(
            {
                // where: {},
                limit,
                offset,
                // include:[]
            }
        );
        return res.status(status.succes).send(rows);
    } catch (error) {
        console.log(`Error projet create ${error}`);
    }
}

const getProjet = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await db.projet.findOne({ id });
        if (!rows) {
            res.status(status.notfound).send('Not found projet with this id');
        }
        return res.status(status.succes).send(rows);
    } catch (error) {
        console.log(`Error projet create ${error}`);
    }
}

const createProjet = async (req, res) => {
    try {
        const { libelle, description } = req.body;
        if (!(libelle && description)) {
            res.status(status.bad).send("All input is required");
        }
        var values = {
            libelle,
            description,
            dateCreation: new Date(),
            dataFin: null
        }
        const rows = await db.projet.create(values);
        res.status(status.created).send(rows);
    } catch (error) {

    }

}

const updateProjet = async (req, res) => {
}

const deleteProjet = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await db.projet.destroy({ id });
        if (!rows) {
            res.status(status.notfound).send('Not found projet with this id');
        }
        return res.status(status.succes).send(`${rows} is deleted successfully`);
    } catch (error) {
        console.log(`Error projet create ${error}`);
    }
}

module.exports = {
    getProjets,
    getProjet,
    createProjet,
    updateProjet,
    deleteProjet
}


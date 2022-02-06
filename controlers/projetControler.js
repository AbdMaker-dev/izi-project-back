var { status } = require('../utils/status');
const db = require('../models/index');
const { pagination } = require('../utils/pagination');
const { Op } = require('sequelize');
const { jwtdecode } = require('../utils/jwtData');

const getProjets = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { id } = jwtdecode(token.split(' ')[1]);
        const { page, size } = req.query;
        const { limit, offset } = pagination(page, size);
        const rows = await db.projet.findAll(
            {
                where: { idUser: id },
                limit,
                offset,
                include: [
                    {
                        as: 'user',
                        model: db.user
                    },
                    {
                        as: 'taches',
                        model: db.tache,
                        include: [
                            {
                                as: 'projet_etat',
                                model: db.etatTache
                            },
                            {
                                as: 'tache_user',
                                model: db.user
                            }
                        ]
                    },
                    {
                        as: 'membres',
                        model: db.membre,
                        include: [
                            {
                                as: 'membre',
                                model: db.user
                            }
                        ]
                    }
                ]
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
        const rows = await db.projet.findOne({
            where: { id },
            include: [
                {
                    as: 'user',
                    model: db.user
                },
                {
                    as: 'taches',
                    model: db.tache,
                    include: [
                        {
                            as: 'projet_etat',
                            model: db.etatTache
                        },
                        {
                            as: 'tache_user',
                            model: db.user
                        }
                    ]
                },
                {
                    as: 'membres',
                    model: db.membre,
                    include: [
                        {
                            as: 'membre',
                            model: db.user
                        }
                    ]
                }
            ]
        });
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
        const token = req.headers.authorization;
        const { id } = jwtdecode(token.split(' ')[1]);
        const { libelle, description } = req.body;
        if (!(libelle && description)) {
            res.status(status.bad).send("All input is required");
        }
        var values = {
            libelle,
            description,
            dateCreation: new Date(),
            dataFin: null,
            idUser: id
        }
        const rows = await db.projet.create(values);
        res.status(status.created).send(rows);
    } catch (error) {

    }

}

const addMembreProjet = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { id } = jwtdecode(token.split(' ')[1]);
        const { emailMembre, idProjet } = req.body;
        if (!(emailMembre && idProjet)) {
            res.status(status.bad).send('All input is required');
        }
        const userMembre = await db.user.findOne({ where: { email: emailMembre } });
        if (!(userMembre)) {
            res.status(status.bad).send('This email is not exixts');
        }
        var values = {
            etat: true,
            idUser: userMembre.id,
            idPojet: idProjet
        };
        const membre = await db.membre.findOne({ where: { idUser: values.idUser, idPojet: values.idPojet } });
        if (membre != null) {
            res.status(status.conflict).send('This membre is Already exists');
        } else {
            const rows = await db.membre.create(values);
            res.status(status.created).send(rows);
        }
    } catch (error) {
        console.log(error);
    }
}

const addTacheProjet = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { id } = jwtdecode(token.split(' ')[1]);
        const { libelle, description, idProjet, idMembre } = req.body;
        if (!(libelle && idProjet && idMembre)) {
            res.status(status.bad).send('All input is required');
        }
        const userMembre = await db.membre.findOne({ where: { idUser: idMembre, idPojet: idProjet } });
        if (userMembre === null) {
            res.status(status.bad).send('This membre not exixts');
        }
        const etat = await db.etatTache.findOne({ where: { libelle: 'Assigner' } });
        var values = {
            libelle,
            description,
            dateCreation: new Date(),
            dataFin: null,
            idProjet,
            idEtatTache: etat.id,
            idMembre: idMembre
        };
        const rows = await db.tache.create(values);
        res.status(status.created).send(rows);
    } catch (error) {
        console.log(error);
    }
}

const updateProjet = async (req, res) => {
}

const deleteProjet = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await db.projet.destroy({ where: { id } });
        if (!rows) {
            res.status(status.notfound).send('Not found projet with this id');
        }
        return res.status(status.succes).send(`${rows} is deleted successfully`);
    } catch (error) {
        console.log(`Error projet create ${error}`);
    }
}

const getSharedProjets = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const { id } = jwtdecode(token.split(' ')[1]);
        const { page, size } = req.query;
        const { limit, offset } = pagination(page, size);
        const rows = await db.projet.findAll(
            {
                where: {
                    '$membres.membre.id$': id
                },
                limit,
                offset,
                include: [
                    {
                        as: 'user',
                        model: db.user
                    },
                    {
                        as: 'taches',
                        model: db.tache,
                        duplicating: false,
                        include: [
                            {
                                as: 'projet_etat',
                                model: db.etatTache
                            },
                            {
                                as: 'tache_user',
                                model: db.user
                            }
                        ]
                    },
                    {
                        as: 'membres',
                        model: db.membre,
                        required: false,
                        duplicating: false,
                        include: [
                            {
                                as: 'membre',
                                model: db.user
                            }
                        ]
                    }
                ]
            }
        );
        return res.status(status.succes).send(rows);
    } catch (error) {
        console.log(`Error projet create ${error}`);
    }
}

module.exports = {
    getProjets,
    getProjet,
    createProjet,
    updateProjet,
    deleteProjet,
    addMembreProjet,
    addTacheProjet,
    getSharedProjets
}
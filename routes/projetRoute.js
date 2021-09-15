const express = require('express');
const { getProjets, getProjet, createProjet, updateProjet, deleteProjet } = require('../controlers/projetControler');
const verifyToken = require('../middleware/auth');

const projetRouter = express.Router();

projetRouter.get('/projets', verifyToken, getProjets);
projetRouter.get('/projets/:id', verifyToken, getProjet);
projetRouter.post('/projets', verifyToken, createProjet);
projetRouter.patch('/projets/:id', verifyToken, updateProjet);
projetRouter.delete('/projets/:id', verifyToken, deleteProjet);

module.exports = projetRouter;
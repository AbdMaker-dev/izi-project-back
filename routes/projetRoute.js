const express = require('express');
const { getProjets, getProjet, createProjet, updateProjet, deleteProjet, addMembreProjet, addTacheProjet, getSharedProjets } = require('../controlers/projetControler');
const verifyToken = require('../middleware/auth');

const projetRouter = express.Router();

projetRouter.get('/projets', verifyToken, getProjets);
projetRouter.get('/sharedprojets', verifyToken, getSharedProjets);
projetRouter.get('/projets/:id', verifyToken, getProjet);
projetRouter.post('/projets', verifyToken, createProjet);
projetRouter.patch('/projets/:id', verifyToken, updateProjet);
projetRouter.delete('/projets/:id', verifyToken, deleteProjet);
projetRouter.post('/projets/membre', verifyToken, addMembreProjet);
projetRouter.post('/projets/tache', verifyToken, addTacheProjet);


module.exports = projetRouter;
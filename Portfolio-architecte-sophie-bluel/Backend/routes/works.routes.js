const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const checkWork = require('../middlewares/checkWork');
const workCtrl = require('../controllers/works.controller');

router.post('/', auth, multer, checkWork, workCtrl.create);
router.get('/', workCtrl.findAll);
router.delete('/:id', auth, workCtrl.delete);

module.exports = router;

//Définit 3 endpoints pour les projets :

//GET /api/works — liste tous les projets (public)
//POST /api/works — crée un projet (auth + upload image + validation)
//DELETE /api/works/:id — supprime un projet (auth requise)
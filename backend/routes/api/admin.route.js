const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin.controller');
const isSuperAdmin = require('../../middlewares/isSuperAdmin');
const isAdminAuthenticated = require('../../middlewares/isAdminAuthenticated');

router.post('/login', adminController.login);
router.post('/logout', isAdminAuthenticated, adminController.logout);
router.get('/dashboard', isAdminAuthenticated, adminController.getDashboard);
router.get('/users', isSuperAdmin, isAdminAuthenticated, adminController.listUsers);
router.post('/users/promote/:userId', isSuperAdmin, isAdminAuthenticated, adminController.promoteToAdmin);
router.delete('/:adminId', isSuperAdmin, isAdminAuthenticated, adminController.deleteAdmin);

module.exports = router;
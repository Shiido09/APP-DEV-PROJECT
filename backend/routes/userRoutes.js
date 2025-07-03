const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changePassword,
    deleteUser,
    getAllUsers,
    getUserById
} = require('../controllers/userController');
const {
    authenticateUser,
    authorizeAdmin,
    authorizeOwnerOrAdmin
} = require('../middleware/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes - User authentication required
router.get('/profile', authenticateUser, getUserProfile);
router.put('/profile', authenticateUser, updateUserProfile);
router.put('/change-password', authenticateUser, changePassword);

// Protected routes - Owner or Admin can access
router.put('/:id', authenticateUser, authorizeOwnerOrAdmin, updateUserProfile);
router.delete('/:id', authenticateUser, authorizeOwnerOrAdmin, deleteUser);

// Admin only routes
router.get('/', authenticateUser, authorizeAdmin, getAllUsers);
router.get('/:id', authenticateUser, authorizeAdmin, getUserById);

module.exports = router;

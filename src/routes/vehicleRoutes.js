const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/', authenticateToken, vehicleController.listVehicles);
router.post('/', authenticateToken, vehicleController.createVehicle);
router.put('/:id', authenticateToken, vehicleController.updateVehicle);
router.patch('/:id/archive', authenticateToken, vehicleController.archiveVehicle);
router.patch('/:id/unarchive', authenticateToken, vehicleController.unarchiveVehicle);
router.delete('/:id', authenticateToken, vehicleController.deleteVehicle);
router.get('/stats', authenticateToken, vehicleController.getStats);

module.exports = router;

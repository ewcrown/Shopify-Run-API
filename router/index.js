import express from 'express';
import controller from '../controller/index.js';
const router = express.Router();

router.get('/get/themes', async (req, res) => {
  await controller.get_themes(req, res);
});

export default router;
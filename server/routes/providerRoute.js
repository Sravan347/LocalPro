const express = require("express");

const { createService, updateService, deleteService, getProviderServices, getProviderBookings } = require("../controllers/providerController");
const upload = require("../utils/multer");
const { providerOnly, protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/services", protect, providerOnly, upload.single("photo"), createService);
router.get("/services", protect, providerOnly, getProviderServices);
router.put("/services/:id", protect, providerOnly, upload.single("photo"), updateService);
router.delete("/services/:id", protect, providerOnly, deleteService);

router.get("/bookings", protect, providerOnly, getProviderBookings);

module.exports = router;

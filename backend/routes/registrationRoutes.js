const exp = require("express");
const { registerForEvent, getMyRegistrations, getEventParticipants ,unregisterFromEvent} = require("../controllers/registrationController");
const authorize = require("../middlewares/roleMiddleware");
const { protect } = require("../middlewares/authMiddleware");

const router = exp.Router();

router.post("/register/:eventId", protect, authorize("student"), registerForEvent);
router.get("/my", protect, authorize("student"), getMyRegistrations);
router.get("/event/:eventId", protect, authorize("organizer","admin"), getEventParticipants);
router.delete("/event/:eventId", protect, authorize("student"), unregisterFromEvent);

module.exports = router;
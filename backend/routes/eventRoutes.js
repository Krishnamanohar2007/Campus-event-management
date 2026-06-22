const exp = require("express");
const { createEvent ,getEvents,getEventById,updateEvent,deleteEvent} = require("../controllers/eventController");
const authorize = require("../middlewares/roleMiddleware");
const { protect } = require("../middlewares/authMiddleware");

const router = exp.Router();

router.post("/", protect,authorize("organizer","admin"),createEvent);
router.get("/", getEvents);
router.get("/:id",getEventById);
router.put("/:id", protect,authorize("organizer","admin"),updateEvent);
router.delete("/:id", protect,authorize("organizer","admin"),deleteEvent);
module.exports = router;
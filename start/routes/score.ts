import ScoreController from "../../app/controller/ScoreController.js";
import router from "@adonisjs/core/services/router";


const score = new ScoreController();

router.post('/score', score.createScore)
router.get('/score', score.readScore)
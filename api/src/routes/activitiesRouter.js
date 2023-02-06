const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {creaActivityTuristic, getActivities} = require("../controllers/activitysControllers");

const activitiesRouter = Router();

// - [ ] __POST /activities__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//   - Crea una actividad turística en la base de datos, relacionada con los países correspondientes

activitiesRouter.post("/", async (req,res)=>{
    const {activity, countries} = req.body;
    console.log('body',activity, countries);
    try {
        const newActivity = await creaActivityTuristic(activity,countries);
        res.status(200).json(newActivity);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
});

activitiesRouter.get("/", async (req,res)=>{
    try {
        let activities = await getActivities();
        res.status(200).json(activities);
    } catch (error) {
        res.status(400).json({error:error.message});
    };
});

module.exports = activitiesRouter;

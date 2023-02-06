const {Activities,Countries}=require("../db");
const {Op}=require("sequelize");

const creaActivityTuristic = async(activity, countries) => {
    const newActivity = await Activities.create(activity);
    console.log('newActivity',newActivity);
    await newActivity.addCountries(countries);
    return newActivity;
};

const getActivities = async () =>{
    const activities = await Activities.findAll(
        {
            include:{
                model:Countries,
                attributes:["name","continent"],
                through:{
                    attributes:[],
                }
            }
        }
    );
    return activities;
}

module.exports={creaActivityTuristic, getActivities}
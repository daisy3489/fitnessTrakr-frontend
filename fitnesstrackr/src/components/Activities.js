import { getActivities } from "../api";
import { useEffect } from "react";
import ActivitiesForm from "./ActivitiesForm";

const Activities = ({activities, setActivities, token})=>{

    const handleActivities = async () =>{

        const allActivities = await getActivities()
        // console.log()
        setActivities(allActivities);
        return allActivities
        
    } 

 

     useEffect(() => {
        handleActivities()
        }, []);

      


// console.log(activities)
       
    return <>
    <h2>This are the activities</h2>

    { token &&<ActivitiesForm setActivities = {setActivities}   activities ={activities} token = {token} />}
      
      
    {activities.map(activity=>{
        return(
         <div key={activity.id}  className= "activities" > 
        <p className="activityp">Name: {activity.name}</p>
        <p className="activityp">description: {activity.description}</p>   
        </div>
        )
    } )}
    </>

}

export default Activities;
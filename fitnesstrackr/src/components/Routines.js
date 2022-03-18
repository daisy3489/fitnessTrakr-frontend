import {useEffect} from 'react';
import { getRoutines } from "../api";
//import AddActivityToRoutineForm from './AddActivityToRoutineForm';


const Routines = ({routines, setRoutines, activities, setActivities, token, username}) => {


    const handleRoutines = async () => {
    const newRoutines = await getRoutines()
    setRoutines(newRoutines)
    return newRoutines
    }

  useEffect(() => {
      handleRoutines()
  })

  console.log(routines)
  console.log(username)

  
//   const token = ""
  return <>
    <div className="all-routines-container">
      {routines.map(routine => 
        <div className="all-routines-container" key={routine.id}>
          <div className="single-routine">
            <div className="header-info">
               <h2> Routine: {routine.name} </h2> 
            </div>
            <p className="creator">Creator: {routine.creatorName} </p> 
            <p className="goal">Goal: {routine.goal} </p> 
           
            {routine.activities.map(activitie=>{
              return(
                <div key = {activitie.routineActivityId} className ="R_activities" >
                  <h4> ACTIVITIES FOR THIS ROUTINE </h4> 
                <p>  Name: {activitie.name} </p>
                <p>  Descriotion: {activitie.description} </p>
                <p>  Duration: {activitie.duration} </p> 
                </div>
              ) 
            })}

          </div>
          
        </div>
        )}
    </div>
  
</>

   
}



export default Routines;

// 
// { routines.map(routine =>{
//     return(<h3> Name: {routine.name}</h3>  )
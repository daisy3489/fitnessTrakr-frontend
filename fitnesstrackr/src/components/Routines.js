import {useEffect, useState} from 'react';
import { getRoutines } from "../api";
import AddActivityToRoutineForm from './AddActivityToRoutineForm';


const Routines = ({routines, setRoutines, activities, setActivities, token, username}) => {


    const handleRoutines = async () => {
    const newRoutines = await getRoutines()
    setRoutines(newRoutines)
    return newRoutines
    }

  useEffect(() => {
      handleRoutines()
  }, [])

  console.log(routines)
  console.log(username)

  
//   const token = ""
  return <>
  <h2>This are the routines</h2>
  
  
    <div>
  {routines.map(routine =>{ 
      if(routine.isPublic === true){
      return(
          
        <div key={ routine.id} className = "Routines" >
        <h2> Name: {routine.name} </h2> 
        <p>Goal: {routine.goal} </p> 
        <p>Creator Name: {routine.creatorName} </p> 
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
      )
      }
  })}
  {/* {   < AddActivityToRoutineForm/>} */}
 </div>  

</>

   
}



export default Routines;

// 
// { routines.map(routine =>{
//     return(<h3> Name: {routine.name}</h3>  )
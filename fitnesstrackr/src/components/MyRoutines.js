
import { getRoutines, deleteRoutine } from "../api";
import { useEffect} from "react";
import RoutinesForm from "./RoutinesForm";
import AddActivityToRoutineForm from "./AddActivityToRoutineForm";
//import id from "faker/lib/locales/id_ID";

const MyRoutines = ({ token, setRoutines, routines, username, activities, setActivities}) => {
    
    const blankRoutine = {
        name: "",
        goal: "",
        isPublic: false,
    };

    const user = username.username

    const handleRoutines = async () => {
        try{
        const newRoutines = await getRoutines()
        setRoutines(newRoutines)
        return newRoutines
        }catch (error) {
            console.error(error);
         }
    }
    
    useEffect(() => {
        handleRoutines()
    }, []);

 
    const handleDelete = async (id) => {
     try{  
     await deleteRoutine(token, id)
     const newRoutines = routines.filter((element) => {
        return element.id !== routines.id;
      });
      setRoutines(newRoutines);
    }catch (error) {
        console.error(error);
      }
  }
  
      

    
    return (
        <>
            <h2>Add Routine</h2>
            <RoutinesForm  routines={routines}setRoutines= {setRoutines} token = {token} />
            <h2>Current created routines</h2>
            <div>
            {routines.map(routine =>{
                if(routine.creatorName == user){
               return(
          
                <div key={ routine.id} className = "Routines" >
                <h2> Name: {routine.name} </h2> 
                <p>Goal: {routine.goal} </p> 
                <p>Creator Name: {routine.creatorName} </p> 
                <div>
                       { <AddActivityToRoutineForm 
                        token = {token} routineId = {routine.id} setRoutines ={setRoutines} />} 
                    </div>    
                <button  onClick={() => handleDelete(routine.id)}>Delete Routine</button>
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
         </div>  
                    
                    

            
        
            
        </>
    );
};

export default MyRoutines;




 
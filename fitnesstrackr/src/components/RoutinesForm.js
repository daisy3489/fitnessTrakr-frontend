import  { useState } from 'react';
import { addRoutine } from '../api';


const  RoutinesForm = ({ routines, setRoutines, token}) => {

const [newRoutine, setNewRoutine] = useState({})
	
  const handleSubmit = async (event) =>{
    const blankRoutine = { name: "", goal: "" }
    event.preventDefault();
    console.log(token)

    try{
        const newRoutineResponse = await addRoutine(token, newRoutine)
        console.log(newRoutineResponse)
      
        setRoutines([...routines, newRoutineResponse]);
        setNewRoutine(blankRoutine);

    }  catch (error) {
    console.error(error);
   }
   }

  //  console.log(token)



	return <>
      
     <form className='addRoutine' onSubmit={handleSubmit} >
		<input value={newRoutine.name|| ''} placeholder='Name' onChange={(event) => {setNewRoutine({...newRoutine, name: event.target.value})}} />
		<input value={newRoutine.goal|| ''} placeholder='Goal' onChange={(event) => {setNewRoutine({...newRoutine, goal: event.target.value})}} />
		<input value={newRoutine.isPublic|| ''} placeholder='isPublic true or false' onChange={(event) => {setNewRoutine({...newRoutine, isPublic: event.target.value})}} />
		<button>Submit</button>
	  </form> 
    
    </>
 
}

export default RoutinesForm;




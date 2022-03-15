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
      <div className="addRoutine">
        <form className='addRoutine' onSubmit={handleSubmit} >
          <div className="form-inner">
            <h2>Create new Routine</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" type="text" autoComplete="off" value={newRoutine.name|| ''}  onChange={(event) => {setNewRoutine({...newRoutine, name: event.target.value})}} />
            </div>
            <div className="form-group">
              <label htmlFor="goal">Goal</label>
              <input name="goal" id="goal" type="text" autoComplete="off" value={newRoutine.goal|| ''}  onChange={(event) => {setNewRoutine({...newRoutine, goal: event.target.value})}} />
            </div>
            <div className="form-group">
              <label htmlFor="isPublic">Is Public?</label>
              <input name="isPublic" id="isPublic"  value={newRoutine.isPublic|| ''} placeholder='isPublic true or false' onChange={(event) => {setNewRoutine({...newRoutine, isPublic: event.target.value})}} />
            </div>
          </div>
          <button>Submit</button>
        </form> 
      </div>



      
     
    
    </>
 
}

export default RoutinesForm;




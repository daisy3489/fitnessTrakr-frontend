import  { useState } from 'react';
import { addActivity } from "../api";


const  ActivitiesForm = ({activities, token, setActivities}) => {

const [newActivities, setNewActivities] = useState({});
const blankActivity = { name: "", description: "" }



const handleSubmit = async (event) =>{

    try { 
      event.preventDefault()
      

        const newActivityResponse = await addActivity(token, newActivities)
        console.log("this is the response", newActivityResponse)
        // setActivities([...activities, newActivityResponse]);
        setNewActivities(blankActivity);
        
      } catch (error) {
        console.error(error);
      }

  }



	return <>
    
     <form className='addActivities' onSubmit={handleSubmit} >

      <div className='form-inner'> 
        <h2>Create new Activity</h2>
        <div className="form-group">
          <label htmlFor="activityName">Activity Name: </label>
          <input value={newActivities.name|| ''} placeholder='Name' onChange={(event) => {setNewActivities({...newActivities, name: event.target.value})}} />
        </div>
        <div className="form-group">
          <label htmlFor="activityDescription">Activity Description: </label>
          <input value={newActivities.description|| ''} placeholder='Description' onChange={(event) => {setNewActivities({...newActivities, description: event.target.value})}} />
        </div>
      </div>

      <button>Submit</button>
      
	  </form> 
    
    </>
 
}

export default ActivitiesForm;
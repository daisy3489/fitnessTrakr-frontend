import { useState, useEffect } from "react";
import { addActivityToRoutine } from "../api"
import { getRoutines } from "../api";
import { getActivities } from "../api";

const AddActivityToRoutineForm = ({ token,routineId, setRoutines }) => {
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [allActivities, setAllActivities] = useState([])

  const handleRoutines = async () => {
    const newRoutines = await getRoutines()
    setRoutines(newRoutines)
    return newRoutines
    }

    const handleActivities = async () =>{

      const newAllActivities = await getActivities()
      // console.log()
      setAllActivities(newAllActivities);
      return allActivities  
  } 

  // console.log(allActivities)

  useEffect(() => {
    handleActivities()
    });


    // console.log(allActivities)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addActivityToRoutine( routineId,
        activityId ,
        count ,
        duration,
        token
      );
      await handleRoutines();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(activityId)
  console.log(count)
  console.log(duration)
  console.log(token)

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Add Activity to Routine</h2>
        <div className="form-group">
          <label htmlFor="activityOptions">Options</label>
          <select id="activityOptions" name="activityOptions" value={activityId} onChange={(event) => {setActivityId(event.target.value);}}>
            {allActivities.map((activity) => {
              return (
                <option value={activity.id} key={activity.id}>
                  {activity.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="activityCount">Count</label>
          <input id="activityCount" value={count} placeholder='Count' onChange={(event) => setCount(event.target.value)} type="number"/>
        </div>
        <div className="form-group">
          <label htmlFor="activityDuration">Duration</label>
          <input name="activityDuration" id="activityDuration" value={duration} placeholder='Duration' onChange={(event) => setDuration(event.target.value)} type="number" />
        </div>
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddActivityToRoutineForm;
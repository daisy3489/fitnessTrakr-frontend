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
    }, []);


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
      <h2>Add an activity to this routine</h2>
      <label>Activity</label>
      <select
        value={activityId}
        onChange={(event) => {
          setActivityId(event.target.value);
        }}
      >
        {allActivities.map((activity) => {
          return (
            <option value={activity.id} key={activity.id}>
              {activity.name}
            </option>
          );
        })}
      </select>
      <label>Count</label>
      <input
        value={count}placeholder='Count' onChange={(event) => setCount(event.target.value)}
        type="number"
      />
      <label>Duration</label>
      <input
        value={duration} placeholder='Duration' onChange={(event) => setDuration(event.target.value)}
        type="number"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddActivityToRoutineForm;
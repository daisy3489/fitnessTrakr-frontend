import axios from 'axios'


const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";



export const getRoutines = async(token)=>{

    const response = await fetch (`${BASE_URL}/routines`,{
      headers: {
        method: 'GET',
        'Content-Type': 'application/json',
        
      }
    })
    const data = await response.json();
   
    return(data)
    // else {
    // const response = await fetch (`${BASE_URL}/posts`)
    // const result = await response.json();
    // const {data:{posts}} = result
    // return(posts)
  
    // }
   
}




export const getActivities = async()=>{

    const response = await fetch (`${BASE_URL}/activities`,{
      headers: {
        method: 'GET',
        'Content-Type': 'application/json',
        
      }
    })
    const result = await response.json();
   const data  = await result
    return(data)
   
    
   
}




export const addActivity = async (token, activityObj) => {
  try {
     await axios.post(`${BASE_URL}/activities`, activityObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch ({ response }) {
    if (response) {
      throw response.data
    }
  }
}

export const addRoutine = async (token, routineObj) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/routines`, routineObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch ({ response }) {
    console.error(response.data)
    throw response.data
  }
}





export const addActivityToRoutine = async (token,routineId,
  { activityId , count, duration }
) => {
  try {
    await axios.post(
      `${BASE_URL}/routines/${routineId}/activities`,
      { activityId, count, duration },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch ({ response }) {
    console.error(response.data)
    throw response.data
  }
}


export const deleteRoutine = async (token, id) => {
  try {
    await axios.delete(`${BASE_URL}/routines/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
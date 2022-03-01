import {useEffect, useState} from 'react';
import { getRoutines } from "../api";

const Routines = ({routines, setRoutines}) => {
    const handleRoutines = async () => {
        const newRoutines = await getRoutines();
        setRoutines(newRoutines);

    }

  useEffect(() => {
      handleRoutines()
  }, [])


    return {

    }
}

export default Routines;


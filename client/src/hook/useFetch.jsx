import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { url } from "../utils/features";
import { AuthContext } from "../context/AuthContext";

export const useFetchAll = (path) => {
    const [task, setTask] = useState([]);
    const [loading,setLoading] = useState(true)
    const [refetchload,setRefetchload] = useState(false)
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${url}/task?token=${token}`);
        setTask(res.data)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetchTask()
  }, [path]);

   const reFetch = async () =>{
    setRefetchload(true)
    try {
      const res = await axios.get(`${url}/task?token=${token}`);
      setTask(res.data)
    } catch (error) {
      console.log(error);
    } finally{
      setRefetchload(false)
    }
  }
  return {task,loading,reFetch,refetchload}
};
 

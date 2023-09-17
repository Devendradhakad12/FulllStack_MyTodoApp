import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { url } from "../utils/features";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export const useFetchAll = (path) => {

  const { token } = useContext(AuthContext);
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetchload, setRefetchload] = useState(false);
  const [error, setError] = useState(false);

const [taskCompletion,setTaskcompletion] = useState(0)
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/task?token=${token}`);
        let checkTask = res.data?.filter((a) => {
          return a.checked === true;
        });
        let taskComplete = Math.floor((checkTask?.length / res.data?.length) * 100)
        if(taskComplete.toString() !== 'NaN')  setTaskcompletion(taskComplete); else setTaskcompletion(0);
        setTask(res.data?.reverse());
      } catch (error) {
        toast.error(
          error?.response?.data?.message
            ? error.response.data.message 
            : error.message
        );
        setError(
          error?.response?.data?.message
            ? error.response.data.message
            : error.message
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  if(token)  fetchTask();
  if(!token) setLoading(false)
  }, [path]);
 
  const reFetch = async () => {
    setRefetchload(true);
    try {
      const res = await axios.get(`${url}/task?token=${token}`);
      let checkTask = res.data?.filter((a) => {
        return a.checked === true;
      });
      let taskComplete = Math.floor((checkTask?.length / res.data?.length) * 100)
    if(taskComplete.toString() !== 'NaN')  setTaskcompletion(taskComplete); else setTaskcompletion(0);
      setTask(res.data?.reverse());
    }  catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
      setError(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
      console.log(error);
    } finally {
      setRefetchload(false); 
    }
  };



  return { task, loading,error, reFetch, refetchload ,taskCompletion};
};

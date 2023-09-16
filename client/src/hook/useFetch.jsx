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

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/task?token=${token}`);
        setTask(res.data);
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
  }, [path]);

  const reFetch = async () => {
    setRefetchload(true);
    try {
      const res = await axios.get(`${url}/task?token=${token}`);
      setTask(res.data);
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
  return { task, loading,error, reFetch, refetchload };
};

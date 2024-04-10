// useAxios.js
import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async ({ method, url, data = {}, config = {} }: { method: string, url: string, data: any, config: any }) => {
    setLoading(true);
    try {
      const result = await axios({ method, url, data, ...config });
      setResponse(result.data);
    } catch (err:any) {
      setError(err.message || 'Unexpected Error!');
    } finally {
      setLoading(false);
    }
  };

  // Simplified method-specific functions that use fetchData
  const get = (url:string, config = {}) => fetchData({ method: 'get', url, config });
  const post = (url:string, data, config = {}) => fetchData({ method: 'post', url, data, config });
  const put = (url:string, data, config = {}) => fetchData({ method: 'put', url, data, config });
  const patch = (url:string, data, config = {}) => fetchData({ method: 'patch', url, data, config });
  const del = (url:string, config = {}) => fetchData({ method: 'delete', url, config });

  return { get, post, put, patch, del, response, error, loading };
};

export default useAxios;

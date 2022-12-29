import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          setLoading(false);
          setIsError(true);
        }
      })
      .then((info) => {
        setLoading(false);
        setData(info);
      })
      .catch(() => {
        setLoading(false);
        setIsError(true);
      });
  }, [url]);

  return { loading, isError, data };
};

export default useFetch;

import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner/";

const withFetch = ({url, mapDataToProps, errorMsg}) => Component => {
  return (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div>{errorMsg}</div>;
    return <Component {...props} {...mapDataToProps(data)} />;
  };
};

export default withFetch;
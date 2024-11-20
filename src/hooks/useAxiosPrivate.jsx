import axios from "axios";

const useAxiosPrivate = () => {

    const instance = axios.create({
        baseURL: `http://localhost:5000`,
    });

    return (instance);
};

export default useAxiosPrivate;
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useJobs = () => {

    // const axiosPublic = useAxiosPublic();
    const axiosPrivate = useAxiosPrivate();

    const { data: jobs = [], } = useQuery({
        queryKey: [`jobs`], queryFn: async () => {
            const jobsRes = await axiosPrivate.get(`/v1/jobs`);
            // console.log(jobsRes.data);

            return (jobsRes.data);
        },
    });

    return { jobs };
};

export default useJobs;
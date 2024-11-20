import { Link } from "react-router-dom";
import useJobs from "../../hooks/useJobs";

const Jobs = () => {

    const { jobs } = useJobs();
    console.log(jobs);

    return (
        <div>
            Jobs
            <div className="card  flex flex-row justify-center">
                <Link to={`/jobs`} className="btn m-5 bg-primary-content shadow-2xl">All Items</Link>
                <Link to={`/jobs/create-item`} className="btn m-5 bg-primary-content shadow-2xl">Create Item</Link>
            </div>


            <section>
                <div className="overflow-x-auto">
                    <table className="table table-xs table-zebra-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Vacancy</th>
                                <th>company</th>
                                <th>location</th>
                                <th>Last Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs.map((job, index) => <tr key={job?._id} className="hover:scale-105 ease-in-out duration-200">
                                    <th>{index + 1}</th>
                                    <td>{job?.title}</td>
                                    <td>{job?.vacancy}</td>
                                    <td>{job?.orgName}</td>
                                    <td>{job?.address}</td>
                                    <td>{job?.lastDate}</td>
                                    <td>
                                        <button className="">UP</button>
                                        <button className="">Del</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Vacancy</th>
                                <th>company</th>
                                <th>location</th>
                                <th>Last Date</th>
                                <th>Action</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </section>

            {/* <Outlet></Outlet> */}
        </div>
    );
};

export default Jobs;
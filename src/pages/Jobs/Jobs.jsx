import { Link } from "react-router-dom";
import useJobs from "../../hooks/useJobs";
import { MdDelete } from "react-icons/md";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { RiFileEditFill } from "react-icons/ri";

const Jobs = () => {

    const { jobs, refetch } = useJobs();
    const axiosPrivate = useAxiosPrivate();
    console.log(jobs);

    const handleDeleteJobItem = async (job) => {
        // console.log(job);

        // confirm alert
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // delete api req from database
                const delItemRes = await axiosPrivate.delete(`/v1/jobs/circulars/del-item/${job._id}`);
                console.log(delItemRes.data);

                // successfully deleted
                if (delItemRes.data?.deletedCount === 1) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                    refetch();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Server or database might get any issue, please try again.</a>'
                    });

                    return;
                };
            };
        });
    };

    return (
        <div>
            Jobs
            <div className="card  flex flex-row justify-center">
                <Link to={`/jobs`} className="btn m-5 bg-primary-content shadow-2xl">All Items</Link>
                <Link to={`/jobs/circulars/create-item`} className="btn m-5 bg-primary-content shadow-2xl">Create Circular</Link>
            </div>


            <section className="">
                <div className="">
                    <table className="table table-xs table-zebra-zebra">
                        <thead>
                            <tr>
                                <th>({jobs.length})</th>
                                <th>Title</th>
                                <th>Vacancy</th>
                                <th>Institution</th>
                                <th>Posts</th>
                                <th>location</th>
                                <th>Last Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jobs.map((job, index) => <tr key={job?._id} className="hover:scale-105 ease-in-out duration-300">
                                    <th>{index + 1}</th>
                                    <td>{job?.title}</td>
                                    <td>{job?.total_vacancy}</td>
                                    <td>{job?.institution?.name}</td>
                                    <td>{job?.posts?.length}</td>
                                    <td>{job?.address}</td>
                                    <td>{job?.apply?.close_date}</td>
                                    <td>
                                        <Link to={`/jobs/circulars/update-item/${job._id}`}><button className="mx-2 text-yellow-500" ><RiFileEditFill /></button></Link>
                                        <button className="mx-2 text-red-600 text" onClick={() => handleDeleteJobItem(job)}><MdDelete />
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>({jobs.length})</th>
                                <th>Title</th>
                                <th>Vacancy</th>
                                <th>Institution</th>
                                <th>Posts</th>
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
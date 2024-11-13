import { Link, Outlet } from "react-router-dom";

const Jobs = () => {
    return (
        <div>
            Jobs
            <div className="card  flex flex-row justify-center">
                <Link to={`/jobs`} className="btn m-5 bg-primary-content shadow-2xl">All Items</Link>
                <Link to={`/jobs/create-item`} className="btn m-5 bg-primary-content shadow-2xl">Create Item</Link>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Jobs;
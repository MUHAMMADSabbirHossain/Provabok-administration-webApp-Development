import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2 className="text-center text-3xl">Welcome to Provabok [user name].</h2>


            <div className="card bg-primary-content  m-10 ">
                <div className="badge badge-primary text-xl p-5 mx-5 -my-5">Job</div>
                <div className="m-2">
                    <Link to={`/jobs`} className="btn m-5">All Items</Link>
                    <Link to={`/jobs/create-item`} className="btn m-5">Create Item</Link>
                </div>
            </div>


        </div>
    );
};

export default Home;
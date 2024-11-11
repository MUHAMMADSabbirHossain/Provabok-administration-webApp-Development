import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <section>
            <h2 className="text-center text-4xl font-bold my-10">Welcome to Provabok Administration.</h2>
            <p className="text-xl my-40"><Link>Please Login</Link></p>
        </section>
    );
};

export default Landing;
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div className="App">
            <center>
                <ul>
                    <Link to="/">Home</Link>
                    <Link to={"/customers"}>Customers </Link>
                    <Link to={"/trainings"}>Trainings </Link>
                    <Link to={"/calendar"}>Calendar </Link>
                </ul>
            </center>
        </div>
    )
}
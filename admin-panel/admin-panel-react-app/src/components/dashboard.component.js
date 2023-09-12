import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {

    const logout = () => {
        AuthService.logout()
        window.location.reload()
    }

    return (<div>
        <h1>Dashboard</h1>
        <a onClick={logout}>Logout</a>
    </div>)
}

export default Dashboard

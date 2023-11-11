import AuthService from "../services/auth.service";
import {Link, Outlet} from "react-router-dom";

const LiPages = () => {

    const logout = () => {
        AuthService.logout()
        window.location.reload()
    }

    return (<div>

        <div className="main-container">
            <div className="side-bar">
                <div className="logo-box">
                    <a  className="logo">Logo</a>
                    <div className="sb-navs">
                        <div className="sb-nav">
                            <a href="" className="sb-navlink">Dashboard</a>
                        </div>
                        <div className="sb-nav">
                            <a href="" className="sb-navlink">Settings</a>
                            <div className="sb-navs">
                                <div className="sb-nav"> <Link className="sb-navlink" to="/settings/languages">Languages</Link> </div>
                                <div className="sb-nav"> <Link className="sb-navlink" to="/settings/elements">Elements</Link> </div>
                                <div className="sb-nav"> <Link className="sb-navlink" to="/">Boxes</Link> </div>
                            </div>
                        </div>
                        <div className="sb-nav">
                            <a href="" className="sb-navlink">Components</a>
                            <div className="sb-navs">
                                <div className="sb-nav"> <a href="" className="sb-navlink">Header</a> </div>
                                <div className="sb-nav"> <a href="" className="sb-navlink">Footer</a> </div>
                            </div>
                        </div>
                        <div className="sb-nav">
                            <a href="" className="sb-navlink">Pages</a>
                            <div className="sb-navs">
                                <div className="sb-nav"> <a href="" className="sb-navlink">HomePage</a> </div>
                                <div className="sb-nav"> <a href="" className="sb-navlink">Contact</a> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <h1>Dashboard</h1>
                <a onClick={logout}>Logout</a>
                <Outlet />
            </div>
        </div>
    </div>)
}

export default LiPages

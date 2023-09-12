import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const Login = () => {

    const [alertMessage, setAlertMessage] = useState('')

    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {}
        new FormData(event.target).forEach((value, key) => (data[key] = value))
        AuthService.login(data).then(result => {
            if (result.success) navigate('/')
            else { setAlertMessage(result.message) }
        })
    }

    return (<div>
        <main className="vh-100 d-flex justify-content-center align-items-center">
            <form onSubmit={onSubmit}>

                {alertMessage ? <div className="alert alert-danger">{alertMessage}</div> : null}

                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" name="email"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
        </main>
    </div>)
}

export default Login

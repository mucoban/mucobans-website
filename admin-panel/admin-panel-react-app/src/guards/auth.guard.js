import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const AuthGuard = ({ component }) => {
    const [status, setStatus] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        checkTokenExists()
    }, [component])

    const checkTokenExists = () => {
        try {
            const token = sessionStorage.getItem('token')
            if (!token) navigate('/login')
            setStatus(true)
            return
        } catch (e) {
            navigate('/login')
        }
    }

    return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>
}

export default AuthGuard

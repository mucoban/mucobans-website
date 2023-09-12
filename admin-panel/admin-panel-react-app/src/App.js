import './App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginComponent from "./components/login.component";
import Dashboard from "./components/dashboard.component";
import AuthGuard from "./guards/auth.guard";
import AuthService from "./services/auth.service";

function App() {

    AuthService.initialLogin()

    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthGuard component={<Dashboard/>}/>}></Route>
                    <Route path="/login" element={<LoginComponent/>}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

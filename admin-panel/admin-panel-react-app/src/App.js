import './App.scss';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LoginComponent from "./components/login.component";
import AuthGuard from "./guards/auth.guard";
import AuthService from "./services/auth.service";
import LiPages from "./components/liPages.component";
import Elements from "./components/li-pages/settings/elements/elements.component";
import ElementEdit from "./components/li-pages/settings/elements/elementEdit.component";

function App() {

    AuthService.initialLogin()

    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthGuard component={<LiPages/>}/>}>
                        <Route path="settings/elements" element={<Elements />} />
                        <Route path="settings/elements/create" element={<ElementEdit />} />
                        <Route path="settings/elements/:id" element={<ElementEdit />} />
                    </Route>
                    <Route path="/login" element={<LoginComponent/>}></Route>
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

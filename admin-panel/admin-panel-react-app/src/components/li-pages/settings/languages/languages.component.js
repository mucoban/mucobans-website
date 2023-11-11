import {Component} from "react";
import axios from "axios";
import {globals} from "../../../../globals";
import {Link} from "react-router-dom";

class Languages extends Component {

    constructor(counter) {
        super(counter);
        this.state = {
            languages: []
        }
    }

    componentDidMount() {
        this.getLanguages()
    }

    getLanguages = () => {
        axios.get(`${globals.api}languages`)
            .then(response => {
                this.setState({ languages: response.data.data })
            })
    }

    deleteLanguage = elementId => {
        if (window.confirm(`language ${elementId} will be deleted`)) {
            axios.delete(`${globals.api}languages/${elementId}`)
                .then(response => {
                    alert(response.data.message)
                    this.getLanguages()
                })
        }
    }

    render() {
        return (<div className="container">
            <p>Languages</p>
            <div className="text-end">
                <Link to="./create">Create</Link>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Language Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Abbreviation</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {this.state.languages.map(language => (<tr key={language._id}>
                    <th>{language._id}</th>
                    <td>{language.title}</td>
                    <td>{language.abb}</td>
                    <td><Link className="btn btn-warning" to={language._id}>Edit</Link></td>
                    <td><button className="btn btn-danger" onClick={() => this.deleteLanguage(language._id)}>Delete</button></td>
                </tr>))}
                </tbody>
            </table>
        </div>)
    }

}

export default Languages

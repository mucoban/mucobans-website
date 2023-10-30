import {Component} from "react";
import axios from "axios";
import {globals} from "../../../../globals";
import {Link} from "react-router-dom";

class Elements extends Component {

    constructor(counter) {
        super(counter);
        this.state = {
            elements: []
        }
    }

    componentDidMount() {
        this.getElements()
    }

    getElements = () => {
        axios.get(`${globals.api}elements`)
            .then(response => {
                this.setState({ elements: response.data.data })
            })
    }

    deleteElement = elementId => {
        if (window.confirm(`element ${elementId} will be deleted`)) {
            axios.delete(`${globals.api}elements/${elementId}`)
                .then(response => {
                    alert(response.data.message)
                    this.getElements()
                })
        }
    }

    render() {
        return (<div className="container">
            <p>elements</p>
            <div className="text-end">
                <Link to="./create">Create</Link>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Element Id</th>
                    <th scope="col">Value</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {this.state.elements.map(element => (<tr key={element._id}>
                    <th>{element._id}</th>
                    <td>{element.elementData[0].value}</td>
                    <td><Link className="btn btn-warning" to={element._id}>Edit</Link></td>
                    <td><button className="btn btn-danger" onClick={() => this.deleteElement(element._id)}>Delete</button></td>
                </tr>))}
                </tbody>
            </table>
        </div>)
    }

}

export default Elements

import {Component} from "react";
import axios from "axios";
import {globals} from "../../../globals";

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

    render() {
        return (<div>
            <p>elements</p>

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Element Id</th>
                    <th scope="col">Value</th>
                </tr>
                </thead>
                <tbody>
                {this.state.elements.map(element => (<tr key={element._id}>
                    <th>{element._id}</th>
                    <td>{element.elementData[0].value}</td>
                </tr>))}
                </tbody>
            </table>
        </div>)
    }

}

export default Elements

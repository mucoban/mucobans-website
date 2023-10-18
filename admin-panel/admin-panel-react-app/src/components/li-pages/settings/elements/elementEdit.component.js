import {Component} from "react";
import axios from "axios";
import {globals} from "../../../../globals";
import {Tab, Tabs, Form} from "react-bootstrap";
import { useParams } from "react-router-dom"

const withParams = (Component) => props => <Component {...props} params={useParams()} />

class ElementEdit extends Component {

    constructor(counter) {
        super(counter);
        this.state = {
            languages: [],
            element: {
                active: false,
                multiLanguage: false,
            }
        }
        this.setElementValue = this.setElementValue.bind(this)
        this.setElementDataValue = this.setElementDataValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getLanguages()
    }

    getElement = () => {
        axios.get(`${globals.api}elements/${this.props.params.id}`)
            .then(response=> this.handleElement(response.data.data))
    }

    handleElement(data) {
        this.setState({ element: data })
        const languages = this.state.languages.map(language => {
            const foundEDL = data.elementData.find(d => d.languageAbb === language.abb )
            language.elementValue = foundEDL ? foundEDL.value : null
            return language
        })
        this.setState({ languages: languages })
    }

    getLanguages = () => {
        axios.get(`${globals.api}languages`)
            .then(response => {
                this.setState({ languages: response.data.data })
                this.getElement()
            })
    }

    setElementValue(key, event) {
        this.setState({ element: { ...this.state.element, [key]: event.target.checked } }) }

    setElementDataValue(lang, value) {
        const found = this.state.element.elementData.find(d => d.languageAbb === lang)
        if (found) found.value = value
    }

    handleSubmit(event) {
        event.preventDefault()
        const element = {...this.state.element, updatedAt: new Date()}
        const languages = this.state.languages.map(language => ({...language, elementValue: ''}))
        this.setState({ languages: languages })

        axios.put(`${globals.api}elements/${this.props.params.id}`, element)
            .then(response => {
                alert(response.data.message)
                this.handleElement(response.data.data)
            })
    }

    render() {
        return (<div>
            <h4>element {this.state.element.id}</h4>

            <div className="col-3">
                <form onSubmit={this.handleSubmit}>

                    <div className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="active"
                            checked={this.state.element.active}
                            onChange={(event) => this.setElementValue('active', event)}
                        />
                        <Form.Check
                            type="checkbox"
                            label="multi language"
                            checked={this.state.element.multiLanguage}
                            onChange={(event) => this.setElementValue('multiLanguage', event)}
                        />
                    </div>

                    <Tabs
                        defaultActiveKey="tr"
                        className="mb-3"
                    >
                        { this.state.languages.map(language => {
                            return (<Tab key={language._id} eventKey={language.abb} title={language.title}>
                                        <div className="form-group">
                                            <label>{language.title}</label>
                                            <input className="form-control"
                                                   defaultValue={language.elementValue || ''}
                                                   onChange={e => this.setElementDataValue(language.abb, e.target.value)}
                                            />
                                        </div>
                                    </Tab>)
                        }) }
                    </Tabs>

                    <div className="form-group">
                        <button className="btn btn-primary float-end">Save</button>
                    </div>

                </form>
            </div>

        </div>)
    }

}

export default withParams(ElementEdit)

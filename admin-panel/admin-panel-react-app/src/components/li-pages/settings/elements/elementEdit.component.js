import {Component} from "react";
import axios from "axios";
import {globals} from "../../../../globals";
import {Tab, Tabs} from "react-bootstrap";
import { useParams } from "react-router-dom"

const withParams = (Component) => props => <Component {...props} params={useParams()} />

class ElementEdit extends Component {

    constructor(counter) {
        super(counter);
        this.state = {
            languages: [],
            element: []
        }
        this.setElementValue = this.setElementValue.bind(this)
    }

    componentDidMount() {
        this.getLanguages()
    }

    getElement = () => {
        axios.get(`${globals.api}elements/${this.props.params.id}`)
            .then(response=> {
                this.setState({ element: response.data.data })
                const languages = this.state.languages.map(language => {
                    const foundEDL = response.data.data.elementData.find(d => d.languageAbb === language.abb )
                    language.elementValue = foundEDL ? foundEDL.value : null
                    return language
                })
                console.log('languages', languages)
                this.setState({ languages: languages })
            })
    }

    getLanguages = () => {
        axios.get(`${globals.api}languages`)
            .then(response => {
                this.setState({ languages: response.data.data })
                this.getElement()
            })
    }

    setElementValue(lang, value) {
        const found = this.state.element.elementData.find(d => d.languageAbb === lang)
        if (found) found.value = value
        console.log(this.state.element)
        this.setState({ element: this.state.element })
        console.log(this.state.element)
    }

    render() {
        return (<div>
            <h4>element {123}</h4>

            <div className="col-3">
                <form>

                    <Tabs
                        defaultActiveKey="tr"
                        className="mb-3"
                    >
                        { this.state.languages.map(language => {
                            return (<Tab key={language._id} eventKey={language.abb} title={language.title}>
                                        <div className="form-group">
                                            <label>{language.title}</label>
                                            <input className="form-control"
                                                   value={language.elementValue}
                                                   onClick={e => this.setElementValue(language.abb, e.target.value)}
                                            />
                                        </div>
                                    </Tab>)
                        }) }
                        {/*<Tab eventKey="lang-en" title="English">*/}
                        {/*    <div className="form-group">*/}
                        {/*        <label>Value</label>*/}
                        {/*        <input className="form-control" />*/}
                        {/*    </div>*/}
                        {/*</Tab>*/}
                        {/*<Tab eventKey="lang-tr" title="Turkish">*/}
                        {/*    <div className="form-group">*/}
                        {/*        <label>Value</label>*/}
                        {/*        <input className="form-control" />*/}
                        {/*    </div>*/}
                        {/*</Tab>*/}
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

import {Component} from "react";
import axios from "axios";
import {globals} from "../../../../globals";
import {useParams} from "react-router-dom"
import {Form} from "react-bootstrap";

const withParams = (Component) => props => <Component {...props} params={useParams()} />

class LanguageEdit extends Component {

    constructor(counter) {
        super(counter);
        this.state = {
            editMode: Boolean(this.props.params.id),
            language: {
                title: '',
                abb: '',
                active: false,
            }
        }

        this.setValue = this.setValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.state.editMode) this.getLanguage()
        else {
            // const elementData = []
            // this.state.languages.forEach(language => elementData.push({
            //     languageAbb: language.abb,
            //     value: '',
            // }))
            // this.setState({ element: { ...this.state.element, elementData: elementData } })
        }
    }

    getLanguage = () => {
        axios.get(`${globals.api}languages/${this.props.params.id}`)
            .then(response=> this.setState({ language: response.data.data }))
    }

    setValue(key, value) {
        // event.target.checked
        // event.target.value
        this.setState({ language: { ...this.state.language, [key]: value } })
    }

    handleSubmit(event) {
        event.preventDefault()
        if (!this.state.editMode)
            axios.post(`${globals.api}languages`, this.state.language)
                .then(response => {
                    alert(response.data.message)
                    this.setState({ language: response.data.data })
                })
        else
            axios.put(`${globals.api}languages/${this.props.params.id}`, this.state.language)
                .then(response => {
                    alert(response.data.message)
                    this.setState({ language: response.data.data })
                })
    }

    render() {
        return (<div className="container">
            <h4>{this.state.editMode ? `language ${this.state.language._id}` : `Create language`}</h4>

            <div className="col-3">
                <form onSubmit={this.handleSubmit}>

                    <div className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="active"
                            checked={this.state.language.active}
                            onChange={(e) => this.setValue('active', e.target.checked)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Title</label>
                        <input className="form-control"
                               defaultValue={this.state.language.title || ''}
                               onChange={e => this.setValue('title', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Abbreviation</label>
                        <input className="form-control"
                               defaultValue={this.state.language.abb || ''}
                               onChange={e => this.setValue('abb', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary float-end">Save</button>
                    </div>

                </form>
            </div>

        </div>)
    }

}

export default withParams(LanguageEdit)

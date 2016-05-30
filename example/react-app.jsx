import React from 'react'
import ReactDOM from 'react-dom'
import ThisIsIt from '../src/components/this-is-it'

class ReactExample extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: 'Foo is baz and barista js'
        }
    }
    updateText(ev) {
        this.setState({ text: ev.target.value })
    }
    render() {
        return (
            <div className='yup' style={{ marginTop: '50px' }}>
                <div className='row'>
                    <div className='small-12 columns yo'>
                        <textarea
                            value={this.state.text}
                            onChange={::this.updateText}
                            className='form-control'
                            style={{ height: '500px', resize: 'none' }}>
                        </textarea>
                    </div>
                </div>
                <ThisIsIt
                    text={this.state.text}
                    className='something funny'
                />
            </div>
        )
    }
}
ReactDOM.render(<ReactExample />, document.getElementById('react'))

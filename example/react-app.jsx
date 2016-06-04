import React from 'react'
import ReactDOM from 'react-dom'
import ThisIsIt from '../src/components/this-is-it'

class ReactExample extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            foo: 'bar'
        }
    }
    render() {
        return (
            <div>
                <ThisIsIt
                    text={this.state.text}
                />
            </div>
        )
    }
}
ReactDOM.render(<ReactExample />, document.getElementById('react'))

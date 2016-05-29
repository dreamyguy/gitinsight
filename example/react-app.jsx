import React from 'react'
import ReactDOM from 'react-dom'

class ReactReadingTime extends React.Component {
    render() {
        return (
            React.createElement('div', { className: 'yup' }, 'Hello React!')
        )
    }
}
ReactDOM.render(<ReactReadingTime />, document.getElementById('react'))

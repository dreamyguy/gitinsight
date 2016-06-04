import React from 'react'

export default class ThisIsIt extends React.Component {
    static propTypes = {
        myNumber: React.PropTypes.number
    };

    static defaultProps = {
        myNumber: 7
    };

    constructor(props) {
        super(props);
        this.state = {
            fooBar: 0
        }
    }

    render() {
        return (
            <div>Hello {this.props.myNumber}!</div>
        )
    }
}

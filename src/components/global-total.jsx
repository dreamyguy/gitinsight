import React from 'react'

export default class GlobalTotal extends React.Component {
    static propTypes = {
        widgetClass: React.PropTypes.string,
    //  total: React.PropTypes.string,
        detail: React.PropTypes.string,
        color: React.PropTypes.string
    };
    static defaultProps = {
        widgetClass: 'global-total',
        total: 'N/A',
        detail: 'Did not get expected data!',
        color: 'red'
    };
    constructor(props) {
        super(props);
        this.state = {
            fooBar: 0
        }
    }
    dynaClass() {
        return 'widget widget-' + this.props.widgetClass + ' flexy-item open-sans-light'
    }
    render() {
        return (
            <div className={this.dynaClass()} style={{ borderLeftColor: this.props.color }}>
                <h3 className='total'>{this.props.total}</h3>
                <p className='detail'>{this.props.detail}</p>
            </div>
        )
    }
}

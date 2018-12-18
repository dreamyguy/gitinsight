import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  render() {
    const {
      classes = '', // accepts CSS classNames as string
      changeHandler,
      title,
      name,
      checked
    } = this.props;
    return (
      <div className={`checkbox${classes ? ' ' + classes : ''}`}>
        <label>
          <input
            type="Checkbox"
            name={name}
            checked={checked}
            className="checkbox__input"
            // eslint-disable-next-line
            onChange={e => changeHandler(e.target.checked)}
            />
          {title && <div className="checkbox__label"> {title} </div>}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  classes: PropTypes.string,
  changeHandler: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool
};

export default Checkbox;

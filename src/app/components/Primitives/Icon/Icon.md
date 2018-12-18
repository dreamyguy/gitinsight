# Icon

This component uses **Font Awesome** to render SVG icons. It takes a parameter, called `icon`.

However, because of the way Font Awesome implemented itself in a React enviroment, we should first import the icons we'd like to use and add them to a `library`, that has a `add()` method to do exactly that. This import can be done at a **HOC** component, like `App`, but I chose to do it here to keep things in context.

The icons you can import are [here](https://fontawesome.com/icons?d=gallery&m=free). Note that there are different packages, like **solid**, **regular**, **brands**, etc. If you need to import those you'll have to do a separate import and add them to the `library`.

```code
lang: jsx
---
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Icon.css'

// --- Font Awesome --- //
// https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Note that all the icons we want to use in the application need to be both
// imported and added to the library before they can be used
import {
  faBell,
  faCalendarAlt,
  faGraduationCap,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faBell,
  faCalendarAlt,
  faGraduationCap,
  faUserFriends,
);

class Icon extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const {
      classes = '', // accepts CSS classNames as string
      icon = 'question-circle' // fallback, in case 'icon' is not passed as props
    } = this.props;
    return (
      <div className={`icon${classes ? ' ' + classes : ''}`}>
        <FontAwesomeIcon icon={icon}/>
      </div>
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  classes: PropTypes.string,
};

export default Icon;
```

### Icon

Note that you'd never need to write all the markup below. What you see here is a result of the rendering of the component.
```html
  <div class="icon">
    <svg aria-hidden="true" data-prefix="fas" data-icon="bell" class="svg-inline--fa fa-bell fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path>
    </svg>
  </div>
```

### Icon [React]
```react
  ---
  <div>
    <Icon icon="bell"/>
    <Icon icon="calendar-alt"/>
    <Icon icon="graduation-cap"/>
    <Icon icon="user-friends"/>
  </div>
```

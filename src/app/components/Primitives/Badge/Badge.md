# Badge

The badge itself is only limited to a `fit-content` width constraint, because the text within it can be long.

_Because IE and Edge don't support `fit-content`, always constrain the **Badge** component_, through some kind of wrapper, _otherwise it will stretch horizontally into whatever space it has around itself_.

```code
lang: jsx
---
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Badge.css'

class Badge extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const {
      classes = '', // accepts CSS classNames as string
      txt = ''
    } = this.props;
    return (
      <div className={`badge${classes ? ' ' + classes : ''}`}>
        {txt}
      </div>
    );
  }
}

Badge.propTypes = {
  txt: PropTypes.string,
  classes: PropTypes.string,
};

export default Badge;
```

### Badge
```html
  <div class="badge">
    24
  </div>
```

### Badge [React]
```react
  <div>
    <Badge txt="a very loooooooong text"/>
    <br/>
    <Badge txt="1337"/>
  </div>
```

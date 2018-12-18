# Checkbox


```code
lang: jsx
---
import React, { Component } from 'react';
import './Checkbox.css'

class Checkbox extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`checkbox${classes ? ' ' + classes : ''}`}>
        Checkbox
      </div>
    );
  }
}

export default Checkbox;

```

### Checkbox
```html
  <div class="checkbox">
    Checkbox
  </div>
```

### Checkbox [React]
```react
  ---
  <Checkbox />
```

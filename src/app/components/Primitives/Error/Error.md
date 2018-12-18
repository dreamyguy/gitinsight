# Error


```code
lang: jsx
---
import React, { Component } from 'react';
import './Error.css'

class Error extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`error${classes ? ' ' + classes : ''}`}>
        Error
      </div>
    );
  }
}

export default Error;

```

### Error
```html
  <div class="error">
    Error
  </div>
```

### Error [React]
```react
  ---
  <Error />
```

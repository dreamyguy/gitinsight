# Header


```code
lang: jsx
---
import React, { Component } from 'react';
import './Header.css'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`header${classes ? ' ' + classes : ''}`}>
        Header
      </div>
    );
  }
}

export default Header;
```

### Header
```html
  <div class="header">
    Header
  </div>
```

### Header [React]
```react
  ---
  <Header />
```

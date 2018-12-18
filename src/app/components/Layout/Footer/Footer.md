# Footer


```code
lang: jsx
---
import React, { Component } from 'react';
import './Footer.css'

class Footer extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`footer${classes ? ' ' + classes : ''}`}>
        Footer
      </div>
    );
  }
}

export default Footer;
```

### Footer
```html
  <div class="footer">
    Footer
  </div>
```

### Footer [React]
```react
  ---
  <Footer />
```

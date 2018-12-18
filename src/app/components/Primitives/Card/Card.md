# Card


```code
lang: jsx
---
import React, { Component } from 'react';
import './Card.css'

class Card extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render() {
    const {
      classes = '' // accepts CSS classNames as string
    } = this.props;
    return (
      <div className={`card${classes ? ' ' + classes : ''}`}>
        Card
      </div>
    );
  }
}

export default Card;

```

### Card
```html
  <div class="card">
    Card
  </div>
```

### Card [React]
```react
  ---
  <Card />
```

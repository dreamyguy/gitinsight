# Button

A button consist of these props

- `type`: primary | secondary | download
- `classes`:  accepts CSS classNames as string
- `title`: ex "Edit",
- `icon`: See the Icon component for available icons
- `disabled`: true/false


```code
lang: jsx
---
<Button
  title="Rediger"
  icon="pen"
  disabled={false}
  onClick={()=>func()}
/>

```
# Plain html button
### Primary button
```html
  <button class="button button--primary">
    Hit me
  </button>
```

### Button disabled
```html
  <button class="button button--primary" disabled>
    Hit me
  </button>
```

# Button as a react component
### Primary button [React]
```react
  state: {foo: 0}
  ---
  <Button title="Hit me" onClick={()=>alert("You clicked me!")}/>
```

### Secondary button [React]
```react
  state: {foo: 0}
  ---
  <Button title="Hit me" onClick={()=>alert("You clicked me!")}/>
```

### Button with icon [React]
```react
  state: {foo: 0}
  ---
  <Button title={`Rediger ${state.foo}`} icon="pen" onClick={()=>setState({foo:state.foo+1})}/>
```

### Button with icon disabled [React]
```react
  ---
  <Button title="Rediger" icon="pen" disabled={true} onClick={()=>alert('You clikced me')}/>
```


```react
  ---
  <Button type="download" title="last ned" icon="pen" onClick={()=>alert('You clicked me')}/>
```
# @basatmaqsood/react-slot

[![npm version](https://img.shields.io/npm/v/@basatmaqsood/react-slot.svg)](https://www.npmjs.com/package/@basatmaqsood/react-slot)
[![npm downloads](https://img.shields.io/npm/dm/@basatmaqsood/react-slot.svg)](https://www.npmjs.com/package/@basatmaqsood/react-slot)
[![License](https://img.shields.io/npm/l/@basatmaqsood/react-slot.svg)](https://github.com/basatmaqsood/react-slot/blob/main/LICENSE)

Beautiful, customizable slot machine text animations for React applications. Add captivating text transitions with smooth character animations and word cycling.

## Features

- 🎰 **Slot Machine Effect** - Animate text with an eye-catching slot machine effect
- 🔤 **Character-by-Character Animation** - Individual character animations with `SlotTextCharacters`
- 🔄 **Word Cycling** - Cycle through words with `SlotTextWords`
- 🎮 **Interactive** - Pause on hover and other interactive features
- 🎛️ **Highly Customizable** - Extensive options for timing, easing, direction, and behavior
- 🎭 **Multiple Easing Types** - Choose from various easing functions (bounce, elastic, smooth, sharp, linear)
- 🔄 **Direction Control** - Forward or reverse animation directions
- 🔁 **Loop Control** - Set animations to loop or play once
- ⏱️ **Timing Control** - Customize duration, delay, and pause duration

## Installation

Install the package using npm:

```bash
npm install @basatmaqsood/react-slot
```

Or with yarn:

```shellscript
yarn add @basatmaqsood/react-slot
```

## Quick Start

```javascriptreact
import React from 'react';
import { SlotTextCharacters, SlotTextWords } from '@basatmaqsood/react-slot';

function App() {
  return (
    <div>
      {/* Animate text character by character */}
      <h1>
        <SlotTextCharacters
          text="Welcome to my website!"
          duration={1000}
          delay={100}
          easing="bounce"
          loop={true}
        />
      </h1>
      
      {/* Cycle through different words */}
      <p>
        I am a{" "}
        <SlotTextWords
          words={["developer", "designer", "creator"]}
          duration={1500}
          easing="smooth"
          loop={true}
          pauseDuration={2000}
        />
      </p>
    </div>
  );
}

export default App;
```

## Components

### SlotTextCharacters

Animates text character by character with a slot machine effect.

```javascriptreact
import { SlotTextCharacters } from '@basatmaqsood/react-slot';

<SlotTextCharacters
  text="Hello World"
  duration={1000}
  loop={true}
  delay={100}
  direction="forward"
  easing="smooth"
  pauseOnHover={true}
  pauseDuration={1000}
  className="text-blue-500"
  style={{ fontWeight: 'bold' }}
  onComplete={() => console.log('Animation complete!')}
/>
```

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `text` | string | `""` | Text to animate
| `duration` | number | `1000` | Duration of animation in milliseconds
| `loop` | boolean | `true` | Whether to loop the animation
| `delay` | number | `100` | Delay between character animations in milliseconds
| `direction` | `"forward"` | `"reverse"` | `"forward"` | Direction of animation
| `easing` | `"bounce"` | `"elastic"` | `"smooth"` | `"sharp"` | `"linear"` | `"smooth"` | Easing function for animation
| `pauseOnHover` | boolean | `false` | Pause animation on hover
| `pauseDuration` | number | `1000` | Pause duration between animation cycles in milliseconds
| `className` | string | `""` | CSS class to apply to container
| `style` | CSSProperties | `{}` | Inline styles to apply to container
| `onComplete` | () => void | `undefined` | Callback function called when animation completes


### SlotTextWords

Cycles through words with a slot machine effect.

```javascriptreact
import { SlotTextWords } from '@basatmaqsood/react-slot';

<SlotTextWords
  words={["React", "Angular", "Vue"]}
  duration={1500}
  loop={true}
  delay={100}
  direction="forward"
  order="sequential"
  easing="smooth"
  pauseOnHover={true}
  pauseDuration={2000}
  className="text-purple-500"
  style={{ fontWeight: 'bold' }}
  onComplete={() => console.log('Animation complete!')}
/>
```

#### Props

| Prop | Type | Default | Description
|-----|-----|-----|-----
| `words` | string[] | `[]` | Array of words to cycle through
| `duration` | number | `1500` | Duration of animation in milliseconds
| `loop` | boolean | `true` | Whether to loop through all words
| `delay` | number | `100` | Delay between character animations in milliseconds
| `direction` | `"forward"` | `"reverse"` | `"forward"` | Direction of animation
| `order` | `"sequential"` | `"random"` | `"sequential"` | Order of word cycling
| `easing` | `"bounce"` | `"elastic"` | `"smooth"` | `"sharp"` | `"linear"` | `"smooth"` | Easing function for animation
| `pauseOnHover` | boolean | `false` | Pause animation on hover
| `pauseDuration` | number | `1000` | Pause duration between words in milliseconds
| `className` | string | `""` | CSS class to apply to container
| `style` | CSSProperties | `{}` | Inline styles to apply to container
| `onComplete` | () => void | `undefined` | Callback function called when animation completes


## Examples

### Animated Headlines

```javascriptreact
<h1 className="text-4xl font-bold">
  <SlotTextCharacters
    text="Creative Web Solutions"
    duration={1000}
    easing="elastic"
    loop={false}
  />
</h1>
```

### Rotating Skills

```javascriptreact
<div>
  I specialize in{" "}
  <SlotTextWords
    words={["React Development", "UI/UX Design", "Frontend Architecture"]}
    duration={1200}
    easing="bounce"
    loop={true}
    pauseDuration={3000}
  />
</div>
```

### Call-to-Action Button

```javascriptreact
<button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
  <SlotTextCharacters
    text="Sign Up Now!"
    duration={800}
    easing="sharp"
    loop={true}
    pauseDuration={3000}
  />
</button>
```

### Loading Indicator

```javascriptreact
<div>
  <SlotTextCharacters
    text="Loading..."
    duration={1500}
    easing="linear"
    loop={true}
  />
</div>
```

## Advanced Usage

### Chaining Animations

You can chain animations by using the `onComplete` callback:

```javascriptreact
function ChainedAnimation() {
  const [showSecondAnimation, setShowSecondAnimation] = useState(false);
  
  return (
    <div>
      {!showSecondAnimation ? (
        <SlotTextCharacters
          text="First animation"
          duration={1000}
          loop={false}
          onComplete={() => setShowSecondAnimation(true)}
        />
      ) : (
        <SlotTextWords
          words={["Second", "Animation", "Started"]}
          duration={800}
          loop={true}
        />
      )}
    </div>
  );
}
```

### Dynamic Content

You can use state to dynamically change the content:

```javascriptreact
function DynamicContent() {
  const [content, setContent] = useState("Initial Text");
  
  return (
    <div>
      <SlotTextCharacters
        text={content}
        duration={1000}
        loop={true}
      />
      <button onClick={() => setContent("Updated Text")}>
        Change Text
      </button>
    </div>
  );
}
```

### Custom Styling with Tailwind CSS

The components work great with Tailwind CSS:

```javascriptreact
<SlotTextCharacters
  text="Tailwind Styled"
  className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
  duration={1000}
/>
```

## Styling

Style your components using className or inline styles:

```javascriptreact
<SlotTextCharacters
  text="Styled Text"
  className="text-2xl font-bold text-blue-600"
  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
/>
```

## Performance Considerations

For optimal performance:

- Avoid animating very long text strings at once
- Use appropriate delay values (50-100ms is usually good)
- For lists with many items, consider using virtualization
- Set `loop: false` for one-time animations
- Use `pauseDuration` to control timing between cycles


## Accessibility

The components are built with accessibility in mind:

- All text remains readable by screen readers
- Animations respect the user's `prefers-reduced-motion` setting
- You can use ARIA attributes with the components as needed


```javascriptreact
<SlotTextCharacters
  text="Accessible Text"
  aria-label="Animated text that says: Accessible Text"
  className="text-2xl"
/>
```

## Troubleshooting

### Common Issues

**Issue**: Animations not working in production build.**Solution**: Make sure you're not using server-side rendering for these components. Add `'use client'` directive or use dynamic imports.

**Issue**: Text flashes or jumps during animation.**Solution**: Try adjusting the `delay` value or using a different `easing` function.

**Issue**: Performance issues with long text.**Solution**: Break long text into smaller components or increase the `delay` value.

### FAQ

**Q: Can I use HTML in the text?**A: No, the components only support plain text. For HTML content, wrap the component around specific text portions.

**Q: How do I stop animations when the component unmounts?**A: The components automatically clean up animations on unmount.

**Q: Can I use custom fonts?**A: Yes, the components inherit font styles from their parent elements.

## Browser Support

The package supports all modern browsers including:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+


## Changelog

### v1.0.0

- Initial release with SlotTextCharacters and SlotTextWords components
- Five easing functions
- Direction control
- Loop control
- Hover interaction


### v1.1.0

- Added onComplete callback
- Improved performance
- Fixed minor animation bugs


## License

MIT © Basat Maqsood

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Credits

- Created by [Basat Maqsood](https://www.basatmaqsood.live)
- Inspired by slot machine animations and text reveal effects
- Special thanks to all contributors


## Related Projects

- [@basatmaqsood/react-buttons](https://www.npmjs.com/package/@basatmaqsood/react-buttons) - A collection of beautiful, interactive and animated buttons for React



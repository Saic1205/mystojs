# mystojs

A Next.js friendly reusable tooltip component for React applications.

## Installation

You can install the package using npm:

```bash
npm install mystojs
```

Or using yarn:

```bash
yarn add mystojs
```

## Peer Dependencies

This package has the following peer dependencies:

- react: ^18.3.1
- framer-motion: ^11.5.6

Make sure these are installed in your project.

## Usage

Here's a basic example of how to use the Tooltip component:

```jsx
import React from "react";
import Tooltip from "mystojs";

const MyComponent = () => {
  return (
    <Tooltip
      tooltipContent="This is a tooltip"
      backgroundColor="bg-black"
      textColor="text-white"
      useSpringEffect={true}
    >
      <button>Hover me</button>
    </Tooltip>
  );
};

export default MyComponent;
```

## Props

The Tooltip component accepts the following props:

- `children` (React.ReactNode): The element that triggers the tooltip on hover.
- `tooltipContent` (React.ReactNode): The content to be displayed in the tooltip.
- `backgroundColor` (string): The background color of the tooltip. Use Tailwind CSS classes.
- `textColor` (string): The text color of the tooltip. Use Tailwind CSS classes.
- `useSpringEffect` (boolean): Whether to use a spring animation effect for the tooltip movement.

## Features

- Smooth animation using Framer Motion
- Customizable appearance with Tailwind CSS classes
- Optional spring effect for tooltip movement
- Responsive design

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Issues

If you encounter any issues or have feature requests, please file them in the [issues section](https://github.com/Saic1205/mystojs/issues) of the GitHub repository.

## Author

Sai Charan

---

For more information, visit the [GitHub repository](https://github.com/Saic1205/mystojs).

# mystojs

A Next.js friendly reusable component library for React applications, featuring a Tooltip and a responsive Navbar.

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

- react: ^18.0.0
- framer-motion: ^11.0.0
- @types/react: ^18.0.0 (for TypeScript users)

Make sure these are installed in your project.

## Components

### Tooltip

A customizable tooltip component with smooth animations.

#### Usage

```jsx
import React from "react";
import { Tooltip } from "mystojs";

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

#### Props

- `children` (React.ReactNode): The element that triggers the tooltip on hover.
- `tooltipContent` (React.ReactNode): The content to be displayed in the tooltip.
- `backgroundColor` (string): The background color of the tooltip. Use Tailwind CSS classes.
- `textColor` (string): The text color of the tooltip. Use Tailwind CSS classes.
- `useSpringEffect` (boolean): Whether to use a spring animation effect for the tooltip movement.

### Navbar

A responsive navigation bar component with dropdown support and smooth animations.

#### Usage of the component

```jsx
import React from "react";
import { Navbar } from "mystojs";
import import { usePathname } from "next/navigation"; // used in nextjs replace this react specific equivalent if using react

const Mynav = () => {
    const pathname = usePathname();
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Services",
      href: "/services",
      subItems: [
        { name: "Web Design", href: "/services/web-design" },
        { name: "Mobile Apps", href: "/services/mobile-apps" },
      ],
    },
    {
      name: "Products",
      href: "/products",
      subItems: [
        { name: "Software", href: "/products/software" },
        { name: "Hardware", href: "/products/hardware" },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  const logo = <img src="/logo.png" alt="Logo" />;

  const buttons = [
    <button key="profile" className="btn">
      Profile
    </button>,
    <button key="login" className="btn btn-primary">
      Login
    </button>,
  ];

  return (
    <Navbar
      logo={logo}
      navItems={navItems}
      buttons={buttons}
      activeItemColor="text-blue-500"
      hoverItemColor="hover:text-blue-300"
      backgroundColor="bg-gray-100"
      underlineColor="bg-blue-500"
      hideOnScroll={false}
      currentPath={pathname}
    />
  );
};

export default Mynav;
```

#### Props for nav

- `logo` (React.ReactNode): The logo component to be displayed in the navbar.
- `navItems` (NavItem[]): An array of navigation items.
- `buttons` (React.ReactNode[]): Optional array of button components to be displayed in the navbar.
- `activeItemColor` (string): The color of the active navigation item. Use Tailwind CSS classes.
- `hoverItemColor` (string): The color of navigation items on hover. Use Tailwind CSS classes.
- `backgroundColor` (string): The background color of the navbar. Use Tailwind CSS classes.
- `underlineColor` (string): The color of the underline for active items. Use Tailwind CSS classes.
- `hideOnScroll` (boolean): Whether to hide the navbar when scrolling down.
- `currentpath` (string): The path.

## Features

- Smooth animations using Framer Motion
- Customizable appearance with Tailwind CSS classes
- Responsive design
- Dropdown support for nested navigation items
- Hide on scroll functionality for the navbar

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

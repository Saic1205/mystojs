import React, { useState, useRef, useEffect } from "react";
import {motion,AnimatePresence, useScroll,useMotionValueEvent,} from "framer-motion";

// Types
export interface NavItem {
  name: string;
  href: string;
  subItems?: NavItem[];
  icon?: React.ElementType;
}

export interface NavbarProps {
  logo: React.ReactNode;
  navItems: NavItem[];
  buttons?: React.ReactNode[];
  activeItemColor?: string;
  hoverItemColor?: string;
  backgroundColor?: string;
  underlineColor?: string;
  hideOnScroll?: boolean;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({
  logo,
  navItems,
  buttons = [],
  activeItemColor = "text-orange-500",
  hoverItemColor = "hover:text-orange-500",
  backgroundColor = "bg-white",
  underlineColor = "bg-orange-500",
  hideOnScroll = true,
  currentPath,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const navRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (hideOnScroll) {
      const previous = scrollY.getPrevious();
      if (previous !== undefined) {
        if (latest > previous && latest > 150) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }
    }
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setOpenDropdowns({});
  };

  const toggleDropdown = (href: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  useEffect(() => {
    const closeMenus = () => {
      setMobileMenuOpen(false);
      setOpenDropdowns({});
    };

    const handleClickOutside = (event: MouseEvent) => {
      Object.keys(openDropdowns).forEach((key) => {
        if (
          navRefs.current[key] &&
          !navRefs.current[key]!.contains(event.target as Node)
        ) {
          setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdowns]);

  useEffect(() => {
    // Set active item based on currentPath
    const activeNavItem = navItems.find(
      (item) =>
        currentPath === item.href ||
        (item.subItems &&
          item.subItems.some((subItem) => currentPath === subItem.href))
    );
    if (activeNavItem) {
      setActiveItem(activeNavItem.href);
    }
  }, [currentPath, navItems]);

  const getUnderlineStyle = () => {
    const activeElement = navRefs.current[activeItem || ""];
    return activeElement
      ? { width: activeElement.offsetWidth, left: activeElement.offsetLeft }
      : { width: 0, left: 0 };
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hideOnScroll ? (hidden ? "hidden" : "visible") : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 w-full ${backgroundColor} text-gray-800 shadow-md z-50`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-evenly">
          {/* Logo */}
          {logo}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center h-16 relative">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                navRefs={navRefs}
                toggleDropdown={toggleDropdown}
                isOpen={!!openDropdowns[item.href]}
                activeItemColor={activeItemColor}
                hoverItemColor={hoverItemColor}
                setActiveItem={setActiveItem}
                isActive={currentPath === item.href || activeItem === item.href}
              />
            ))}
            {/* Underline for active nav item */}
            <motion.div
              className={`absolute bottom-0 h-1 ${underlineColor}`}
              initial={false}
              animate={getUnderlineStyle()}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {buttons.map((button, index) => (
              <React.Fragment key={index}>{button}</React.Fragment>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  toggleMobileMenu={toggleMobileMenu}
                  toggleDropdown={toggleDropdown}
                  isOpen={!!openDropdowns[item.href]}
                  activeItemColor={activeItemColor}
                  hoverItemColor={hoverItemColor}
                  isActive={
                    currentPath === item.href || activeItem === item.href
                  }
                />
              ))}
              {buttons.map((button, index) => (
                <div key={index} className="py-2">
                  {button}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// NavItem component
const NavItem: React.FC<{
  item: NavItem;
  navRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
  toggleDropdown: (href: string) => void;
  isOpen: boolean;
  activeItemColor: string;
  hoverItemColor: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string | null>>;
  isActive: boolean;
}> = ({
  item,
  navRefs,
  toggleDropdown,
  isOpen,
  activeItemColor,
  hoverItemColor,
  setActiveItem,
  isActive,
}) => {
  if (item.subItems) {
    return (
      <div
        className="relative group h-full flex items-center"
        ref={(el) => {
          if (el) navRefs.current[item.href] = el;
        }}
        onClick={() => toggleDropdown(item.href)}
      >
        <button
          className={`h-full px-3 flex items-center ${
            isActive ? activeItemColor : hoverItemColor
          }`}
        >
          {item.icon && <item.icon className="mr-2" />}
          {item.name}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 ml-1"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </motion.svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-full w-auto rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              {item.subItems.map((subItem) => (
                <li key={subItem.href}>
                  <a
                    href={subItem.href}
                    className={`block px-4 py-2 text-sm hover:bg-neutral-100 text-nowrap ${hoverItemColor}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(item.href);
                      setActiveItem(subItem.href);
                    }}
                  >
                    {subItem.icon && <subItem.icon className="mr-2 inline" />}
                    {subItem.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className={`h-full flex items-center px-3 ${
        isActive ? activeItemColor : hoverItemColor
      }`}
      ref={(el) => {
        if (el) navRefs.current[item.href] = el;
      }}
      onClick={() => setActiveItem(item.href)}
    >
      {item.icon && <item.icon className="mr-2" />}
      {item.name}
    </a>
  );
};

// MobileNavItem component
const MobileNavItem: React.FC<{
  item: NavItem;
  toggleMobileMenu: () => void;
  toggleDropdown: (href: string) => void;
  isOpen: boolean;
  activeItemColor: string;
  hoverItemColor: string;
  isActive: boolean;
}> = ({
  item,
  toggleMobileMenu,
  toggleDropdown,
  isOpen,
  activeItemColor,
  hoverItemColor,
  isActive,
}) => {
  if (item.subItems) {
    return (
      <>
        <button
          className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
            isActive ? activeItemColor : hoverItemColor
          } flex items-center justify-between`}
          onClick={() => toggleDropdown(item.href)}
        >
          <span className="flex items-center">
            {item.icon && <item.icon className="mr-2" />}
            {item.name}
          </span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </motion.svg>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="pl-4"
            >
              {item.subItems.map((subItem) => (
                <li key={subItem.href}>
                  <a
                    href={subItem.href}
                    className={`block px-3 py-2 rounded-md text-sm hover:bg-neutral-100 text-nowrap ${hoverItemColor}`}
                    onClick={() => {
                      toggleDropdown(item.href);
                      toggleMobileMenu();
                    }}
                  >
                    {subItem.icon && <subItem.icon className="mr-2 inline" />}
                    {subItem.name}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <a
      href={item.href}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive ? activeItemColor : hoverItemColor
      }`}
      onClick={toggleMobileMenu}
    >
      {item.icon && <item.icon className="mr-2 inline" />}
      {item.name}
    </a>
  );
};

export default Navbar;

import React from "react";
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
declare const Navbar: React.FC<NavbarProps>;
export default Navbar;

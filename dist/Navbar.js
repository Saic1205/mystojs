"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var framer_motion_1 = require("framer-motion");
var Navbar = function (_a) {
    var logo = _a.logo, navItems = _a.navItems, _b = _a.buttons, buttons = _b === void 0 ? [] : _b, _c = _a.activeItemColor, activeItemColor = _c === void 0 ? "text-orange-500" : _c, _d = _a.hoverItemColor, hoverItemColor = _d === void 0 ? "hover:text-orange-500" : _d, _e = _a.backgroundColor, backgroundColor = _e === void 0 ? "bg-white" : _e, _f = _a.underlineColor, underlineColor = _f === void 0 ? "bg-orange-500" : _f, _g = _a.hideOnScroll, hideOnScroll = _g === void 0 ? true : _g, currentPath = _a.currentPath;
    var _h = (0, react_1.useState)(false), mobileMenuOpen = _h[0], setMobileMenuOpen = _h[1];
    var _j = (0, react_1.useState)({}), openDropdowns = _j[0], setOpenDropdowns = _j[1];
    var _k = (0, react_1.useState)(false), hidden = _k[0], setHidden = _k[1];
    var scrollY = (0, framer_motion_1.useScroll)().scrollY;
    var navRefs = (0, react_1.useRef)({});
    var _l = (0, react_1.useState)(null), activeItem = _l[0], setActiveItem = _l[1];
    (0, framer_motion_1.useMotionValueEvent)(scrollY, "change", function (latest) {
        if (hideOnScroll) {
            var previous = scrollY.getPrevious();
            if (previous !== undefined) {
                if (latest > previous && latest > 150) {
                    setHidden(true);
                }
                else {
                    setHidden(false);
                }
            }
        }
    });
    var toggleMobileMenu = function () {
        setMobileMenuOpen(!mobileMenuOpen);
        setOpenDropdowns({});
    };
    var toggleDropdown = function (href) {
        setOpenDropdowns(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[href] = !prev[href], _a)));
        });
    };
    (0, react_1.useEffect)(function () {
        var closeMenus = function () {
            setMobileMenuOpen(false);
            setOpenDropdowns({});
        };
        var handleClickOutside = function (event) {
            Object.keys(openDropdowns).forEach(function (key) {
                if (navRefs.current[key] &&
                    !navRefs.current[key].contains(event.target)) {
                    setOpenDropdowns(function (prev) {
                        var _a;
                        return (__assign(__assign({}, prev), (_a = {}, _a[key] = false, _a)));
                    });
                }
            });
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
    }, [openDropdowns]);
    (0, react_1.useEffect)(function () {
        var activeNavItem = navItems.find(function (item) {
            return currentPath === item.href ||
                (item.subItems &&
                    item.subItems.some(function (subItem) { return currentPath === subItem.href; }));
        });
        if (activeNavItem) {
            setActiveItem(activeNavItem.href);
        }
    }, [currentPath, navItems]);
    var getUnderlineStyle = function () {
        var activeElement = navRefs.current[activeItem || ""];
        return activeElement
            ? { width: activeElement.offsetWidth, left: activeElement.offsetLeft }
            : { width: 0, left: 0 };
    };
    return (react_1.default.createElement(framer_motion_1.motion.header, { variants: {
            visible: { y: 0 },
            hidden: { y: "-100%" },
        }, animate: hideOnScroll ? (hidden ? "hidden" : "visible") : "visible", transition: { duration: 0.35, ease: "easeInOut" }, className: "fixed top-0 left-0 right-0 w-full ".concat(backgroundColor, " text-gray-800 shadow-md z-50") },
        react_1.default.createElement("div", { className: "container mx-auto px-4" },
            react_1.default.createElement("div", { className: "flex items-center justify-between lg:justify-evenly" },
                logo,
                react_1.default.createElement("nav", { className: "hidden lg:flex items-center h-16 relative" },
                    navItems.map(function (item) { return (react_1.default.createElement(NavItem, { key: item.href, item: item, navRefs: navRefs, toggleDropdown: toggleDropdown, isOpen: !!openDropdowns[item.href], activeItemColor: activeItemColor, hoverItemColor: hoverItemColor, setActiveItem: setActiveItem, isActive: currentPath === item.href || activeItem === item.href })); }),
                    react_1.default.createElement(framer_motion_1.motion.div, { className: "absolute bottom-0 h-1 ".concat(underlineColor), initial: false, animate: getUnderlineStyle(), transition: { type: "spring", stiffness: 300, damping: 30 } })),
                react_1.default.createElement("div", { className: "hidden lg:flex items-center space-x-2" }, buttons.map(function (button, index) { return (react_1.default.createElement(react_1.default.Fragment, { key: index }, button)); })),
                react_1.default.createElement("button", { className: "lg:hidden focus:outline-none", onClick: toggleMobileMenu }, mobileMenuOpen ? "Close" : "Menu"))),
        react_1.default.createElement(framer_motion_1.AnimatePresence, null, mobileMenuOpen && (react_1.default.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, className: "lg:hidden" },
            react_1.default.createElement("div", { className: "px-2 pt-2 pb-3 space-y-1" },
                navItems.map(function (item) { return (react_1.default.createElement(MobileNavItem, { key: item.href, item: item, toggleMobileMenu: toggleMobileMenu, toggleDropdown: toggleDropdown, isOpen: !!openDropdowns[item.href], activeItemColor: activeItemColor, hoverItemColor: hoverItemColor, isActive: currentPath === item.href || activeItem === item.href })); }),
                buttons.map(function (button, index) { return (react_1.default.createElement("div", { key: index, className: "py-2" }, button)); })))))));
};
var NavItem = function (_a) {
    var item = _a.item, navRefs = _a.navRefs, toggleDropdown = _a.toggleDropdown, isOpen = _a.isOpen, activeItemColor = _a.activeItemColor, hoverItemColor = _a.hoverItemColor, setActiveItem = _a.setActiveItem, isActive = _a.isActive;
    if (item.subItems) {
        return (react_1.default.createElement("div", { className: "relative group h-full flex items-center", ref: function (el) {
                if (el)
                    navRefs.current[item.href] = el;
            }, onClick: function () { return toggleDropdown(item.href); } },
            react_1.default.createElement("button", { className: "h-full px-3 flex items-center ".concat(isActive ? activeItemColor : hoverItemColor) },
                item.icon && react_1.default.createElement(item.icon, { className: "mr-2" }),
                item.name,
                react_1.default.createElement(framer_motion_1.motion.svg, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-5 h-5 ml-1", animate: { rotate: isOpen ? 180 : 0 }, transition: { duration: 0.2 } },
                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z", clipRule: "evenodd" }))),
            react_1.default.createElement(framer_motion_1.AnimatePresence, null, isOpen && (react_1.default.createElement(framer_motion_1.motion.ul, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2 }, className: "absolute left-0 top-full w-auto rounded-b-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" }, item.subItems.map(function (subItem) { return (react_1.default.createElement("li", { key: subItem.href },
                react_1.default.createElement("a", { href: subItem.href, className: "block px-4 py-2 text-sm hover:bg-neutral-100 text-nowrap ".concat(hoverItemColor), onClick: function (e) {
                        e.stopPropagation();
                        toggleDropdown(item.href);
                        setActiveItem(subItem.href);
                    } },
                    subItem.icon && react_1.default.createElement(subItem.icon, { className: "mr-2 inline" }),
                    subItem.name))); }))))));
    }
    return (react_1.default.createElement("a", { href: item.href, className: "h-full flex items-center px-3 ".concat(isActive ? activeItemColor : hoverItemColor), ref: function (el) {
            if (el)
                navRefs.current[item.href] = el;
        }, onClick: function () { return setActiveItem(item.href); } },
        item.icon && react_1.default.createElement(item.icon, { className: "mr-2" }),
        item.name));
};
var MobileNavItem = function (_a) {
    var item = _a.item, toggleMobileMenu = _a.toggleMobileMenu, toggleDropdown = _a.toggleDropdown, isOpen = _a.isOpen, activeItemColor = _a.activeItemColor, hoverItemColor = _a.hoverItemColor, isActive = _a.isActive;
    if (item.subItems) {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("button", { className: "w-full text-left px-3 py-2 rounded-md text-base font-medium ".concat(isActive ? activeItemColor : hoverItemColor, " flex items-center justify-between"), onClick: function () { return toggleDropdown(item.href); } },
                react_1.default.createElement("span", { className: "flex items-center" },
                    item.icon && react_1.default.createElement(item.icon, { className: "mr-2" }),
                    item.name),
                react_1.default.createElement(framer_motion_1.motion.svg, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "w-5 h-5", animate: { rotate: isOpen ? 180 : 0 }, transition: { duration: 0.2 } },
                    react_1.default.createElement("path", { fillRule: "evenodd", d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z", clipRule: "evenodd" }))),
            react_1.default.createElement(framer_motion_1.AnimatePresence, null, isOpen && (react_1.default.createElement(framer_motion_1.motion.ul, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.2 }, className: "pl-4" }, item.subItems.map(function (subItem) { return (react_1.default.createElement("li", { key: subItem.href },
                react_1.default.createElement("a", { href: subItem.href, className: "block px-3 py-2 rounded-md text-sm hover:bg-neutral-100 text-nowrap ".concat(hoverItemColor), onClick: function () {
                        toggleDropdown(item.href);
                        toggleMobileMenu();
                    } },
                    subItem.icon && react_1.default.createElement(subItem.icon, { className: "mr-2 inline" }),
                    subItem.name))); }))))));
    }
    return (react_1.default.createElement("a", { href: item.href, className: "block px-3 py-2 rounded-md text-base font-medium ".concat(isActive ? activeItemColor : hoverItemColor), onClick: toggleMobileMenu },
        item.icon && react_1.default.createElement(item.icon, { className: "mr-2 inline" }),
        item.name));
};
exports.default = Navbar;

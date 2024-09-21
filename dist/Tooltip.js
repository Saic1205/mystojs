"use strict";
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
var Tooltip = function (_a) {
    var children = _a.children, tooltipContent = _a.tooltipContent, backgroundColor = _a.backgroundColor, textColor = _a.textColor, useSpringEffect = _a.useSpringEffect;
    var _b = (0, react_1.useState)(false), showTooltip = _b[0], setShowTooltip = _b[1];
    var contentRef = (0, react_1.useRef)(null);
    var smoothTooltipX = (0, framer_motion_1.useSpring)(0, { damping: 20, stiffness: 300 });
    var smoothTooltipY = (0, framer_motion_1.useSpring)(0, { damping: 20, stiffness: 300 });
    var _c = (0, react_1.useState)({ x: 0, y: 0 }), position = _c[0], setPosition = _c[1];
    var handleMouseMove = function (e) {
        if (contentRef.current) {
            var rect = contentRef.current.getBoundingClientRect();
            var x = e.clientX - rect.left + 10;
            var y = e.clientY - rect.top + 10;
            if (useSpringEffect) {
                smoothTooltipX.set(x);
                smoothTooltipY.set(y);
            }
            else {
                setPosition({ x: x, y: y });
            }
        }
    };
    var handleMouseEnter = function () {
        setShowTooltip(true);
    };
    var handleMouseLeave = function () {
        setShowTooltip(false);
    };
    return (react_1.default.createElement("div", { ref: contentRef, className: "relative", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onMouseMove: handleMouseMove },
        children,
        react_1.default.createElement(framer_motion_1.AnimatePresence, null, showTooltip && (react_1.default.createElement(framer_motion_1.motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "".concat(backgroundColor, " ").concat(textColor, " absolute px-4 py-2 rounded-full text-sm sm:text-base font-semibold pointer-events-none z-50 w-min text-nowrap"), style: useSpringEffect
                ? {
                    left: smoothTooltipX,
                    top: smoothTooltipY,
                }
                : {
                    left: position.x,
                    top: position.y,
                } }, tooltipContent)))));
};
exports.default = Tooltip;
//# sourceMappingURL=Tooltip.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomColorPicker = RandomColorPicker;
function RandomColorPicker() {
    const colors = [
        { hex: "#FF5733" },
        { hex: "#FFC300" },
        { hex: "#33A1FF" },
        { hex: "#2E8B57" },
    ];
    const randNum = Math.floor(Math.random() * colors.length);
    return colors[randNum];
}

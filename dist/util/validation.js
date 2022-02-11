"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePosition = void 0;
function validatePosition(position) {
    if (position === "GK" ||
        position === "CD" ||
        position === "CDo" ||
        position === "CDtW" ||
        position === "CAsp" ||
        position === "WB" ||
        position === "WBo" ||
        position === "WBd" ||
        position === "WBtM" ||
        position === "SPt" ||
        position === "IM" ||
        position === "IMtW" ||
        position === "DIM" ||
        position === "PDIM" ||
        position === "IMo" ||
        position === "W" ||
        position === "Woff" ||
        position === "Wdef" ||
        position === "WtM" ||
        position === "F" ||
        position === "FtW" ||
        position === "TDF" ||
        position === "PNF" ||
        position === "lol") {
        return true;
    }
    else {
        return false;
    }
}
exports.validatePosition = validatePosition;

"use strict";
/**
 * Converts an object into a query param string.
 *
 * Array values are spread out into separate params with "[]" appended to the key, e.g.
 *  { items: [1, 2] } would become "items[]=1&items[]=2".
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatUrlParams = void 0;
var formatUrlParams = function (params) {
    var replaceSpaces = function (value) {
        var safeString = value.split(' ').join('+');
        return safeString;
    };
    var paramList = Object.entries(params)
        .filter(function (_a) {
        var _ = _a[0], value = _a[1];
        return value != null;
    })
        .flatMap(function (_a) {
        var key = _a[0], value = _a[1];
        return Array.isArray(value)
            ? value.map(function (arrayElement) { return "".concat(key, "[]=").concat(arrayElement); })
            : typeof value === "string"
                ? ["".concat(key, "=").concat(replaceSpaces(value))]
                : ["".concat(key, "=").concat(value)];
    });
    if (paramList.length === 0) {
        return "";
    }
    return "?&" + paramList.join("&");
};
exports.formatUrlParams = formatUrlParams;

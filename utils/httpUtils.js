"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromRails = exports.fetchFromNextGen = exports.shouldReadFromNextGen = exports.getFeatureFlagsFromRequest = exports.notFound = exports.postWithCSRF = exports.get = void 0;
var node_fetch_1 = require("node-fetch");
var enrichToken_1 = require("./enrichToken");
var queryFormatUtils_1 = require("./queryFormatUtils");
var get = function (_a) {
    var url = _a.url, args = _a.args, context = _a.context, serviceType = _a.serviceType, fullResponse = _a.fullResponse, customQuery = _a.customQuery;
    return __awaiter(void 0, void 0, void 0, function () {
        var nextGenEnabled, shouldQueryNextGen, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, exports.shouldReadFromNextGen)(context)];
                case 1:
                    nextGenEnabled = _b.sent();
                    shouldQueryNextGen = nextGenEnabled && serviceType;
                    if (shouldQueryNextGen) {
                        return [2 /*return*/, (0, exports.fetchFromNextGen)({
                                args: args,
                                context: context,
                                serviceType: serviceType,
                                fullResponse: fullResponse,
                                customQuery: customQuery,
                            })];
                    }
                    else {
                        if (!url) {
                            console.error("You must pass a url to call rails. If you meant to call NextGen, set the serviceType. url: ".concat(url, ", serviceType: ").concat(serviceType));
                            throw new Error("You must pass a url to call rails. If you meant to call NextGen, set the serviceType. url: ".concat(url, ", serviceType: ").concat(serviceType));
                        }
                        return [2 /*return*/, (0, exports.getFromRails)({ url: url, args: args, context: context, fullResponse: fullResponse })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    return [2 /*return*/, Promise.reject(e_1.response)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.get = get;
var postWithCSRF = function (_a) {
    var url = _a.url, body = _a.body, args = _a.args, context = _a.context;
    return __awaiter(void 0, void 0, void 0, function () {
        var response, e_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1.default)(process.env.API_URL + url, {
                            method: "POST",
                            headers: {
                                Cookie: context.request.headers.get("cookie"),
                                "Content-Type": "application/json",
                                "X-CSRF-Token": (_b = args === null || args === void 0 ? void 0 : args.input) === null || _b === void 0 ? void 0 : _b.authenticityToken,
                            },
                            body: JSON.stringify(body),
                        })];
                case 1:
                    response = _c.sent();
                    checkForLogin(response === null || response === void 0 ? void 0 : response.url);
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _c.sent()];
                case 3:
                    e_2 = _c.sent();
                    return [2 /*return*/, Promise.reject(e_2.response ? e_2.response : e_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.postWithCSRF = postWithCSRF;
var notFound = function (message) {
    return Promise.reject({
        status: 404,
        message: message,
    });
};
exports.notFound = notFound;
var getFeatureFlagsFromRequest = function (context) {
    return context.request.headers.get("x-should-read-from-nextgen");
};
exports.getFeatureFlagsFromRequest = getFeatureFlagsFromRequest;
var shouldReadFromNextGen = function (context) { return __awaiter(void 0, void 0, void 0, function () {
    var shouldReadFromNextGen;
    return __generator(this, function (_a) {
        shouldReadFromNextGen = (0, exports.getFeatureFlagsFromRequest)(context);
        if (shouldReadFromNextGen === "true") {
            // if the header is set, return the value
            return [2 /*return*/, true];
        }
        return [2 /*return*/, false];
    });
}); };
exports.shouldReadFromNextGen = shouldReadFromNextGen;
var fetchFromNextGen = function (_a) {
    var args = _a.args, context = _a.context, serviceType = _a.serviceType, fullResponse = _a.fullResponse, customQuery = _a.customQuery, customVariables = _a.customVariables;
    return __awaiter(void 0, void 0, void 0, function () {
        var enrichedToken, baseUrl, formattedQuery, response, e_3;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, (0, enrichToken_1.getEnrichedToken)(context)];
                case 1:
                    enrichedToken = _c.sent();
                    baseUrl = serviceType === "workflows"
                        ? process.env.NEXTGEN_WORKFLOWS_URL
                        : process.env.NEXTGEN_ENTITIES_URL;
                    formattedQuery = customQuery
                        ? customQuery
                        : (0, queryFormatUtils_1.formatFedQueryForNextGen)(context.params.query);
                    console.log(formattedQuery);
                    return [4 /*yield*/, (0, node_fetch_1.default)("".concat(baseUrl, "/graphql"), {
                            method: "POST",
                            headers: {
                                Cookie: context.request.headers.get("cookie"),
                                "Content-Type": "application/json",
                                "X-CSRF-Token": (_b = args === null || args === void 0 ? void 0 : args.input) === null || _b === void 0 ? void 0 : _b.authenticityToken,
                                Authorization: "Bearer ".concat(enrichedToken),
                            },
                            body: JSON.stringify({
                                query: formattedQuery,
                                variables: customVariables !== null && customVariables !== void 0 ? customVariables : context.params.variables,
                            }),
                        })];
                case 2:
                    response = _c.sent();
                    if (!(fullResponse === true)) return [3 /*break*/, 3];
                    return [2 /*return*/, response];
                case 3: return [4 /*yield*/, response.json()];
                case 4: return [2 /*return*/, _c.sent()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_3 = _c.sent();
                    return [2 /*return*/, Promise.reject(e_3.response)];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.fetchFromNextGen = fetchFromNextGen;
var getFromRails = function (_a) {
    var url = _a.url, args = _a.args, context = _a.context, fullResponse = _a.fullResponse;
    return __awaiter(void 0, void 0, void 0, function () {
        var baseURL, urlPrefix, response, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    baseURL = process.env.API_URL;
                    urlPrefix = args.snapshotLinkId ? "/pub/".concat(args.snapshotLinkId) : "";
                    return [4 /*yield*/, (0, node_fetch_1.default)(baseURL + urlPrefix + url, {
                            method: "GET",
                            headers: {
                                Cookie: context.request.headers.get("cookie"),
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _b.sent();
                    if (!(fullResponse === true)) return [3 /*break*/, 2];
                    return [2 /*return*/, response];
                case 2: return [4 /*yield*/, response.json()];
                case 3: return [2 /*return*/, _b.sent()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    e_4 = _b.sent();
                    return [2 /*return*/, Promise.reject(e_4.response)];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.getFromRails = getFromRails;
var checkForLogin = function (responseUrl) {
    if (responseUrl === null || responseUrl === void 0 ? void 0 : responseUrl.includes("/auth0/refresh_token?mode=login")) {
        throw new Error("You must be logged in to perform this action.");
    }
};

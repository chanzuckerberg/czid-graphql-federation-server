"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRunFinalized = exports.parseRefFasta = exports.STARTED = exports.PENDING = exports.CREATED = exports.RUNNING = exports.ABORTED = exports.TIMED_OUT = exports.FAILED = exports.SUCCEEDED_WITH_ISSUE = exports.SUCCEEDED = void 0;
exports.SUCCEEDED = "SUCCEEDED";
exports.SUCCEEDED_WITH_ISSUE = "SUCCEEDED_WITH_ISSUE";
exports.FAILED = "FAILED";
exports.TIMED_OUT = "TIMED_OUT";
exports.ABORTED = "ABORTED";
exports.RUNNING = "RUNNING";
exports.CREATED = "CREATED";
exports.PENDING = "PENDING";
exports.STARTED = "STARTED";
var parseRefFasta = function (fullPath) {
    if (!fullPath) {
        return null;
    }
    var afterLastSlash = fullPath.split("/").pop();
    return afterLastSlash;
};
exports.parseRefFasta = parseRefFasta;
var isRunFinalized = function (status) {
    var finalizedStatuses = [exports.SUCCEEDED, exports.SUCCEEDED_WITH_ISSUE, exports.FAILED, exports.TIMED_OUT, exports.ABORTED];
    if (finalizedStatuses.includes(status)) {
        return true;
    }
    return false;
};
exports.isRunFinalized = isRunFinalized;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processWorkflowsAggregateResponse = void 0;
// combine the aggregate counts from rails and next gen into a single response
// that looks like a GraphQL aggregate query response
var processWorkflowsAggregateResponse = function (nextGenProjectAggregates, railsProjects, nextGenEnabled) {
    var _a, _b;
    var aggregates = {
        "aggregate": [],
    };
    var _loop_1 = function (project) {
        // TODO: enable more workflows coming from next gen
        var nextGenCgCount = ((_a = nextGenProjectAggregates === null || nextGenProjectAggregates === void 0 ? void 0 : nextGenProjectAggregates.find(function (aggregate) {
            var _a, _b, _c, _d;
            return ((_c = (_b = (_a = aggregate === null || aggregate === void 0 ? void 0 : aggregate.groupBy) === null || _a === void 0 ? void 0 : _a.workflowVersion) === null || _b === void 0 ? void 0 : _b.workflow) === null || _c === void 0 ? void 0 : _c.name) ===
                "consensus-genome" && ((_d = aggregate === null || aggregate === void 0 ? void 0 : aggregate.groupBy) === null || _d === void 0 ? void 0 : _d.collectionId) === project.id;
        })) === null || _a === void 0 ? void 0 : _a.count) || 0;
        var counts = {
            "short-read-mngs": project.sample_counts.mngs_runs_count,
            "consensus-genome": nextGenEnabled ? nextGenCgCount : project.sample_counts.cg_runs_count,
            "amr": project.sample_counts.amr_runs_count,
        };
        for (var _c = 0, _d = ["consensus-genome", "short-read-mngs", "amr"]; _c < _d.length; _c++) {
            var workflow = _d[_c];
            (_b = aggregates === null || aggregates === void 0 ? void 0 : aggregates.aggregate) === null || _b === void 0 ? void 0 : _b.push({
                "groupBy": {
                    "workflowVersion": {
                        "workflow": {
                            "name": workflow,
                        },
                    },
                    "collectionId": project.id,
                },
                "count": counts[workflow],
            });
        }
    };
    for (var _i = 0, railsProjects_1 = railsProjects; _i < railsProjects_1.length; _i++) {
        var project = railsProjects_1[_i];
        _loop_1(project);
    }
    return aggregates;
};
exports.processWorkflowsAggregateResponse = processWorkflowsAggregateResponse;

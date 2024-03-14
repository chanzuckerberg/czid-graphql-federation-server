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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var aggregateUtils_1 = require("./utils/aggregateUtils");
var httpUtils_1 = require("./utils/httpUtils");
var mngsWorkflowResultsUtils_1 = require("./utils/mngsWorkflowResultsUtils");
var paramsUtils_1 = require("./utils/paramsUtils");
var queryFormatUtils_1 = require("./utils/queryFormatUtils");
var responseHelperUtils_1 = require("./utils/responseHelperUtils");
/**
 * Arbitrary very large number used temporarily during Rails read phase to force Rails not to
 * paginate our fake "Workflows Service" call.
 */
var TEN_MILLION = 10000000;
exports.resolvers = {
    Query: {
        AmrWorkflowResults: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, quality_metrics, report_table_data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/workflow_runs/".concat(args.workflowRunId, "/results"),
                            args: args,
                            context: context,
                        })];
                    case 1:
                        _a = _b.sent(), quality_metrics = _a.quality_metrics, report_table_data = _a.report_table_data;
                        return [2 /*return*/, {
                                metric_amr: quality_metrics,
                                amr_hit: report_table_data,
                            }];
                }
            });
        }); },
        Background: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, other_backgrounds, owned_backgrounds, ret;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/backgrounds.json",
                            args: args,
                            context: context,
                        })];
                    case 1:
                        _a = _b.sent(), other_backgrounds = _a.other_backgrounds, owned_backgrounds = _a.owned_backgrounds;
                        ret = other_backgrounds.concat(owned_backgrounds);
                        return [2 /*return*/, ret.map(function (item) {
                                return __assign(__assign({}, item), { is_mass_normalized: item.mass_normalized });
                            }, [])];
                }
            });
        }); },
        fedBulkDownloads: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var statusDictionary, urlParams, getEntityInputInfo, res, mappedRes;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        statusDictionary = {
                            success: "SUCCEEDED",
                            error: "FAILED",
                            waiting: "PENDING",
                            running: "INPROGRESS",
                            //fyi: in NextGen there is also a status of STARTED
                        };
                        urlParams = (0, paramsUtils_1.formatUrlParams)({
                            searchBy: (_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.searchBy,
                            n: (_b = args === null || args === void 0 ? void 0 : args.input) === null || _b === void 0 ? void 0 : _b.limit,
                        });
                        getEntityInputInfo = function (entities) {
                            return entities.map(function (entity) {
                                return {
                                    id: entity === null || entity === void 0 ? void 0 : entity.id,
                                    name: entity === null || entity === void 0 ? void 0 : entity.sample_name,
                                };
                            });
                        };
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/bulk_downloads.json".concat(urlParams),
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _c.sent();
                        mappedRes = res.map(function (bulkDownload) { return __awaiter(void 0, void 0, void 0, function () {
                            var url, entityInputs, sampleNames, totalSamples, description, file_type_display, details, id, status, user_id, download_type, created_at, download_name, output_file_size, user_name, log_url, analysis_type, progress;
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                            return __generator(this, function (_k) {
                                switch (_k.label) {
                                    case 0:
                                        url = null;
                                        entityInputs = [];
                                        sampleNames = null;
                                        totalSamples = null;
                                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                                url: "/bulk_downloads/".concat(bulkDownload === null || bulkDownload === void 0 ? void 0 : bulkDownload.id, ".json"),
                                                args: args,
                                                context: context,
                                            })];
                                    case 1:
                                        details = _k.sent();
                                        if (bulkDownload.status === "success") {
                                            url = (_a = details === null || details === void 0 ? void 0 : details.bulk_download) === null || _a === void 0 ? void 0 : _a.presigned_output_url;
                                            entityInputs = __spreadArray(__spreadArray([], getEntityInputInfo((_b = details === null || details === void 0 ? void 0 : details.bulk_download) === null || _b === void 0 ? void 0 : _b.workflow_runs), true), getEntityInputInfo((_c = details === null || details === void 0 ? void 0 : details.bulk_download) === null || _c === void 0 ? void 0 : _c.pipeline_runs), true);
                                            sampleNames = new Set(entityInputs.map(function (entityInput) { return entityInput.name; }));
                                            totalSamples =
                                                (_g = (_f = (_e = (_d = details === null || details === void 0 ? void 0 : details.bulk_download) === null || _d === void 0 ? void 0 : _d.params) === null || _e === void 0 ? void 0 : _e.sample_ids) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.length;
                                        }
                                        description = (_h = details === null || details === void 0 ? void 0 : details.download_type) === null || _h === void 0 ? void 0 : _h.description;
                                        file_type_display = (_j = details === null || details === void 0 ? void 0 : details.download_type) === null || _j === void 0 ? void 0 : _j.file_type_display;
                                        id = bulkDownload.id, status = bulkDownload.status, user_id = bulkDownload.user_id, download_type = bulkDownload.download_type, created_at = bulkDownload.created_at, download_name = bulkDownload.download_name, output_file_size = bulkDownload.output_file_size, user_name = bulkDownload.user_name, log_url = bulkDownload.log_url, analysis_type = bulkDownload.analysis_type, progress = bulkDownload.progress;
                                        // In Next Gen we will have an array with all of the entity input
                                        // filtered through the nodes entity query to get the relevant info
                                        // If there are 22 Consensus Genome Files coming from 20 Samples, there will be 42 items in the array.
                                        // We will get `sampleNames` by checking __typename to see if the entity is a sample,
                                        // The amount of other items left in the array should be a the `analysisCount` and the analysis type will come from the file.entity.type
                                        // Some work will have to be done in the resolver here to surface the right information to the front end from NextGen
                                        return [2 /*return*/, {
                                                id: id,
                                                startedAt: created_at,
                                                status: statusDictionary[status],
                                                rawInputsJson: {
                                                    downloadType: download_type,
                                                    downloadDisplayName: download_name,
                                                    description: description,
                                                    fileFormat: file_type_display,
                                                },
                                                ownerUserId: user_id,
                                                file: {
                                                    size: output_file_size,
                                                    downloadLink: {
                                                        url: url,
                                                    },
                                                },
                                                sampleNames: sampleNames,
                                                analysisCount: entityInputs.length,
                                                entityInputFileType: analysis_type,
                                                entityInputs: entityInputs,
                                                toDelete: {
                                                    progress: progress,
                                                    user_name: user_name,
                                                    log_url: log_url,
                                                    totalSamples: totalSamples,
                                                    // dedupping by name isn't entirely reliable
                                                    // we will use this as the accurate number of samples until we switch to NextGen
                                                    // (then it can be the amount of Sample entitys in entityInputs on the workflowRun)
                                                },
                                            }];
                                }
                            });
                        }); });
                        return [2 /*return*/, mappedRes];
                }
            });
        }); },
        BulkDownloadCGOverview: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, downloadType, workflow, includeMetadata, workflowRunIds, workflowRunIdsStrings, workflowRunIdsNumbers, body, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(args === null || args === void 0 ? void 0 : args.input)) {
                            throw new Error("No input provided");
                        }
                        _a = args === null || args === void 0 ? void 0 : args.input, downloadType = _a.downloadType, workflow = _a.workflow, includeMetadata = _a.includeMetadata, workflowRunIds = _a.workflowRunIds, workflowRunIdsStrings = _a.workflowRunIdsStrings;
                        workflowRunIdsNumbers = workflowRunIdsStrings === null || workflowRunIdsStrings === void 0 ? void 0 : workflowRunIdsStrings.map(function (id) { return id && parseInt(id); });
                        body = {
                            download_type: downloadType,
                            workflow: workflow,
                            params: {
                                include_metadata: { value: includeMetadata },
                                sample_ids: {
                                    value: workflowRunIdsNumbers
                                        ? workflowRunIdsNumbers
                                        : workflowRunIds,
                                },
                                workflow: {
                                    value: workflow,
                                },
                            },
                            workflow_run_ids: workflowRunIds,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/bulk_downloads/consensus_genome_overview_data",
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _b.sent();
                        if (res === null || res === void 0 ? void 0 : res.cg_overview_rows) {
                            return [2 /*return*/, {
                                    cgOverviewRows: res === null || res === void 0 ? void 0 : res.cg_overview_rows,
                                }];
                        }
                        else {
                            throw new Error(res.error);
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        fedConsensusGenomes: function (root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var nextGenEnabled, ret, input, workflowRunId, data, coverage_viz, quality_metrics, taxon_info, _a, accession_id, accession_name, taxon_id, taxon_name, ret, workflow_runs;
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.shouldReadFromNextGen)(context)];
                    case 1:
                        nextGenEnabled = _u.sent();
                        if (!nextGenEnabled) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, httpUtils_1.get)({ args: args, context: context, serviceType: "entities" })];
                    case 2:
                        ret = _u.sent();
                        return [2 /*return*/, ret.data.consensusGenomes];
                    case 3:
                        input = args.input;
                        if (!((_c = (_b = input === null || input === void 0 ? void 0 : input.where) === null || _b === void 0 ? void 0 : _b.producingRunId) === null || _c === void 0 ? void 0 : _c._eq)) return [3 /*break*/, 5];
                        workflowRunId = (_e = (_d = input === null || input === void 0 ? void 0 : input.where) === null || _d === void 0 ? void 0 : _d.producingRunId) === null || _e === void 0 ? void 0 : _e._eq;
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/workflow_runs/".concat(workflowRunId, "/results"),
                                args: args,
                                context: context,
                            })];
                    case 4:
                        data = _u.sent();
                        coverage_viz = data.coverage_viz, quality_metrics = data.quality_metrics, taxon_info = data.taxon_info;
                        _a = taxon_info || {}, accession_id = _a.accession_id, accession_name = _a.accession_name, taxon_id = _a.taxon_id, taxon_name = _a.taxon_name;
                        ret = [
                            {
                                metrics: {
                                    coverageTotalLength: coverage_viz === null || coverage_viz === void 0 ? void 0 : coverage_viz.total_length,
                                    coverageDepth: coverage_viz === null || coverage_viz === void 0 ? void 0 : coverage_viz.coverage_depth,
                                    coverageBreadth: coverage_viz === null || coverage_viz === void 0 ? void 0 : coverage_viz.coverage_breadth,
                                    coverageBinSize: coverage_viz === null || coverage_viz === void 0 ? void 0 : coverage_viz.coverage_bin_size,
                                    coverageViz: coverage_viz === null || coverage_viz === void 0 ? void 0 : coverage_viz.coverage,
                                    gcPercent: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.gc_percent,
                                    percentGenomeCalled: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.percent_genome_called,
                                    percentIdentity: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.percent_identity,
                                    refSnps: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.ref_snps,
                                    nMissing: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.n_missing,
                                    nAmbiguous: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.n_ambiguous,
                                    nActg: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.n_actg,
                                    mappedReads: quality_metrics === null || quality_metrics === void 0 ? void 0 : quality_metrics.mapped_reads,
                                },
                                accession: {
                                    accessionId: accession_id,
                                    accessionName: accession_name,
                                },
                                taxon: {
                                    id: taxon_id === null || taxon_id === void 0 ? void 0 : taxon_id.toString(),
                                    commonName: taxon_name,
                                },
                            },
                        ];
                        return [2 /*return*/, ret];
                    case 5: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/workflow_runs.json" +
                                (0, paramsUtils_1.formatUrlParams)({
                                    // index.ts
                                    // const getWorkflowRuns = ({
                                    mode: "with_sample_info",
                                    //  - DiscoveryDataLayer.ts
                                    //    await this._collection.fetchDataCallback({
                                    domain: (_f = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _f === void 0 ? void 0 : _f.domain,
                                    //  -- DiscoveryView.tsx
                                    //     ...this.getConditions(workflow)
                                    projectId: (_g = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _g === void 0 ? void 0 : _g.projectId,
                                    search: (_h = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _h === void 0 ? void 0 : _h.search,
                                    orderBy: (_j = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _j === void 0 ? void 0 : _j.orderBy,
                                    orderDir: (_k = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _k === void 0 ? void 0 : _k.orderDir,
                                    //  --- DiscoveryView.tsx
                                    //      filters: {
                                    host: (_l = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _l === void 0 ? void 0 : _l.host,
                                    locationV2: (_m = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _m === void 0 ? void 0 : _m.locationV2,
                                    taxon: (_o = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _o === void 0 ? void 0 : _o.taxons,
                                    taxaLevels: (_p = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _p === void 0 ? void 0 : _p.taxaLevels,
                                    time: (_q = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _q === void 0 ? void 0 : _q.time,
                                    tissue: (_r = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _r === void 0 ? void 0 : _r.tissue,
                                    visibility: (_s = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _s === void 0 ? void 0 : _s.visibility,
                                    workflow: (_t = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _t === void 0 ? void 0 : _t.workflow,
                                    //  - DiscoveryDataLayer.ts
                                    //    await this._collection.fetchDataCallback({
                                    limit: input === null || input === void 0 ? void 0 : input.limit,
                                    offset: input === null || input === void 0 ? void 0 : input.offset,
                                    listAllIds: false,
                                }),
                            args: args,
                            context: context,
                        })];
                    case 6:
                        workflow_runs = (_u.sent()).workflow_runs;
                        if (!(workflow_runs === null || workflow_runs === void 0 ? void 0 : workflow_runs.length)) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, workflow_runs.map(function (run) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                                var inputs = run.inputs;
                                var qualityMetrics = (_a = run.cached_results) === null || _a === void 0 ? void 0 : _a.quality_metrics;
                                var sample = run.sample;
                                var sampleInfo = sample === null || sample === void 0 ? void 0 : sample.info;
                                var sampleMetadata = sample === null || sample === void 0 ? void 0 : sample.metadata;
                                var taxon = (inputs === null || inputs === void 0 ? void 0 : inputs.taxon_name) != null
                                    ? {
                                        name: inputs.taxon_name,
                                    }
                                    : null;
                                var accession = (inputs === null || inputs === void 0 ? void 0 : inputs.accession_id) != null && (inputs === null || inputs === void 0 ? void 0 : inputs.accession_name) != null
                                    ? {
                                        accessionId: inputs === null || inputs === void 0 ? void 0 : inputs.accession_id,
                                        accessionName: inputs === null || inputs === void 0 ? void 0 : inputs.accession_name,
                                    }
                                    : null;
                                return {
                                    producingRunId: (_b = run.id) === null || _b === void 0 ? void 0 : _b.toString(),
                                    taxon: taxon,
                                    accession: accession,
                                    metrics: {
                                        coverageDepth: (_d = (_c = run.cached_results) === null || _c === void 0 ? void 0 : _c.coverage_viz) === null || _d === void 0 ? void 0 : _d.coverage_depth,
                                        totalReads: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.total_reads,
                                        gcPercent: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.gc_percent,
                                        refSnps: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.ref_snps,
                                        percentIdentity: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.percent_identity,
                                        nActg: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.n_actg,
                                        percentGenomeCalled: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.percent_genome_called,
                                        nMissing: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.n_missing,
                                        nAmbiguous: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.n_ambiguous,
                                        referenceGenomeLength: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.reference_genome_length,
                                    },
                                    sequencingRead: {
                                        nucleicAcid: (_e = sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.nucleotide_type) !== null && _e !== void 0 ? _e : "",
                                        protocol: inputs === null || inputs === void 0 ? void 0 : inputs.wetlab_protocol,
                                        medakaModel: inputs === null || inputs === void 0 ? void 0 : inputs.medaka_model,
                                        technology: (_f = inputs === null || inputs === void 0 ? void 0 : inputs.technology) !== null && _f !== void 0 ? _f : "",
                                        taxon: taxon,
                                        sample: {
                                            railsSampleId: sample === null || sample === void 0 ? void 0 : sample.id,
                                            name: (_g = sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.name) !== null && _g !== void 0 ? _g : "",
                                            notes: sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.sample_notes,
                                            uploadError: sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.result_status_description,
                                            collectionLocation: typeof (sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.collection_location_v2) === "string"
                                                ? sampleMetadata.collection_location_v2
                                                : (_j = (_h = sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.collection_location_v2) === null || _h === void 0 ? void 0 : _h.name) !== null && _j !== void 0 ? _j : "",
                                            sampleType: (_k = sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.sample_type) !== null && _k !== void 0 ? _k : "",
                                            waterControl: (sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.water_control) === "Yes",
                                            hostOrganism: (sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.host_genome_name) != null
                                                ? {
                                                    name: sampleInfo.host_genome_name,
                                                }
                                                : null,
                                            collection: {
                                                name: sample === null || sample === void 0 ? void 0 : sample.project_name,
                                                public: Boolean(sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.public),
                                            },
                                            ownerUserId: (_l = sample === null || sample === void 0 ? void 0 : sample.uploader) === null || _l === void 0 ? void 0 : _l.id,
                                            // TODO: Make runner come from Workflows stitched with the user service when NextGen
                                            // ready.
                                            ownerUserName: (_o = (_m = run.runner) === null || _m === void 0 ? void 0 : _m.name) !== null && _o !== void 0 ? _o : (_p = sample === null || sample === void 0 ? void 0 : sample.uploader) === null || _p === void 0 ? void 0 : _p.name,
                                            metadatas: {
                                                edges: getMetadataEdges(sampleMetadata),
                                            },
                                        },
                                    },
                                };
                            })];
                }
            });
        }); },
        ConsensusGenomeWorkflowResults: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, coverage_viz, quality_metrics, taxon_info, _b, accession_id, accession_name, taxon_id, taxon_name;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/workflow_runs/".concat(args.workflowRunId, "/results"),
                            args: args,
                            context: context,
                        })];
                    case 1:
                        _a = _c.sent(), coverage_viz = _a.coverage_viz, quality_metrics = _a.quality_metrics, taxon_info = _a.taxon_info;
                        _b = taxon_info || {}, accession_id = _b.accession_id, accession_name = _b.accession_name, taxon_id = _b.taxon_id, taxon_name = _b.taxon_name;
                        return [2 /*return*/, {
                                metric_consensus_genome: __assign(__assign({}, quality_metrics), { coverage_viz: coverage_viz }),
                                reference_genome: {
                                    accession_id: accession_id,
                                    accession_name: accession_name,
                                    taxon: {
                                        id: taxon_id === null || taxon_id === void 0 ? void 0 : taxon_id.toString(),
                                        name: taxon_name,
                                    },
                                },
                            }];
                }
            });
        }); },
        CoverageVizSummary: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var coverage_viz_summary, return_obj, key, _i, _a, accension;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/samples/".concat(args.sampleId, "/coverage_viz_summary"),
                            args: args,
                            context: context,
                        })];
                    case 1:
                        coverage_viz_summary = _b.sent();
                        return_obj = [];
                        for (key in coverage_viz_summary) {
                            for (_i = 0, _a = coverage_viz_summary[key]["best_accessions"]; _i < _a.length; _i++) {
                                accension = _a[_i];
                                return_obj.push(__assign({ pipeline_id: key }, accension));
                            }
                        }
                        return [2 /*return*/, return_obj];
                }
            });
        }); },
        MetadataFields: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var body, res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            sampleIds: (_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.sampleIds,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/metadata_fields",
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        SampleMetadata: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var url, urlWithParams, res, metadata;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        url = "/samples/".concat(args.sampleId, "/metadata");
                        urlWithParams = ((_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.pipelineVersion)
                            ? url + "?pipeline_version=".concat((_b = args === null || args === void 0 ? void 0 : args.input) === null || _b === void 0 ? void 0 : _b.pipelineVersion)
                            : url;
                        return [4 /*yield*/, (0, httpUtils_1.get)({ url: urlWithParams, args: args, context: context })];
                    case 1:
                        res = _e.sent();
                        try {
                            metadata = res.metadata.map(function (item) {
                                item.id = item.id.toString();
                                return item;
                            });
                            if ((_d = (_c = res === null || res === void 0 ? void 0 : res.additional_info) === null || _c === void 0 ? void 0 : _c.pipeline_run) === null || _d === void 0 ? void 0 : _d.id) {
                                res.additional_info.pipeline_run.id =
                                    res.additional_info.pipeline_run.id.toString();
                            }
                            // location_validated_value is a union type, so we need to add __typename to the object
                            metadata.map(function (field) {
                                if (typeof field.location_validated_value === "object") {
                                    field.location_validated_value = __assign(__assign({ __typename: "query_SampleMetadata_metadata_items_location_validated_value_oneOf_1" }, field.location_validated_value), { id: field.location_validated_value.id.toString() });
                                }
                                else if (typeof field.location_validated_value === "string") {
                                    field.location_validated_value = {
                                        __typename: "query_SampleMetadata_metadata_items_location_validated_value_oneOf_0",
                                        name: field.location_validated_value,
                                    };
                                }
                                else {
                                    field.location_validated_value = null;
                                }
                            });
                            res.metadata = metadata;
                            return [2 /*return*/, res];
                        }
                        catch (_f) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        SampleForReport: function (root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var sampleInfo, updatedPipelineRuns, updatedWorkflowRuns, nextGenEnabled, entitiesQuery, entitiesResp, nextGenSampleId, workflowsQuery, workflowsResp, consensusGenomes, workflowsWorkflowRuns, nextGenWorkflowRuns, dedupedWorkflowRuns, _loop_1, _i, _a, railsWorkflowRun;
            var _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.getFromRails)({
                            url: "/samples/".concat(args.railsSampleId, ".json"),
                            args: args,
                            context: context,
                        })];
                    case 1:
                        sampleInfo = _e.sent();
                        // Make output acceptable to Relay - convert ids to strings
                        if (sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.pipeline_runs) {
                            updatedPipelineRuns = sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.pipeline_runs.map(function (pipelineRun) {
                                return __assign(__assign({}, pipelineRun), { id: pipelineRun.id.toString() });
                            });
                            sampleInfo.pipeline_runs = updatedPipelineRuns;
                        }
                        if (sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.default_pipeline_run_id) {
                            sampleInfo.default_pipeline_run_id =
                                sampleInfo.default_pipeline_run_id.toString();
                        }
                        if (sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.workflow_runs) {
                            updatedWorkflowRuns = sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.workflow_runs.map(function (workflowRun) {
                                return __assign(__assign({}, workflowRun), { id: workflowRun.id.toString() });
                            });
                            sampleInfo.workflow_runs = updatedWorkflowRuns;
                        }
                        if (sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.project) {
                            sampleInfo.project.id = sampleInfo.project.id.toString();
                        }
                        return [4 /*yield*/, (0, httpUtils_1.shouldReadFromNextGen)(context)];
                    case 2:
                        nextGenEnabled = _e.sent();
                        /* --------------------- Rails --------------------- */
                        if (!nextGenEnabled) {
                            return [2 /*return*/, __assign({ id: args === null || args === void 0 ? void 0 : args.railsSampleId, railsSampleId: args.railsSampleId }, sampleInfo)];
                        }
                        entitiesQuery = "\n          query EntitiesQuery {\n            samples(where: {railsSampleId: {_eq: ".concat(args.railsSampleId, "}}) {\n              id\n              sequencingReads {\n                edges {\n                  node {\n                    consensusGenomes {\n                      edges {\n                        node {\n                          id\n                          createdAt\n                          producingRunId\n                          referenceGenome {\n                            id\n                            file {\n                              path\n                            }\n                          }\n                          accession {\n                            accessionId\n                            accessionName\n                          }\n                          taxon {\n                            id\n                            name\n                          }\n                          sequencingRead {\n                            technology\n                          }\n                        }\n                      }\n                    }\n                    sample {\n                      hostOrganism {\n                        id\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          } \n        ");
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                args: args,
                                context: context,
                                serviceType: "entities",
                                customQuery: entitiesQuery,
                            })];
                    case 3:
                        entitiesResp = _e.sent();
                        nextGenSampleId = (_c = (_b = entitiesResp === null || entitiesResp === void 0 ? void 0 : entitiesResp.data.samples) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.id;
                        if (!nextGenSampleId) {
                            console.log("No NextGenSampleId found for railsSampleId: ".concat(args.railsSampleId));
                            return [2 /*return*/, __assign({ id: args.railsSampleId, railsSampleId: args.railsSampleId }, sampleInfo)];
                        }
                        workflowsQuery = "\n          query WorkflowsQuery {\n            workflowRuns(where: {entityInputs: {inputEntityId: {_eq: \"".concat(nextGenSampleId, "\"}}}) {\n              id\n              _id\n              railsWorkflowRunId\n              status\n              ownerUserId\n              errorMessage\n              workflowVersion {\n                version\n                id\n                workflow {\n                  name\n                }\n              }\n              createdAt\n              endedAt\n              rawInputsJson\n            }\n          }\n      ");
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                args: args,
                                context: context,
                                serviceType: "workflows",
                                customQuery: workflowsQuery,
                            })];
                    case 4:
                        workflowsResp = _e.sent();
                        consensusGenomes = entitiesResp.data.samples[0].sequencingReads.edges[0].node
                            .consensusGenomes.edges;
                        workflowsWorkflowRuns = ((_d = workflowsResp === null || workflowsResp === void 0 ? void 0 : workflowsResp.data) === null || _d === void 0 ? void 0 : _d.workflowRuns) || [];
                        nextGenWorkflowRuns = workflowsWorkflowRuns.map(function (workflowRun) {
                            var _a, _b, _c;
                            var consensusGenome = consensusGenomes.find(function (consensusGenome) {
                                return consensusGenome.node.producingRunId === workflowRun.id;
                            });
                            var _d = (consensusGenome === null || consensusGenome === void 0 ? void 0 : consensusGenome.node) || {}, accession = _d.accession, taxon = _d.taxon, sequencingRead = _d.sequencingRead;
                            var parsedRawInputsJson = JSON.parse(workflowRun.rawInputsJson);
                            // If !consensusGenome this is a workflow run that is in progress
                            return {
                                deprecated: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.deprecated_by,
                                executed_at: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.createdAt,
                                id: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.id,
                                input_error: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.errorMessage,
                                inputs: {
                                    accession_id: accession === null || accession === void 0 ? void 0 : accession.accessionId,
                                    accession_name: accession === null || accession === void 0 ? void 0 : accession.accessionName,
                                    creation_source: parsedRawInputsJson === null || parsedRawInputsJson === void 0 ? void 0 : parsedRawInputsJson.creation_source,
                                    ref_fasta: (0, responseHelperUtils_1.parseRefFasta)((_c = (_b = (_a = consensusGenome === null || consensusGenome === void 0 ? void 0 : consensusGenome.node) === null || _a === void 0 ? void 0 : _a.referenceGenome) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.path),
                                    taxon_id: taxon === null || taxon === void 0 ? void 0 : taxon.id,
                                    taxon_name: taxon === null || taxon === void 0 ? void 0 : taxon.name,
                                    technology: sequencingRead === null || sequencingRead === void 0 ? void 0 : sequencingRead.technology,
                                },
                                rails_workflow_run_id: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.railsWorkflowRunId,
                                run_finalized: (0, responseHelperUtils_1.isRunFinalized)(workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.status),
                                status: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.status,
                                wdl_version: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.workflowVersion.version,
                                workflow: workflowRun === null || workflowRun === void 0 ? void 0 : workflowRun.workflowVersion.workflow.name,
                            };
                        });
                        dedupedWorkflowRuns = __spreadArray([], nextGenWorkflowRuns, true);
                        _loop_1 = function (railsWorkflowRun) {
                            var alreadyExists = nextGenWorkflowRuns.find(function (nextGenWorkflowRun) {
                                return nextGenWorkflowRun.rails_workflow_run_id.toString() ===
                                    railsWorkflowRun.id;
                            });
                            if (!alreadyExists) {
                                dedupedWorkflowRuns.push(railsWorkflowRun);
                            }
                        };
                        for (_i = 0, _a = sampleInfo.workflow_runs; _i < _a.length; _i++) {
                            railsWorkflowRun = _a[_i];
                            _loop_1(railsWorkflowRun);
                        }
                        return [2 /*return*/, __assign(__assign({ id: args.railsSampleId, railsSampleId: args.railsSampleId }, sampleInfo), { workflow_runs: dedupedWorkflowRuns })];
                }
            });
        }); },
        MngsWorkflowResults: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var data, pipelineRun, urlParams, _a, _all_tax_ids, metadata, counts, lineage, _sortedGenus, _highlightedTaxIds, taxonHits, taxonLineage;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/samples/".concat(args.sampleId, ".json"),
                            args: args,
                            context: context,
                        })];
                    case 1:
                        data = _c.sent();
                        pipelineRun = ((_b = data === null || data === void 0 ? void 0 : data.pipeline_runs) === null || _b === void 0 ? void 0 : _b[0]) || {};
                        urlParams = (0, paramsUtils_1.formatUrlParams)({
                            id: args.sampleId,
                            pipelineVersion: args.workflowVersionId,
                            background: args._backgroundId,
                            merge_nt_nr: false,
                        });
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/samples/".concat(args.sampleId, "/report_v2") + urlParams,
                                args: args,
                                context: context,
                            })];
                    case 2:
                        _a = (_c.sent()) || {}, _all_tax_ids = _a._all_tax_ids, metadata = _a.metadata, counts = _a.counts, lineage = _a.lineage, _sortedGenus = _a._sortedGenus, _highlightedTaxIds = _a._highlightedTaxIds;
                        taxonHits = (0, mngsWorkflowResultsUtils_1.formatTaxonHits)(counts);
                        taxonLineage = (0, mngsWorkflowResultsUtils_1.formatTaxonLineage)(lineage);
                        return [2 /*return*/, {
                                metric_mngs: {
                                    assembled: pipelineRun === null || pipelineRun === void 0 ? void 0 : pipelineRun.assembled,
                                    adjusted_remaining_reads: pipelineRun === null || pipelineRun === void 0 ? void 0 : pipelineRun.adjusted_remaining_reads,
                                    total_ercc_reads: pipelineRun === null || pipelineRun === void 0 ? void 0 : pipelineRun.total_ercc_reads,
                                    num_reads: metadata === null || metadata === void 0 ? void 0 : metadata.preSubsamplingCount,
                                    num_reads_after_subsampling: metadata === null || metadata === void 0 ? void 0 : metadata.postSubsamplingCount,
                                    fed_has_byteranges: metadata === null || metadata === void 0 ? void 0 : metadata.hasByteRanges,
                                },
                                taxon_hit_results: {
                                    taxon_hits: taxonHits,
                                },
                                // Computed by PipelineReportService
                                fed_lineage: taxonLineage,
                            }];
                }
            });
        }); },
        Pathogens: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var urlParams, _a, _all_tax_ids, _metadata, counts, _lineage, _sortedGenus, _highlightedTaxIds, speciesCounts, genusCounts, taxonCounts, pathogens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlParams = (0, paramsUtils_1.formatUrlParams)({
                            id: args.sampleId,
                            pipelineVersion: args.workflowVersionId,
                            merge_nt_nr: false,
                        });
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/samples/".concat(args.sampleId, "/report_v2") + urlParams,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        _a = (_b.sent()) || {}, _all_tax_ids = _a._all_tax_ids, _metadata = _a._metadata, counts = _a.counts, _lineage = _a._lineage, _sortedGenus = _a._sortedGenus, _highlightedTaxIds = _a._highlightedTaxIds;
                        speciesCounts = (counts === null || counts === void 0 ? void 0 : counts["1"]) || {};
                        genusCounts = (counts === null || counts === void 0 ? void 0 : counts["2"]) || {};
                        taxonCounts = Object.entries(__assign(__assign({}, speciesCounts), genusCounts));
                        pathogens = [];
                        taxonCounts.forEach(function (_a) {
                            var taxId = _a[0], taxInfo = _a[1];
                            var isPathogen = !!(taxInfo === null || taxInfo === void 0 ? void 0 : taxInfo.pathogenFlag);
                            if (isPathogen) {
                                pathogens.push({
                                    tax_id: parseInt(taxId),
                                });
                            }
                        });
                        return [2 /*return*/, pathogens];
                }
            });
        }); },
        /** Returns just the sample IDs (and old Rails IDs) to determine which IDs pass the filters. */
        fedSamples: function (root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var input, workflow_runs;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        input = args.input;
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/workflow_runs.json" +
                                    (0, paramsUtils_1.formatUrlParams)({
                                        // index.ts
                                        // const getWorkflowRuns = ({
                                        mode: "basic",
                                        //  - DiscoveryDataLayer.ts
                                        //    await this._collection.fetchDataCallback({
                                        domain: (_a = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _a === void 0 ? void 0 : _a.domain,
                                        //  -- DiscoveryView.tsx
                                        //     ...this.getConditions(workflow)
                                        projectId: (_b = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _b === void 0 ? void 0 : _b.projectId,
                                        search: (_d = (_c = input === null || input === void 0 ? void 0 : input.where) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d._like,
                                        orderBy: (_e = input === null || input === void 0 ? void 0 : input.orderBy) === null || _e === void 0 ? void 0 : _e.key,
                                        orderDir: (_f = input === null || input === void 0 ? void 0 : input.orderBy) === null || _f === void 0 ? void 0 : _f.dir,
                                        //  --- DiscoveryView.tsx
                                        //      filters: {
                                        host: (_j = (_h = (_g = input === null || input === void 0 ? void 0 : input.where) === null || _g === void 0 ? void 0 : _g.hostOrganism) === null || _h === void 0 ? void 0 : _h.name) === null || _j === void 0 ? void 0 : _j._in,
                                        locationV2: (_l = (_k = input === null || input === void 0 ? void 0 : input.where) === null || _k === void 0 ? void 0 : _k.collectionLocation) === null || _l === void 0 ? void 0 : _l._in,
                                        taxon: (_m = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _m === void 0 ? void 0 : _m.taxons,
                                        taxaLevels: (_o = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _o === void 0 ? void 0 : _o.taxaLevels,
                                        time: (_p = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _p === void 0 ? void 0 : _p.time,
                                        tissue: (_r = (_q = input === null || input === void 0 ? void 0 : input.where) === null || _q === void 0 ? void 0 : _q.sampleType) === null || _r === void 0 ? void 0 : _r._in,
                                        visibility: (_s = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _s === void 0 ? void 0 : _s.visibility,
                                        workflow: (_t = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _t === void 0 ? void 0 : _t.workflow,
                                        //  - DiscoveryDataLayer.ts
                                        //    await this._collection.fetchDataCallback({
                                        limit: (_u = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _u === void 0 ? void 0 : _u.limit,
                                        offset: (_v = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _v === void 0 ? void 0 : _v.offset,
                                        listAllIds: (_w = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _w === void 0 ? void 0 : _w.listAllIds,
                                    }),
                                args: args,
                                context: context,
                            })];
                    case 1:
                        workflow_runs = (_x.sent()).workflow_runs;
                        if (!(workflow_runs === null || workflow_runs === void 0 ? void 0 : workflow_runs.length)) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, workflow_runs.map(function (run) {
                                var _a, _b, _c, _d, _e, _f;
                                return {
                                    id: (_c = (_b = (_a = run.sample) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.toString(),
                                    railsSampleId: (_f = (_e = (_d = run.sample) === null || _d === void 0 ? void 0 : _d.info) === null || _e === void 0 ? void 0 : _e.id) === null || _f === void 0 ? void 0 : _f.toString(),
                                };
                            })];
                }
            });
        }); },
        fedSequencingReads: function (root, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var input, nextGenEnabled, nextGenResponse, nextGenSequencingReads, railsSampleIds, railsSamplesById, _a, _i, nextGenSequencingReads_1, nextGenSequencingRead, nextGenSample, railsSample, railsMetadata, railsDbSample, workflow_runs, result, _loop_2, _b, workflow_runs_1, run;
            var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24;
            return __generator(this, function (_25) {
                switch (_25.label) {
                    case 0:
                        input = args.input;
                        if (input == null) {
                            throw new Error("fedSequencingReads input is nullish");
                        }
                        return [4 /*yield*/, (0, httpUtils_1.shouldReadFromNextGen)(context)];
                    case 1:
                        nextGenEnabled = _25.sent();
                        if (!nextGenEnabled) return [3 /*break*/, 6];
                        if (!/{\s*id\s*}/.test(context.params.query)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, httpUtils_1.fetchFromNextGen)({
                                customQuery: (0, queryFormatUtils_1.convertSequencingReadsQuery)(context.params.query),
                                customVariables: {
                                    where: input.where,
                                },
                                serviceType: "entities",
                                args: args,
                                context: context,
                            })];
                    case 2: return [2 /*return*/, (_25.sent()).data.sequencingReads];
                    case 3: return [4 /*yield*/, (0, httpUtils_1.fetchFromNextGen)({
                            customQuery: (0, queryFormatUtils_1.convertSequencingReadsQuery)(context.params.query),
                            customVariables: {
                                where: input.where,
                                // TODO: Migrate to array orderBy.
                                orderBy: (_c = (input.orderBy != null ? [input.orderBy] : undefined)) !== null && _c !== void 0 ? _c : input.orderByArray,
                                limitOffset: input.limitOffset,
                                producingRunIds: (_f = (_e = (_d = input.consensusGenomesInput) === null || _d === void 0 ? void 0 : _d.where) === null || _e === void 0 ? void 0 : _e.producingRunId) === null || _f === void 0 ? void 0 : _f._in,
                            },
                            serviceType: "entities",
                            args: args,
                            context: context,
                        })];
                    case 4:
                        nextGenResponse = _25.sent();
                        nextGenSequencingReads = (_g = nextGenResponse === null || nextGenResponse === void 0 ? void 0 : nextGenResponse.data) === null || _g === void 0 ? void 0 : _g.sequencingReads;
                        if (nextGenSequencingReads == null) {
                            throw new Error("NextGen sequencingReads query failed: ".concat(JSON.stringify(nextGenResponse)));
                        }
                        railsSampleIds = nextGenSequencingReads
                            .map(function (sequencingRead) { return sequencingRead.sample.railsSampleId; })
                            .filter(function (id) { return id != null; });
                        if (railsSampleIds.length === 0) {
                            return [2 /*return*/, []];
                        }
                        _a = Map.bind;
                        return [4 /*yield*/, (0, httpUtils_1.getFromRails)({
                                url: "/samples/index_v2.json" +
                                    (0, paramsUtils_1.formatUrlParams)({
                                        sampleIds: railsSampleIds,
                                        limit: TEN_MILLION,
                                        offset: 0,
                                        listAllIds: false,
                                    }),
                                args: args,
                                context: context,
                            })];
                    case 5:
                        railsSamplesById = new (_a.apply(Map, [void 0, (_25.sent()).samples.map(function (sample) { return [sample.id, sample]; })]))();
                        for (_i = 0, nextGenSequencingReads_1 = nextGenSequencingReads; _i < nextGenSequencingReads_1.length; _i++) {
                            nextGenSequencingRead = nextGenSequencingReads_1[_i];
                            nextGenSample = nextGenSequencingRead.sample;
                            railsSample = railsSamplesById.get(nextGenSample.railsSampleId);
                            if (nextGenSample === undefined || railsSample === undefined) {
                                continue;
                            }
                            railsMetadata = (_h = railsSample.details) === null || _h === void 0 ? void 0 : _h.metadata;
                            railsDbSample = (_j = railsSample.details) === null || _j === void 0 ? void 0 : _j.db_sample;
                            nextGenSequencingRead.nucleicAcid =
                                (_k = railsMetadata === null || railsMetadata === void 0 ? void 0 : railsMetadata.nucleotide_type) !== null && _k !== void 0 ? _k : "";
                            nextGenSample.collectionLocation =
                                (_l = railsMetadata === null || railsMetadata === void 0 ? void 0 : railsMetadata.collection_location_v2) !== null && _l !== void 0 ? _l : "";
                            nextGenSample.sampleType = (_m = railsMetadata === null || railsMetadata === void 0 ? void 0 : railsMetadata.sample_type) !== null && _m !== void 0 ? _m : "";
                            nextGenSample.waterControl = (railsMetadata === null || railsMetadata === void 0 ? void 0 : railsMetadata.water_control) === "Yes";
                            nextGenSample.notes = railsDbSample === null || railsDbSample === void 0 ? void 0 : railsDbSample.sample_notes;
                            nextGenSample.uploadError = railsDbSample === null || railsDbSample === void 0 ? void 0 : railsDbSample.upload_error;
                            nextGenSample.hostOrganism =
                                (railsDbSample === null || railsDbSample === void 0 ? void 0 : railsDbSample.host_genome_name) != null
                                    ? {
                                        name: railsDbSample.host_genome_name,
                                    }
                                    : null;
                            nextGenSample.ownerUserName = (_p = (_o = railsSample.details) === null || _o === void 0 ? void 0 : _o.uploader) === null || _p === void 0 ? void 0 : _p.name;
                            nextGenSample.collection = {
                                name: (_r = (_q = railsSample.details) === null || _q === void 0 ? void 0 : _q.derived_sample_output) === null || _r === void 0 ? void 0 : _r.project_name,
                                public: railsSample.public === 1,
                            };
                            nextGenSample.metadatas = {
                                edges: getMetadataEdges(railsMetadata),
                            };
                        }
                        return [2 /*return*/, nextGenSequencingReads];
                    case 6: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/workflow_runs.json" +
                                (0, paramsUtils_1.formatUrlParams)({
                                    // index.ts
                                    // const getWorkflowRuns = ({
                                    mode: "with_sample_info",
                                    //  - DiscoveryDataLayer.ts
                                    //    await this._collection.fetchDataCallback({
                                    domain: (_s = input.todoRemove) === null || _s === void 0 ? void 0 : _s.domain,
                                    //  -- DiscoveryView.tsx
                                    //     ...this.getConditions(workflow)
                                    projectId: (_t = input.todoRemove) === null || _t === void 0 ? void 0 : _t.projectId,
                                    search: (_u = input.todoRemove) === null || _u === void 0 ? void 0 : _u.search,
                                    orderBy: (_v = input.todoRemove) === null || _v === void 0 ? void 0 : _v.orderBy,
                                    orderDir: (_w = input.todoRemove) === null || _w === void 0 ? void 0 : _w.orderDir,
                                    //  --- DiscoveryView.tsx
                                    //      filters: {
                                    host: (_x = input.todoRemove) === null || _x === void 0 ? void 0 : _x.host,
                                    locationV2: (_y = input.todoRemove) === null || _y === void 0 ? void 0 : _y.locationV2,
                                    taxon: (_z = input.todoRemove) === null || _z === void 0 ? void 0 : _z.taxons,
                                    taxaLevels: (_0 = input.todoRemove) === null || _0 === void 0 ? void 0 : _0.taxaLevels,
                                    time: (_1 = input.todoRemove) === null || _1 === void 0 ? void 0 : _1.time,
                                    tissue: (_2 = input.todoRemove) === null || _2 === void 0 ? void 0 : _2.tissue,
                                    visibility: (_3 = input.todoRemove) === null || _3 === void 0 ? void 0 : _3.visibility,
                                    workflow: (_4 = input.todoRemove) === null || _4 === void 0 ? void 0 : _4.workflow,
                                    //  - DiscoveryDataLayer.ts
                                    //    await this._collection.fetchDataCallback({
                                    limit: (_5 = input.limit) !== null && _5 !== void 0 ? _5 : (_6 = input.limitOffset) === null || _6 === void 0 ? void 0 : _6.limit,
                                    offset: (_7 = input.offset) !== null && _7 !== void 0 ? _7 : (_8 = input.limitOffset) === null || _8 === void 0 ? void 0 : _8.offset,
                                    listAllIds: false,
                                }),
                            args: args,
                            context: context,
                        })];
                    case 7:
                        workflow_runs = (_25.sent()).workflow_runs;
                        if (!(workflow_runs === null || workflow_runs === void 0 ? void 0 : workflow_runs.length)) {
                            return [2 /*return*/, []];
                        }
                        result = [];
                        _loop_2 = function (run) {
                            var inputs = run.inputs;
                            var qualityMetrics = (_9 = run.cached_results) === null || _9 === void 0 ? void 0 : _9.quality_metrics;
                            var sample = run.sample;
                            var sampleInfo = sample === null || sample === void 0 ? void 0 : sample.info;
                            var sampleMetadata = sample === null || sample === void 0 ? void 0 : sample.metadata;
                            var id = (_11 = (_10 = sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.id) === null || _10 === void 0 ? void 0 : _10.toString()) !== null && _11 !== void 0 ? _11 : "";
                            var taxon = (inputs === null || inputs === void 0 ? void 0 : inputs.taxon_name) != null
                                ? {
                                    name: inputs.taxon_name,
                                }
                                : null;
                            var accession = (inputs === null || inputs === void 0 ? void 0 : inputs.accession_id) != null && (inputs === null || inputs === void 0 ? void 0 : inputs.accession_name) != null
                                ? {
                                    accessionId: inputs === null || inputs === void 0 ? void 0 : inputs.accession_id,
                                    accessionName: inputs === null || inputs === void 0 ? void 0 : inputs.accession_name,
                                }
                                : null;
                            var consensusGenomeEdge = {
                                node: {
                                    producingRunId: (_12 = run.id) === null || _12 === void 0 ? void 0 : _12.toString(),
                                    taxon: taxon,
                                    referenceGenome: accession,
                                    accession: accession,
                                    metrics: {
                                        coverageDepth: (_14 = (_13 = run.cached_results) === null || _13 === void 0 ? void 0 : _13.coverage_viz) === null || _14 === void 0 ? void 0 : _14.coverage_depth,
                                        totalReads: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.total_reads,
                                        gcPercent: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.gc_percent,
                                        refSnps: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.ref_snps,
                                        percentIdentity: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.percent_identity,
                                        nActg: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.n_actg,
                                        percentGenomeCalled: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.percent_genome_called,
                                        nMissing: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.n_missing,
                                        nAmbiguous: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.n_ambiguous,
                                        referenceGenomeLength: qualityMetrics === null || qualityMetrics === void 0 ? void 0 : qualityMetrics.reference_genome_length,
                                    },
                                },
                            };
                            var existingSequencingRead = result.find(function (sequencingRead) { return sequencingRead.id === id; });
                            if (existingSequencingRead !== undefined) {
                                existingSequencingRead.consensusGenomes.edges.push(consensusGenomeEdge);
                            }
                            else {
                                result.push({
                                    id: id,
                                    nucleicAcid: (_15 = sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.nucleotide_type) !== null && _15 !== void 0 ? _15 : "",
                                    protocol: inputs === null || inputs === void 0 ? void 0 : inputs.wetlab_protocol,
                                    medakaModel: inputs === null || inputs === void 0 ? void 0 : inputs.medaka_model,
                                    technology: (_16 = inputs === null || inputs === void 0 ? void 0 : inputs.technology) !== null && _16 !== void 0 ? _16 : "",
                                    taxon: taxon,
                                    sample: {
                                        railsSampleId: sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.id,
                                        name: (_17 = sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.name) !== null && _17 !== void 0 ? _17 : "",
                                        notes: sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.sample_notes,
                                        uploadError: sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.result_status_description,
                                        collectionLocation: typeof (sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.collection_location_v2) === "string"
                                            ? sampleMetadata.collection_location_v2
                                            : (_19 = (_18 = sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.collection_location_v2) === null || _18 === void 0 ? void 0 : _18.name) !== null && _19 !== void 0 ? _19 : "",
                                        sampleType: (_20 = sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.sample_type) !== null && _20 !== void 0 ? _20 : "",
                                        waterControl: (sampleMetadata === null || sampleMetadata === void 0 ? void 0 : sampleMetadata.water_control) === "Yes",
                                        hostOrganism: (sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.host_genome_name) != null
                                            ? {
                                                name: sampleInfo.host_genome_name,
                                            }
                                            : null,
                                        collection: {
                                            name: sample === null || sample === void 0 ? void 0 : sample.project_name,
                                            public: Boolean(sampleInfo === null || sampleInfo === void 0 ? void 0 : sampleInfo.public),
                                        },
                                        ownerUserId: (_21 = sample === null || sample === void 0 ? void 0 : sample.uploader) === null || _21 === void 0 ? void 0 : _21.id,
                                        // TODO: Make runner come from Workflows stitched with the user service when NextGen
                                        // ready.
                                        ownerUserName: (_23 = (_22 = run.runner) === null || _22 === void 0 ? void 0 : _22.name) !== null && _23 !== void 0 ? _23 : (_24 = sample === null || sample === void 0 ? void 0 : sample.uploader) === null || _24 === void 0 ? void 0 : _24.name,
                                        metadatas: {
                                            edges: getMetadataEdges(sampleMetadata),
                                        },
                                    },
                                    consensusGenomes: {
                                        edges: [consensusGenomeEdge],
                                    },
                                });
                            }
                        };
                        for (_b = 0, workflow_runs_1 = workflow_runs; _b < workflow_runs_1.length; _b++) {
                            run = workflow_runs_1[_b];
                            _loop_2(run);
                        }
                        return [2 /*return*/, result];
                }
            });
        }); },
        ValidateUserCanDeleteObjects: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, selectedIdsStrings, workflow, selectedIds, body, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(args === null || args === void 0 ? void 0 : args.input)) {
                            throw new Error("No input provided");
                        }
                        _a = args === null || args === void 0 ? void 0 : args.input, selectedIdsStrings = _a.selectedIdsStrings, workflow = _a.workflow, selectedIds = _a.selectedIds;
                        body = {
                            selectedIds: selectedIdsStrings !== null && selectedIdsStrings !== void 0 ? selectedIdsStrings : selectedIds,
                            workflow: workflow,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/validate_user_can_delete_objects.json",
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        Taxons: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var urlParams, _a, all_tax_ids, _metadata, counts, lineage, _sortedGenus, _highlightedTaxIds, speciesCounts, genusCounts, taxonCounts, taxons;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        urlParams = (0, paramsUtils_1.formatUrlParams)({
                            id: args.sampleId,
                            pipelineVersion: args.workflowVersionId,
                            merge_nt_nr: false,
                        });
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/samples/".concat(args.sampleId, "/report_v2") + urlParams,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        _a = (_b.sent()) || {}, all_tax_ids = _a.all_tax_ids, _metadata = _a._metadata, counts = _a.counts, lineage = _a.lineage, _sortedGenus = _a._sortedGenus, _highlightedTaxIds = _a._highlightedTaxIds;
                        speciesCounts = (counts === null || counts === void 0 ? void 0 : counts["1"]) || {};
                        genusCounts = (counts === null || counts === void 0 ? void 0 : counts["2"]) || {};
                        taxonCounts = Object.entries(__assign(__assign({}, speciesCounts), genusCounts));
                        taxons = [];
                        taxonCounts.forEach(function (_a) {
                            var taxId = _a[0], taxInfo = _a[1];
                            taxons.push({
                                tax_id: parseInt(taxId),
                                tax_id_genus: taxInfo === null || taxInfo === void 0 ? void 0 : taxInfo.genus_tax_id,
                                common_name: taxInfo === null || taxInfo === void 0 ? void 0 : taxInfo.common_name,
                                name: taxInfo === null || taxInfo === void 0 ? void 0 : taxInfo.name,
                                is_phage: taxInfo === null || taxInfo === void 0 ? void 0 : taxInfo.is_phage,
                                level: speciesCounts.hasOwnProperty(taxId) ? "species" : "genus",
                                // Computed from TaxonLineage::CATEGORIES
                                fed_category: taxInfo === null || taxInfo === void 0 ? void 0 : taxInfo.category,
                            });
                        });
                        return [2 /*return*/, taxons];
                }
            });
        }); },
        UserBlastAnnotations: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var urlParams, counts, speciesCounts, genusCounts, taxonCounts, annotations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        urlParams = (0, paramsUtils_1.formatUrlParams)({
                            id: args.sampleId,
                            pipelineVersion: args.workflowVersionId,
                            merge_nt_nr: false,
                        });
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/samples/".concat(args.sampleId, "/report_v2") + urlParams,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        counts = ((_a.sent()) || {}).counts;
                        speciesCounts = (counts === null || counts === void 0 ? void 0 : counts["1"]) || {};
                        genusCounts = (counts === null || counts === void 0 ? void 0 : counts["2"]) || {};
                        taxonCounts = Object.entries(__assign(__assign({}, speciesCounts), genusCounts));
                        annotations = [];
                        taxonCounts.forEach(function (_a) {
                            var taxId = _a[0], taxInfo = _a[1];
                            var annotation = taxInfo === null || taxInfo === void 0 ? void 0 : taxInfo.annotation;
                            if (annotation) {
                                annotations.push({
                                    tax_id: parseInt(taxId),
                                    annotation: annotation,
                                });
                            }
                        });
                        return [2 /*return*/, annotations];
                }
            });
        }); },
        fedWorkflowRuns: function (_, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var input, body, workflowRuns, nextGenEnabled, response, workflow_runs;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
            return __generator(this, function (_w) {
                switch (_w.label) {
                    case 0:
                        input = args.input;
                        if (input == null) {
                            throw new Error("fedWorkflowRuns input is nullish");
                        }
                        if (!(((_b = (_a = input.where) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b._in) && typeof ((_d = (_c = input.where) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d._in) === "object")) return [3 /*break*/, 2];
                        body = {
                            authenticity_token: (_e = input.todoRemove) === null || _e === void 0 ? void 0 : _e.authenticityToken,
                            workflowRunIds: input.where.id._in.map(function (id) { return id && parseInt(id); }),
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/workflow_runs/valid_consensus_genome_workflow_runs",
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        workflowRuns = (_w.sent()).workflowRuns;
                        return [2 /*return*/, workflowRuns.map(function (run) { return ({
                                id: run.id.toString(),
                                ownerUserId: run.owner_user_id,
                                status: run.status,
                            }); })];
                    case 2: return [4 /*yield*/, (0, httpUtils_1.shouldReadFromNextGen)(context)];
                    case 3:
                        nextGenEnabled = _w.sent();
                        if (!nextGenEnabled) return [3 /*break*/, 5];
                        return [4 /*yield*/, (0, httpUtils_1.fetchFromNextGen)({
                                customQuery: (0, queryFormatUtils_1.convertWorkflowRunsQuery)(context.params.query),
                                customVariables: {
                                    where: input.where,
                                    // TODO: Migrate to array orderBy.
                                    orderBy: (_f = (input.orderBy != null ? [input.orderBy] : undefined)) !== null && _f !== void 0 ? _f : input.orderByArray,
                                },
                                serviceType: "workflows",
                                args: args,
                                context: context,
                            })];
                    case 4:
                        response = _w.sent();
                        if (((_g = response === null || response === void 0 ? void 0 : response.data) === null || _g === void 0 ? void 0 : _g.workflowRuns) == null) {
                            throw new Error("NextGen workflowRuns query failed: ".concat(JSON.stringify(response)));
                        }
                        return [2 /*return*/, response.data.workflowRuns];
                    case 5: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/workflow_runs.json" +
                                (0, paramsUtils_1.formatUrlParams)({
                                    mode: "basic",
                                    domain: (_h = input.todoRemove) === null || _h === void 0 ? void 0 : _h.domain,
                                    projectId: (_j = input.todoRemove) === null || _j === void 0 ? void 0 : _j.projectId,
                                    search: (_k = input.todoRemove) === null || _k === void 0 ? void 0 : _k.search,
                                    orderBy: (_l = input.todoRemove) === null || _l === void 0 ? void 0 : _l.orderBy,
                                    orderDir: (_m = input.todoRemove) === null || _m === void 0 ? void 0 : _m.orderDir,
                                    host: (_o = input.todoRemove) === null || _o === void 0 ? void 0 : _o.host,
                                    locationV2: (_p = input.todoRemove) === null || _p === void 0 ? void 0 : _p.locationV2,
                                    taxon: (_q = input.todoRemove) === null || _q === void 0 ? void 0 : _q.taxon,
                                    taxaLevels: (_r = input.todoRemove) === null || _r === void 0 ? void 0 : _r.taxonLevels,
                                    time: (_s = input.todoRemove) === null || _s === void 0 ? void 0 : _s.time,
                                    tissue: (_t = input.todoRemove) === null || _t === void 0 ? void 0 : _t.tissue,
                                    visibility: (_u = input.todoRemove) === null || _u === void 0 ? void 0 : _u.visibility,
                                    workflow: (_v = input.todoRemove) === null || _v === void 0 ? void 0 : _v.workflow,
                                    limit: TEN_MILLION,
                                    offset: 0,
                                    listAllIds: false,
                                }),
                            args: args,
                            context: context,
                        })];
                    case 6:
                        workflow_runs = (_w.sent()).workflow_runs;
                        if (!(workflow_runs === null || workflow_runs === void 0 ? void 0 : workflow_runs.length)) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, workflow_runs.map(function (run) {
                                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                                return ({
                                    id: (_a = run.id) === null || _a === void 0 ? void 0 : _a.toString(),
                                    ownerUserId: (_c = (_b = run.runner) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.toString(),
                                    startedAt: run.created_at,
                                    status: run.status,
                                    rawInputsJson: "{\"creation_source\": \"".concat((_e = (_d = run.inputs) === null || _d === void 0 ? void 0 : _d.creation_source) !== null && _e !== void 0 ? _e : "", "\"}"),
                                    workflowVersion: {
                                        version: run.wdl_version,
                                        workflow: {
                                            name: (_f = run.inputs) === null || _f === void 0 ? void 0 : _f.creation_source, // TODO: Delete when FE uses rawInputsJson.
                                        },
                                    },
                                    entityInputs: {
                                        edges: [
                                            {
                                                node: {
                                                    entityType: "sequencing_read",
                                                    inputEntityId: (_j = (_h = (_g = run.sample) === null || _g === void 0 ? void 0 : _g.info) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 ? void 0 : _j.toString(),
                                                },
                                            },
                                        ],
                                    },
                                });
                            })];
                }
            });
        }); },
        fedWorkflowRunsAggregate: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var input, projects, nextGenEnabled, nextGenProjectAggregates, customQuery, consensusGenomesAggregateResponse;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        input = args.input;
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                url: "/projects.json" +
                                    (0, paramsUtils_1.formatUrlParams)({
                                        projectId: (_a = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _a === void 0 ? void 0 : _a.projectId,
                                        domain: (_b = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _b === void 0 ? void 0 : _b.domain,
                                        limit: TEN_MILLION,
                                        listAllIds: false,
                                        offset: 0,
                                        host: (_c = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _c === void 0 ? void 0 : _c.host,
                                        locationV2: (_d = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _d === void 0 ? void 0 : _d.locationV2,
                                        taxonThresholds: (_e = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _e === void 0 ? void 0 : _e.taxonThresholds,
                                        annotations: (_f = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _f === void 0 ? void 0 : _f.annotations,
                                        search: (_g = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _g === void 0 ? void 0 : _g.search,
                                        tissue: (_h = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _h === void 0 ? void 0 : _h.tissue,
                                        visibility: (_j = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _j === void 0 ? void 0 : _j.visibility,
                                        time: (_k = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _k === void 0 ? void 0 : _k.time,
                                        taxaLevels: (_l = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _l === void 0 ? void 0 : _l.taxaLevels,
                                        taxon: (_m = input === null || input === void 0 ? void 0 : input.todoRemove) === null || _m === void 0 ? void 0 : _m.taxon,
                                    }),
                                args: args,
                                context: context,
                            })];
                    case 1:
                        projects = (_r.sent()).projects;
                        return [4 /*yield*/, (0, httpUtils_1.shouldReadFromNextGen)(context)];
                    case 2:
                        nextGenEnabled = _r.sent();
                        nextGenProjectAggregates = [];
                        if (!nextGenEnabled) return [3 /*break*/, 4];
                        customQuery = "\n            query nextGenWorkflowsAggregate {\n              workflowRunsAggregate(where: $where) {\n                aggregate {\n                  groupBy {\n                    collectionId\n                    workflowVersion {\n                      workflow {\n                        name\n                      }\n                    }\n                  }\n                  count\n                }\n              }\n            }\n          ";
                        return [4 /*yield*/, (0, httpUtils_1.fetchFromNextGen)({
                                args: args,
                                context: context,
                                serviceType: "workflows",
                                customQuery: customQuery,
                                customVariables: {
                                    where: (_o = args.input) === null || _o === void 0 ? void 0 : _o.where,
                                },
                            })];
                    case 3:
                        consensusGenomesAggregateResponse = _r.sent();
                        nextGenProjectAggregates =
                            (_q = (_p = consensusGenomesAggregateResponse === null || consensusGenomesAggregateResponse === void 0 ? void 0 : consensusGenomesAggregateResponse.data) === null || _p === void 0 ? void 0 : _p.workflowRunsAggregate) === null || _q === void 0 ? void 0 : _q.aggregate;
                        _r.label = 4;
                    case 4: return [2 /*return*/, (0, aggregateUtils_1.processWorkflowsAggregateResponse)(nextGenProjectAggregates, projects, nextGenEnabled)];
                }
            });
        }); },
        ZipLink: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var nextGenEnabled, customQuery, ret, res, url;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, (0, httpUtils_1.shouldReadFromNextGen)(context)];
                    case 1:
                        nextGenEnabled = _e.sent();
                        if (!nextGenEnabled) return [3 /*break*/, 3];
                        customQuery = "\n          query GetZipLink {\n            consensusGenomes(where: {producingRunId: {_eq: \"".concat(args.workflowRunId, "\"}}){\n              intermediateOutputs {\n                downloadLink {\n                  url\n                }\n              }\n            }\n          }\n        ");
                        return [4 /*yield*/, (0, httpUtils_1.get)({
                                args: args,
                                context: context,
                                serviceType: "entities",
                                customQuery: customQuery,
                            })];
                    case 2:
                        ret = _e.sent();
                        console.log("ret - ZipLink", JSON.stringify(ret));
                        if ((_d = (_c = (_b = (_a = ret.data) === null || _a === void 0 ? void 0 : _a.consensusGenomes[0]) === null || _b === void 0 ? void 0 : _b.intermediateOutputs) === null || _c === void 0 ? void 0 : _c.downloadLink) === null || _d === void 0 ? void 0 : _d.url) {
                            return [2 /*return*/, {
                                    url: ret.data.consensusGenomes[0].intermediateOutputs.downloadLink
                                        .url,
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    url: null,
                                    error: ret.error,
                                }];
                        }
                        _e.label = 3;
                    case 3: return [4 /*yield*/, (0, httpUtils_1.get)({
                            url: "/workflow_runs/".concat(args.workflowRunId, "/zip_link.json"),
                            args: args,
                            context: context,
                            fullResponse: true,
                        })];
                    case 4:
                        res = _e.sent();
                        if (res.status !== 200) {
                            return [2 /*return*/, {
                                    url: null,
                                    error: res.statusText,
                                }];
                        }
                        url = res.url;
                        return [2 /*return*/, {
                                url: url,
                            }];
                }
            });
        }); },
        GraphQLFederationVersion: function () { return ({
            version: process.env.CZID_GQL_FED_GIT_VERSION,
            gitCommit: process.env.CZID_GQL_FED_GIT_SHA,
        }); },
    },
    Mutation: {
        CreateBulkDownload: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, downloadType, workflow, downloadFormat, workflowRunIds, workflowRunIdsStrings, workflowRunIdsNumbers, body, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(args === null || args === void 0 ? void 0 : args.input)) {
                            throw new Error("No input provided");
                        }
                        _a = args === null || args === void 0 ? void 0 : args.input, downloadType = _a.downloadType, workflow = _a.workflow, downloadFormat = _a.downloadFormat, workflowRunIds = _a.workflowRunIds, workflowRunIdsStrings = _a.workflowRunIdsStrings;
                        workflowRunIdsNumbers = workflowRunIdsStrings === null || workflowRunIdsStrings === void 0 ? void 0 : workflowRunIdsStrings.map(function (id) { return id && parseInt(id); });
                        body = {
                            download_type: downloadType,
                            workflow: workflow,
                            params: {
                                download_format: {
                                    value: downloadFormat,
                                },
                                sample_ids: {
                                    value: workflowRunIdsNumbers !== null && workflowRunIdsNumbers !== void 0 ? workflowRunIdsNumbers : workflowRunIds,
                                },
                                workflow: {
                                    value: workflow,
                                },
                            },
                            workflow_run_ids: workflowRunIdsNumbers !== null && workflowRunIdsNumbers !== void 0 ? workflowRunIdsNumbers : workflowRunIds,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/bulk_downloads",
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        DeleteSamples: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, idsStrings, workflow, ids, body, _b, deletedIds, error;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(args === null || args === void 0 ? void 0 : args.input)) {
                            throw new Error("No input provided");
                        }
                        _a = args === null || args === void 0 ? void 0 : args.input, idsStrings = _a.idsStrings, workflow = _a.workflow, ids = _a.ids;
                        body = {
                            selectedIds: idsStrings !== null && idsStrings !== void 0 ? idsStrings : ids,
                            workflow: workflow,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/bulk_delete",
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        _b = _c.sent(), deletedIds = _b.deletedIds, error = _b.error;
                        return [2 /*return*/, {
                                deleted_workflow_ids: deletedIds,
                                error: error,
                            }];
                }
            });
        }); },
        KickoffWGSWorkflow: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var body, res, formattedRes;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = {
                            workflow: (_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.workflow,
                            inputs_json: (_b = args === null || args === void 0 ? void 0 : args.input) === null || _b === void 0 ? void 0 : _b.inputs_json,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/".concat(args.sampleId, "/kickoff_workflow"),
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _c.sent();
                        try {
                            formattedRes = res.map(function (item) {
                                item.id = item.id.toString();
                                return item;
                            });
                            return [2 /*return*/, formattedRes];
                        }
                        catch (_d) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/];
                }
            });
        }); },
        KickoffAMRWorkflow: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var body, res;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = {
                            workflow: (_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.workflow,
                            inputs_json: (_b = args === null || args === void 0 ? void 0 : args.input) === null || _b === void 0 ? void 0 : _b.inputs_json,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/".concat(args.sampleId, "/kickoff_workflow"),
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _c.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        UpdateMetadata: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var body, res;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        body = {
                            field: (_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.field,
                            value: ((_b = args === null || args === void 0 ? void 0 : args.input) === null || _b === void 0 ? void 0 : _b.value.String)
                                ? args.input.value.String
                                : (_c = args === null || args === void 0 ? void 0 : args.input) === null || _c === void 0 ? void 0 : _c.value.query_SampleMetadata_metadata_items_location_validated_value_oneOf_1_Input,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/".concat(args.sampleId, "/save_metadata_v2"),
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _d.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        UpdateSampleNotes: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var body, res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            field: "sample_notes",
                            value: (_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.value,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/".concat(args.sampleId, "/save_metadata"),
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
        UpdateSampleName: function (root, args, context, info) { return __awaiter(void 0, void 0, void 0, function () {
            var body, res;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            field: "name",
                            value: (_a = args === null || args === void 0 ? void 0 : args.input) === null || _a === void 0 ? void 0 : _a.value,
                        };
                        return [4 /*yield*/, (0, httpUtils_1.postWithCSRF)({
                                url: "/samples/".concat(args.sampleId, "/save_metadata"),
                                body: body,
                                args: args,
                                context: context,
                            })];
                    case 1:
                        res = _b.sent();
                        return [2 /*return*/, res];
                }
            });
        }); },
    },
};
function getMetadataEdges(sampleMetadata) {
    return sampleMetadata != null
        ? Object.entries(sampleMetadata)
            .filter(function (_a) {
            var fieldName = _a[0];
            return fieldName !== "nucleotide_type" &&
                fieldName !== "collection_location_v2" &&
                fieldName !== "sample_type" &&
                fieldName !== "water_control";
        })
            .map(function (_a) {
            var fieldName = _a[0], value = _a[1];
            return ({
                node: {
                    fieldName: fieldName,
                    value: String(value),
                },
            });
        })
        : [];
}

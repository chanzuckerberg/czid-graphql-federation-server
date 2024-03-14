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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTaxonLineage = exports.formatTaxonHits = void 0;
// generic function to format nt/nr counts
var formatNtNrCounts = function (taxId, taxInfo, countType) {
    var hit = taxInfo[countType];
    return {
        tax_id: parseInt(taxId),
        count_type: countType.toUpperCase(),
        count: hit.count,
        base_count: hit.base_count,
        rpm: hit.rpm,
        bpm: hit.bpm,
        aligment_length: hit.alignment_length,
        percent_identity: hit.percent_identity,
        e_value: hit.e_value,
        fed_bg_mean: hit.bg_mean,
        fed_bg_stdev: hit.bg_stdev,
        fed_bg_mean_mass_normalized: hit.bg_mean_mass_normalized,
        fed_bg_stdev_mass_normalized: hit.bg_stdev_mass_normalized,
        fed_bg_zscore: hit.bg_zscore,
        fed_max_z_score: taxInfo.max_z_score,
        fed_agg_score: taxInfo.agg_score,
    };
};
var formatTaxonHits = function (counts) {
    var speciesCounts = (counts === null || counts === void 0 ? void 0 : counts["1"]) || {};
    var genusCounts = (counts === null || counts === void 0 ? void 0 : counts["2"]) || {};
    var taxonHits = [];
    var taxonCounts = Object.entries(__assign(__assign({}, speciesCounts), genusCounts));
    taxonCounts.forEach(function (_a) {
        var taxId = _a[0], taxInfo = _a[1];
        if ("nt" in taxInfo) {
            taxonHits.push(formatNtNrCounts(taxId, taxInfo, "nt"));
        }
        if ("nr" in taxInfo) {
            taxonHits.push(formatNtNrCounts(taxId, taxInfo, "nr"));
        }
    });
    return taxonHits;
};
exports.formatTaxonHits = formatTaxonHits;
;
// Note that the tax_id, name, and rank data returned here are computed values
// and not db values. Refer to encode_taxon_lineage in the czid-web-private repo.
var formatTaxonLineage = function (lineage) {
    return Object.entries(lineage).map(function (_a) {
        var taxId = _a[0], taxInfo = _a[1];
        return {
            tax_id: taxId,
            name: taxInfo.name,
            rank: taxInfo.rank,
        };
    });
};
exports.formatTaxonLineage = formatTaxonLineage;

# Changelog

## [1.5.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.4.1...v1.5.0) (2023-10-23)


### Features

* **api:** federate samples/bulk_delete ([#90](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/90)) ([4fa5e26](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/4fa5e26ef2092d09f032dd468a13f69e6d76ceea))
* **api:** support snapshot links ([#75](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/75)) ([522ebe0](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/522ebe02e8e35ed90946d1c66ff3db27fc28493a))

## [1.4.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.4.0...v1.4.1) (2023-10-20)


### Bug Fixes

* **cd:** revert promote staging images to prod ([#91](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/91)) ([c9204b0](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c9204b079554d0ea89e912104c842e2768560b14))

## [1.4.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.3.0...v1.4.0) (2023-10-13)


### Features

* **cd:** promote staging images to prod ([#85](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/85)) ([5333f02](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5333f02ba9f5658c520736d358a719f6fa4ba7d9))

## [1.3.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.2.1...v1.3.0) (2023-10-10)


### Features

* **ci:** Update stack names and parameterize sensitive infrastructure info ([#60](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/60)) ([0f9b18a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/0f9b18a77596a9ac23ba81db8d11e01435b7a791))

## [1.2.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.2.0...v1.2.1) (2023-10-06)


### Bug Fixes

* **ci:** remove staging image promotion in prod deploy  ([#78](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/78)) ([898acd8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/898acd80daa7b14252aa4e04d2d601b91e989528))

## [1.2.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.1.1...v1.2.0) (2023-10-06)


### Features

* **api:** federate GET '/samples/{sampleId}/report_v2' endpt  ([#58](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/58)) ([d4421f9](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/d4421f92ace8eb42970d078957969c608b726440))
* **ci:** improve release flow for graphql federation ([#68](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/68)) ([343e36a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/343e36a9f17dbd93fe9f107991f5e561d027031d))
* support /samples/[sampleId]/report_v2 url params ([#71](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/71)) ([967f441](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/967f441bb96ffd0f8cb86643e34a190406b17bf7))


### Bug Fixes

* api url for local and deployed environments ([#62](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/62)) ([5f9aded](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5f9aded1b864261825d057e81e2de114845483ab))
* **ci:** use correct env for happy config in deploy staging and prod workflows ([#76](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/76)) ([e4ab58a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e4ab58a5abba24ef2efc5db76a9276dee20ae5a4))
* release fix taxon schema ([#77](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/77)) ([09108ac](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/09108ac5717cca3094eb12652a3a84788835a5a4))

## [1.1.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.1.0...v1.1.1) (2023-09-29)


### Bug Fixes

* **ci:** deploy-prod action should deploy release tag, not main ([#66](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/66)) ([9fbaacd](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9fbaacd119cabb9ec061dbad800086e1a361369e))

## [1.1.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.0.0...v1.1.0) (2023-09-28)


### Features

* **api:** federate GET  '/samples/index_v2' endpt ([5177ba5](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5177ba512de544b7cd3d552f2bbde6e6c48333ba))
* **api:** federate GET  '/samples/index_v2' endpt ([5177ba5](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5177ba512de544b7cd3d552f2bbde6e6c48333ba))
* **api:** federate GET '/samples/{sampleId}.json' endpt ([#55](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/55)) ([be44021](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/be440216ac0ddb1c06166e1158c998498afa3c49))
* **api:** federate GET '/samples/{sampleId}/amr.json' endpt ([#56](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/56)) ([8d1cf7b](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/8d1cf7b66dbea095f67df71d5ccc23256866debd))
* **api:** federate GET '/workflow_runs/{workflowRunId}/results' endpt ([#51](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/51)) ([30d8196](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/30d81962b54be6966352fdf7dedadaaf8ae5de5b))

## 1.0.0 (2023-08-11)


### Features

* add new sandbox happy env ([7c2d9d1](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/7c2d9d116af23c013ed3ae4b9d617d6831d824ba))
* add prod release workflow ([#44](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/44)) ([9b769b8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9b769b871f707fc49fae78be6280e903bff5ea6b))
* happy setup for dev,staging,prod ([3cabdce](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/3cabdce32a63ab7b2f5a56f5311244bebd775769))


### Bug Fixes

* service needs to be the same name ([5f658ee](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5f658eeef6272ad29bd9ed89da769f9698704e07))
* service needs to be the same name ([451bcef](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/451bcefd97aed402c8ebcd803bdc8df004642ed1))

# Changelog


## [2.35.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.35.1...v2.35.2) (2025-01-17)


### Bug Fixes

* Remove unsupported healthCheckEndpoint config ([#362](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/362)) ([9515835](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/951583594b3e1d52c3553331947609041f3ade87))

## [2.35.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.35.0...v2.35.1) (2025-01-17)


### Bug Fixes

* add initial_delay_seconds in terraform ([#360](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/360)) ([6779ffc](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/6779ffccdf50470fe4eec2e78963bda9dc1ec6b0))

## [2.35.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.34.4...v2.35.0) (2025-01-16)


### Features

* Dummy PR to trigger release please ([#358](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/358)) ([c649ea9](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c649ea970170161a81230049b7ea19509f97d046))

## [2.34.4](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.34.3...v2.34.4) (2025-01-16)


### Bug Fixes

* update happy to latest ([#355](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/355)) ([f096ec8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f096ec8b0ecfab744519c9be1a001b32dd635e5d))

## [2.34.3](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.34.2...v2.34.3) (2025-01-16)


### Bug Fixes

* bump liveness readiness timeouts ([#353](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/353)) ([0184ef8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/0184ef855f2286b57c0e0985fa9f5ff194d5931d))

## [2.34.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.34.1...v2.34.2) (2025-01-15)


### Bug Fixes

* bump timeout seconds ([#351](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/351)) ([652874f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/652874f43f160325796b33f6a5686639a8827666))

## [2.34.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.34.0...v2.34.1) (2024-12-10)


### Bug Fixes

* Adding missing workflow run mappings ([#349](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/349)) ([e8b48bb](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e8b48bbc98fc8922b551f6cb9e90fd4eebba95ca))

## [2.34.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.33.2...v2.34.0) (2024-06-10)


### Features

* add pinned_alignment_config to SampleForReportResponse ([#347](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/347)) ([76d3ca6](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/76d3ca6af91b53347722a6a8cb1386b3bc8b532e))

## [2.33.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.33.1...v2.33.2) (2024-05-31)


### Bug Fixes

* Always stringify object query params ([#343](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/343)) ([c28c60f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c28c60f7647a64b611680fb56bf6ff9799a315f7))

## [2.33.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.33.0...v2.33.1) (2024-04-30)


### Bug Fixes

* Create Bulk Download backward compatibility ([#340](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/340)) ([1bd4a71](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/1bd4a71d158e082a45170886d7d48a1fb3941324))

## [2.33.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.32.0...v2.33.0) (2024-04-29)


### Features

* Bump memory and CPU to avoid 500x errors ([#337](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/337)) ([3366aaa](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/3366aaa7beb904f754da0fdb593d3ec3333cd58e))


### Bug Fixes

* add required types to admin samples response ([#336](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/336)) ([9cbf1cb](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9cbf1cbe8a33a54e45fe8ffe1519b303cdacd73c))
* Change validIds field back to number, add new validIdsStrings field ([#339](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/339)) ([8a23f0c](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/8a23f0c580f4bcdfc255485649e76770a73a0706))

## [2.32.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.31.0...v2.32.0) (2024-04-24)


### Features

* add nextgen entities and workflows url ([#332](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/332)) ([62cf994](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/62cf994df7bdfa9af71c76cb6bf2dc2ec8f0c923))
* admin entities + workflows endpoints ([#328](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/328)) ([8aae898](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/8aae898348825c63d998a530a9c220582efc431d))


### Bug Fixes

* Remove unused resolvers and reorganize ([#329](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/329)) ([c119b83](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c119b83b259c9cb739892535adee10f02c0bb067))

## [2.31.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.30.2...v2.31.0) (2024-04-22)


### Features

* Expose errorLabel in fedWorkflowRuns ([#330](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/330)) ([662e546](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/662e5461765310867b01f9fefbc36fd680d71694))

## [2.30.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.30.1...v2.30.2) (2024-04-19)


### Bug Fixes

* Update NextGen schema with new errorLabel field and pass it through SampleForReport ([#325](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/325)) ([ddfe8d5](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/ddfe8d5ff126f88a23afdc402f4c8516f61f54a6))
* Update schema ([#326](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/326)) ([a510e29](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/a510e29658ace8a98a2815ac55dc0f72ec7ffd3b))

## [2.30.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.30.0...v2.30.1) (2024-04-12)


### Bug Fixes

* update schema for artic_v3 wetlab protocol ([#322](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/322)) ([e34da61](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e34da6132ef7fc813f723ff7dce690edc9173c01))

## [2.30.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.29.6...v2.30.0) (2024-04-11)


### Features

* Upgrade Mesh again to enable error logging ([#303](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/303)) ([3fb5996](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/3fb5996665cece97bf358d021da02b6c482e2943))


### Bug Fixes

* Make response schema for CreateBulkDownload consistent between flag on/off ([#319](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/319)) ([2c7663f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/2c7663fff841c679ec735b486f4f5a3d3c1ff2b2))

## [2.29.6](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.29.5...v2.29.6) (2024-04-10)


### Bug Fixes

* fix taxon/accession queries ([#317](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/317)) ([969c3d7](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/969c3d70b93466c0879fd354cf192a1c619477d6))

## [2.29.5](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.29.4...v2.29.5) (2024-04-10)


### Bug Fixes

* fix workflows query syntax and conditionally fire taxon/accession queries in sample report ([#314](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/314)) ([e4c0cab](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e4c0cab3db364c4c0f119caaeb4c5df0e933af76))

## [2.29.4](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.29.3...v2.29.4) (2024-04-10)


### Bug Fixes

* Bulk Download List fixes ([#309](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/309)) ([32b0eff](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/32b0effa4647b792f305df5b3b4f2889a385c4c0))

## [2.29.3](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.29.2...v2.29.3) (2024-04-09)


### Bug Fixes

* query taxa and accessions for info in sample report ([#310](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/310)) ([ff2ffde](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/ff2ffded080f2cd4751e00f064b5a7ccfa3dc784))
* Update collectionId in workflow schema to be nullable ([#311](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/311)) ([302c702](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/302c7021f38593d33ab56088593fd0d79f1725e5))

## [2.29.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.29.1...v2.29.2) (2024-04-05)


### Bug Fixes

* bulk delete id types ([#307](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/307)) ([216b2d8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/216b2d88a01dcbd39078d0f80389f689befa3d68))
* make taxon info optional in response ([#306](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/306)) ([98bb588](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/98bb5880ebac42477a30cb4ede9b35d5706b2982))

## [2.29.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.29.0...v2.29.1) (2024-04-04)


### Bug Fixes

* Handle object type in collection_location_v2 ([#304](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/304)) ([4e4a74f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/4e4a74f9004a16f1fe502081c526bf5b6b94b76a))

## [2.29.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.28.2...v2.29.0) (2024-04-04)


### Features

* Add producingRunId to request schema of sequencingReads ([#291](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/291)) ([cad49fd](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/cad49fd32177a7d4cbe48030b485cefe2731167f))
* Connect Bulk Downloads to NextGen (both Create Bulk Download and Bulk Download list) ([#298](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/298)) ([ea206b7](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/ea206b7418ddce045d6eef01772a6ab0adf41491))


### Bug Fixes

* Add taxon level to fedSequencingReads ([#297](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/297)) ([fd29480](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/fd29480621a949906e47a696e3fb2454d0083895))
* increase memory in prod ([#277](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/277)) ([76fe22e](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/76fe22e11ba47719990c9831d340216fa9f35de6))
* Update collectionId in entity schema to be nullable ([#302](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/302)) ([f7466e3](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f7466e33b0b11fba95185122ab911e4a86556d21))
* Upgrade @graphql-mesh/cli ([#299](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/299)) ([940b02d](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/940b02d6187603be29709320f29a20dffee8df67))

## [2.28.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.28.1...v2.28.2) (2024-04-02)


### Bug Fixes

* Use new Bulk Downloads Endpoint ([#294](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/294)) ([89c5574](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/89c5574b65ba43223406dd7c29c7c56247f55bda))

## [2.28.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.28.0...v2.28.1) (2024-04-01)


### Bug Fixes

* allow for deprecatedById field in aggregate queries ([#282](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/282)) ([20ecb02](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/20ecb0209ee0914368a60d9a47d99013e18a4146))
* fedBulkDownloads improvements ([#249](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/249)) ([2adf599](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/2adf5997179f0a4d17913e13113a07dd7f13cf13))

## [2.28.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.27.0...v2.28.0) (2024-03-29)


### Features

* Add new input to fedSequencingReads - workflowRunIds and sampleIds ([#283](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/283)) ([3e6ff5e](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/3e6ff5e0f825f6a0a6b919bd9dda48a7d9e667b2))


### Reverts

* Enable more detailed logs in sandbox and staging envs" ([#271](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/271)) ([7c12a14](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/7c12a14d46328db0a888c52f21b673988acbbc14))

## [2.27.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.26.1...v2.27.0) (2024-03-28)


### Features

* federate querying total count of each workflow ([#189](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/189)) ([93b8c29](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/93b8c2972d8227fa0cb30a5e47ffdb560082d71a))

## [2.26.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.26.0...v2.26.1) (2024-03-28)


### Bug Fixes

* Add back query log ([#272](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/272)) ([49e7f30](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/49e7f300d787736432105967800043547c809b87))

## [2.26.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.25.0...v2.26.0) (2024-03-28)


### Features

* Add sorting by consensusGenomes field functionality in Fed ([#246](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/246)) ([c87eaa2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c87eaa25dbc0f84aed80bfa54e8527c8dc0ad00c))
* Allow security token to be passed for nextGen calls ([#218](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/218)) ([bed5cd2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/bed5cd26daf5a91b9a416fe9d3e14cc8624c9c5f))
* CZID-9499 Add referenceGenome to fedConsensusGenome ([#260](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/260)) ([409d793](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/409d79391170a5a02ea60bb73d9a3eeed9b900ca))

## [2.25.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.24.0...v2.25.0) (2024-03-28)


### Features

* Add includes metadata to BulkDownloadCGOverview ([#250](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/250)) ([c2ade09](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c2ade09b09fb3b4e9f13af3d537762c1ebb6a9d7))
* Add sorting by SequencingRead fields ([#235](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/235)) ([4bb438d](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/4bb438d5a8598b94bcce4a8ce4797798328f59dd))
* Enable more detailed logs in sandbox and staging envs ([#261](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/261)) ([4fda2e1](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/4fda2e185d8bbf3f30e1807b4d064dc426ff8a18))

## [2.24.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.23.5...v2.24.0) (2024-03-26)


### Features

* update taxon nullable ([#240](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/240)) ([c61d7a9](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c61d7a9c65dad0853f603f3853af35b008082734))


### Bug Fixes

* change the type of BulkDownloadCGOverview.params ([#242](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/242)) ([e71af07](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e71af077d66527ee1d5aee526553358791b8004d))

## [2.23.5](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.23.4...v2.23.5) (2024-03-25)


### Bug Fixes

* in Progress CG Overview testing ([#238](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/238)) ([1ba36ec](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/1ba36ec69cf1935ff4eb4351b4c5370509c84358))

## [2.23.4](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.23.3...v2.23.4) (2024-03-22)


### Bug Fixes

* Bulk download cg overview next gen2 ([#236](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/236)) ([2189473](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/2189473b03d1f6bc3b23f71fef15fa843aadb641))

## [2.23.3](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.23.2...v2.23.3) (2024-03-22)


### Bug Fixes

* account for deprecated and bulk-download runs in SampleForReport query ([#230](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/230)) ([567a2f2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/567a2f2e36c4e695a712c753be81aff0b7235351))
* testing cg bulk download overview ([#233](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/233)) ([b16f33a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/b16f33a1d28cf2a56b4fbe6ed91ca8ed484bf50b))

## [2.23.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.23.1...v2.23.2) (2024-03-22)


### Bug Fixes

* bulk download overview in progress ([#231](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/231)) ([478aeeb](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/478aeeb6529e7e8c412548f5287c0eddecfedc55))

## [2.23.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.23.0...v2.23.1) (2024-03-22)


### Bug Fixes

* begin testing BulkDownloadCGOverview to nextGen ([#227](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/227)) ([5c2c3a8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5c2c3a8842e2951e36474c9aad4e633a3fa8e24d))

## [2.23.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.22.0...v2.23.0) (2024-03-21)


### Features

* Also print query inputs in logs. ([#212](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/212)) ([c1687a5](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c1687a51acc8e1cedad88fe80e9fdb0f339a417a))


### Bug Fixes

* BulkDownloadModal Validation - Reformat query ([#219](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/219)) ([c9444f8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c9444f83ad1a8b8261a7426aadf7e088f5aad9d4))
* Edits to fedBulkDownloads ([#198](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/198)) ([1cee495](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/1cee495266f46f0fdb741b18d3fa0fa6e742da12))
* Use workflowRunIdsNumbers when available ([#225](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/225)) ([cc890fd](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/cc890fd22bc9b80bf5369e0932aacec1a33c85bc))

## [2.22.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.21.0...v2.22.0) (2024-03-20)


### Features

* Add filtering by sampleIds & workflowRunIds on /worklflow_runs for API testing ([#223](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/223)) ([167b5a4](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/167b5a49ca6be1d3563d6a4f7748404e4fd0f495))
* Add sample name match argument ([#221](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/221)) ([6e2607c](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/6e2607c45d136b11ed64b47c71baa73ca21a7f37))
* Parallelize the Rails and NexGen join calls for fedSequencingReads ID query ([#216](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/216)) ([6e341d0](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/6e341d0ea3b4b2ef2afcdb662c50e344e5160d76))

## [2.21.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.20.2...v2.21.0) (2024-03-19)


### Features

* Add collectionId to where of workflowRunsAggregate so that we can paginate the query ([#213](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/213)) ([405f094](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/405f094290a71aa029c89b0c1bcd80176d3e6e31))

## [2.20.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.20.1...v2.20.2) (2024-03-19)


### Bug Fixes

* Remove hack for testing ([#210](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/210)) ([6cc6315](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/6cc6315a40f4bb779fff874e71c76d6744dacef4))

## [2.20.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.20.0...v2.20.1) (2024-03-18)


### Bug Fixes

* Fix issues related to Rails calls made by fedSequencingReads when fetching IDs ([#207](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/207)) ([9983ff2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9983ff2bffbe83651be2408541a2e67cb8988283))
* Temporarily try seeing if fake paginating the aggregates query would solve the performance problem ([#209](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/209)) ([b6b6d4a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/b6b6d4acde82acfc8b33bce46a6115686b54a4d5))

## [2.20.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.19.1...v2.20.0) (2024-03-18)


### Features

* Connect validation query to nextgen ([#204](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/204)) ([481c40e](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/481c40e1e805cb92288792e0819189d31f383195))

## [2.19.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.19.0...v2.19.1) (2024-03-18)


### Bug Fixes

* fedConsensusGenomes: Make name available in rails ([#202](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/202)) ([487ea03](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/487ea035b8eff6a7aba141b832c6c64cde67d406))

## [2.19.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.18.2...v2.19.0) (2024-03-15)


### Features

* Add support for filtering IDs of SequencingReads ([#197](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/197)) ([d4eaf77](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/d4eaf776b58ad26df0a758ab8b1f7c9b858ac903))

## [2.18.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.18.1...v2.18.2) (2024-03-15)


### Bug Fixes

* Construct nextgen aggregates query appropriately ([#199](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/199)) ([949e372](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/949e3726d7566816035e1a5309485b0e4422301b))

## [2.18.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.18.0...v2.18.1) (2024-03-14)


### Bug Fixes

* Fix required fields in sequencingReads not being set when no Rails sample found ([#195](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/195)) ([b437d34](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/b437d34dd3067f5f4541000fe726601b2612c924))

## [2.18.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.17.4...v2.18.0) (2024-03-14)


### Features

* Add hostOrganism join from Rails ([#193](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/193)) ([7446701](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/7446701db99b52b04b7b23e0407aa9e85f3dd551))

## [2.17.4](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.17.3...v2.17.4) (2024-03-14)


### Bug Fixes

* Ziplink querying wrong service ([#191](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/191)) ([008ccba](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/008ccbaeabcd61b6e0d8cf3a9ce3877f1cadf016))

## [2.17.3](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.17.2...v2.17.3) (2024-03-13)


### Bug Fixes

* convert and use workflowRunIdsStrings if passed in ([#187](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/187)) ([60c4f16](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/60c4f16d8cc112abb264da7892089dcdfc582c7a))

## [2.17.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.17.1...v2.17.2) (2024-03-13)


### Bug Fixes

* make sure query param is a string ([#185](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/185)) ([154904f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/154904f5f69383457fa8dca7fc5aebd95a13eb37))

## [2.17.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.17.0...v2.17.1) (2024-03-13)


### Bug Fixes

* Ziplink return from NextGen ([#180](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/180)) ([9102025](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/91020253e4419a0bdeb527abcd0575c1f682243c))

## [2.17.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.16.2...v2.17.0) (2024-03-13)


### Features

* Log NextGen responses when they error ([#181](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/181)) ([a7b746e](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/a7b746ee04264b05e8a2da08d38855ceb0d78d59))

## [2.16.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.16.1...v2.16.2) (2024-03-12)


### Bug Fixes

* Add schema for fedWorkflowRuns for filtering out WorkflowRuns that don't have the correct input entity ([#178](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/178)) ([85d3894](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/85d38945b38c84b3a6974ff1cae6bf1759e11146))

## [2.16.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.16.0...v2.16.1) (2024-03-12)


### Bug Fixes

* Filter out WorkflowRuns with null sequencing_read inputEntityIds ([#176](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/176)) ([deada69](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/deada691c1391f1409f454a88128cadc58c67344))

## [2.16.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.15.5...v2.16.0) (2024-03-12)


### Features

* query aggregates from NextGen and reformat response ([#159](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/159)) ([0f08a5f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/0f08a5f6ee36edec2fc538ca253817da2d9dd1e1))


### Bug Fixes

* Tsconfig to allow deployment ([#175](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/175)) ([305bbbd](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/305bbbdf3a2418dd007ecda8677601e9174a9377))
* Use workflowRun IDs in inner consensusGenomes where, not sequencingRead IDs ([#171](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/171)) ([f858e3f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f858e3ff12bb86adc10a9dbf8437c8e0621f6a5f))

## [2.15.5](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.15.4...v2.15.5) (2024-03-12)


### Bug Fixes

* Small Change for new version ([#172](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/172)) ([62adf05](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/62adf050a1200a4cdae6f996937628af40e2f66b))

## [2.15.4](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.15.3...v2.15.4) (2024-03-11)


### Bug Fixes

* Add sample uploader name to joined data from Rails + Use new array orderBy argument for NextGen ([#166](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/166)) ([4914748](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/491474843e87b68a2bc19c3a1e6e0f89deb22b56))
* Update get conditional logic ([#169](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/169)) ([2a17d09](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/2a17d095780c91035f642981c68f2e380d93f365))

## [2.15.3](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.15.2...v2.15.3) (2024-03-11)


### Bug Fixes

* return rails data when no nextgen id available ([#167](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/167)) ([b268861](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/b268861d93ba4146edad4f3b88ba9bcce92f4e04))

## [2.15.2](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.15.1...v2.15.2) (2024-03-11)


### Bug Fixes

* fix malformed id ([#164](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/164)) ([51988c7](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/51988c73f508b784451cba459c584da492259841))

## [2.15.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.15.0...v2.15.1) (2024-03-08)


### Bug Fixes

* Don't call Rails for the join if there were no sequencing reads returned by NextGen ([#162](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/162)) ([5281fca](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5281fca487b43a8f1d455a4c69a0bf1ac4c926dd))
* Sample View header & pipeline version ([#160](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/160)) ([a23593d](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/a23593dbaee669b8bbdd012c0cf89b9f60ab14b8))

## [2.15.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.14.0...v2.15.0) (2024-03-08)


### Features

* Add deprecated filter to federated request ([#151](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/151)) ([57057fc](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/57057fcf1c80807f81fecafa535f8feea195d19b))
* federate SampleForReport object ([#148](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/148)) ([91f0b1d](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/91f0b1d65974a2b8a6e08adf593166245c53d33f))
* Join NextGen data with Rails data in resolver ([#152](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/152)) ([9aa47f7](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9aa47f7469cb91d1f11490a2b5a1fceae4d7887a))
* Update NextGen schema ([#158](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/158)) ([bc23402](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/bc23402e1c84647d5de58a58cd2756a813688ca2))
* Ziplink NG Connection and Delete to accept strings ([#149](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/149)) ([d3afbb8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/d3afbb803d849a7fc049493a76fd73d2aead4b14))


### Bug Fixes

* Change to underscore entity input format ([#157](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/157)) ([8866b51](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/8866b516e919c354e2224763f8ac78552e850c19))

## [2.14.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.13.0...v2.14.0) (2024-03-07)


### Features

* update staging env variables urls ([#153](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/153)) ([26afdd7](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/26afdd7888752856d13d3fa255cb94dfcde6c23b))

## [2.13.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.12.0...v2.13.0) (2024-03-06)


### Features

* Integrate fedWorkflowRuns and fedSequencingReads with NextGen ([#146](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/146)) ([8f51783](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/8f51783d81050e059eb11f475fbc03238c222c51))


### Bug Fixes

* createBulkDownload Change workflowRunIdsStrings type and remove required for workflowRunIds ([#145](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/145)) ([256173d](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/256173dd1b8aaa8794daea7d0527656496238021))

## [2.12.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.11.1...v2.12.0) (2024-03-04)


### Features

* Add fed prefix to a few fields ([#123](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/123)) ([832210f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/832210fa1320261aba9ea4903e1bc51b160e12b7))
* Create Connection between Fed Server and Next Gen  ([#137](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/137)) ([b98dd14](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/b98dd1486c808e3b65c810769619a7f8204d11b3))
* Re-enable nextgen sources & update schemas ([#120](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/120)) ([0304aa4](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/0304aa4ffef7cb1d88dd3cdc1da9ec7699d0a690))
* schema edits for workflows, fedWorkflows, BulkDownloadModal and fedConsensusGenomes ([#142](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/142)) ([f89e183](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f89e18380059bb971b3be6b23d6cd0f95d582c3f))
* Update paginated endpoints with limit/offset ([#112](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/112)) ([ae755ed](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/ae755ed673fa1a423b0f59f06f59a1ab738c41af))
* Use nodemon to auto restart mesh after files change. ([#124](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/124)) ([312dcef](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/312dcef29778e1c0d835cdfb9ff171bc4ed19e53))


### Bug Fixes

* Revert "fix: return id as a string" ([#140](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/140)) ([e8da29b](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e8da29b3f0fc0ce42ced2fec1d632cbdf9ed8096))
* Revert "fix: update mutation to expect a string and tests" ([#139](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/139)) ([8c532ee](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/8c532eee47581dbfd9b8f67ef2a8adcd92a8bf23))
* switch "_" objects to prefixed fields ([#125](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/125)) ([f7911df](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f7911df4438c12fedbee5b9a78e15fa90a9a436e))
* update mutation to expect a string and tests ([#121](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/121)) ([c72561f](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c72561fecc33b9e54c54580e47f7483361444829))
* update to fedConsensusGenomes ([#127](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/127)) ([af20c6c](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/af20c6c43e34b7b3d84e0e783ca2617c64ac2e45))

## [2.11.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.11.0...v2.11.1) (2024-02-23)


### Bug Fixes

* return id as a string ([#115](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/115)) ([0ffa0b2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/0ffa0b2d6023927af6fac5e1eba4a6820d00e76a))

## [2.11.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.10.0...v2.11.0) (2024-02-21)


### Features

* Add entities to sources ([#96](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/96)) ([2fa964c](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/2fa964ca4ba338f933ae001885f33709a9577919))
* Bulk Download List Endpoints ([#107](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/107)) ([1e45857](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/1e458578445096115591c35d726e3794c6efe352))
* CZID-9342 split workflowRuns endpoint based on ids field ([#101](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/101)) ([a2d3a31](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/a2d3a31ff9ec4d7487474741520cd8a0dce463fd))
* Feature Flag based routing ([#44](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/44)) ([f7c9999](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f7c999941b8a6f087508bcd73a19ebddc975b8fe))
* Federate sequencingReads and consensusGenomes ([#102](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/102)) ([0239be8](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/0239be8108d128ef183e3a5752c42b660a2120fc))
* federate WorkflowsAggregate endpoint ([#108](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/108)) ([9001540](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9001540400c35d63220809dc8e81021b3d4eb445))


### Bug Fixes

* Revert "feat: Feature Flag based routing" ([#109](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/109)) ([c9bede2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c9bede224fb23d4e26f18f027bf832d224a1918f))

## [2.10.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.9.0...v2.10.0) (2024-02-12)


### Features

* Switch mode to basic to improve performance of unpaginated Rails request ([#97](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/97)) ([ed41e0c](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/ed41e0cc516559342235092da8e4bed41feabba2))

## [2.9.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.8.0...v2.9.0) (2024-02-08)


### Features

* Federate CreateBulkDownload Endpoint ([#91](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/91)) ([6f85f6a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/6f85f6ae58b532e4d199a0fb56428176023ae5c8))

## [2.8.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.7.0...v2.8.0) (2024-02-08)


### Features

* Federate the samples NextGen field ([#85](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/85)) ([946d7dc](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/946d7dc259d1f7f8f22e716b6317fc5f7433408b))
* Federate workflowRuns endpoint ([#89](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/89)) ([3e15fac](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/3e15fac558eda082a4e3bdb7489eac9ed0c71e5f))


### Bug Fixes

* Revert "feat: [CZID-9279] Add entities to graphql sources" ([#94](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/94)) ([214d344](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/214d344e80c078c72547c8bd774a14b1acad501c))
* Update snapshot to fix tests ([#95](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/95)) ([db56d3d](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/db56d3d3e1122ca7af49fb2718d7c60cb31d6b83))

## [2.7.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.6.1...v2.7.0) (2024-02-02)


### Features

* [CZID-9279] Add entities to graphql sources ([#88](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/88)) ([8e38c3a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/8e38c3aa9dc62703f0850bac8be438ae71d821b4))

## [2.6.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.6.0...v2.6.1) (2024-01-30)


### Bug Fixes

* **ci:** Pin happy stack eks to working version ([#83](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/83)) ([c172a25](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c172a250b11b7242fe00f1a431ed7c60d5f3b1b1))

## [2.6.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.5.0...v2.6.0) (2024-01-29)


### Features

* allow manual staging deploy, re-enable prod deploy ([#82](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/82)) ([c1a07ce](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c1a07cefad79200c108d8055907c1ef8a51b5995))
* **ci:** Align release process to CZ ID manual release cadence ([#72](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/72)) ([83c97c6](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/83c97c68f952e40bba7a7aeca0b576b762d88c66))
* move get release tag into composite action ([#79](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/79)) ([ef26dcf](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/ef26dcfed522126a22afcb6018923083a8ce5f6e))


### Bug Fixes

* Access tag name path correctly ([#77](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/77)) ([60ba125](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/60ba125c7e4387a66dd40de195e3a32432c063ad))
* Checkout repo with release tag from action ([#80](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/80)) ([232a351](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/232a3513e9997a6ab6a95e74fc072ed8893d4c45))
* pass requested release tag to action ([#81](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/81)) ([f7c2bb3](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f7c2bb393ea04ef4bf48d7f9b6537af6742ebc1a))
* quote release tag ([#78](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/78)) ([929ebf5](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/929ebf5f08fffde192ab548b2ce5446de0bdcaef))

## [2.5.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.4.0...v2.5.0) (2024-01-12)


### Features

* add MetadataValues query ([#54](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/54)) ([721f8b0](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/721f8b00dddf30bf4c04d81b50c627b9fe8c8229))
* Add URL's for entities & workflows services in local dev ([#63](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/63)) ([26442d4](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/26442d4cf981f3c2550dba83d9047067f776e87e))


### Bug Fixes

* add missing property to location file ([#64](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/64)) ([c08a63d](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/c08a63dda5641cad5d16be386b7a0b0230946b34))
* adding multiple location types and Update metadata values ([#60](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/60)) ([9af53fe](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9af53fe5d9b8c0f88659014e054c430f708e1cfd))
* Change ercc_comparison type from integer to float ([#59](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/59)) ([108e0ad](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/108e0ad2cebbd8c3ba80bf7860b6602a68dbb197))

## [2.4.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.3.0...v2.4.0) (2023-12-19)


### Features

* add metadata-fields endpoint ([#50](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/50)) ([3c16bfc](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/3c16bfccb2bb2f1790172e0d6b7f6c893d7bf202))
* Add two distinct endpoints for notes and name ([#47](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/47)) ([353bea2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/353bea20afba187d201803107005899e352a7065))
* **ci:** Set ALLOWED_CORS_ORIGINS app config ([#52](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/52)) ([bc4e48b](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/bc4e48bdcf42dcf6a4b838e03afde8426fc3279d))

## [2.3.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.2.0...v2.3.0) (2023-12-15)


### Features

* added save_metadata_v2 endpoint ([#43](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/43)) ([4d692c0](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/4d692c026a7820ff9c1aa88b1d0464f9c95c8ea2))

## [2.2.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.1.1...v2.2.0) (2023-12-14)


### Features

* restrict CORS origin for graphQL mesh ([#38](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/38)) ([2aa22e6](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/2aa22e639e2cf943b380c1a044bb806687b128c6))

## [2.1.1](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.1.0...v2.1.1) (2023-12-11)


### Bug Fixes

* update KickoffWGSWorkflow response id field  ([#39](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/39)) ([5f5e096](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/5f5e09666763a4567af6e3b7189250504e136b9c))

## [2.1.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v2.0.0...v2.1.0) (2023-12-07)


### Features

* Add CSRF prevention plugin ([#13](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/13)) ([64c8215](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/64c82152fd8c48575c52441be2896fb432a97e67))
* federated /workflow_runs/{args.workflowRunId}/zip_link.json ([#25](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/25)) ([e97ab08](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e97ab08450dbfe25267bad6ccf6a067fd2293386))


### Bug Fixes

* Change schema back to next gen format ([#28](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/28)) ([0771869](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/0771869d8aeb5aab0ef5d652947e45d85fcd9ab1))
* ConsensusGenomeWorkflowResults - add fall back for null values ([#34](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/34)) ([17d3193](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/17d3193bb304dda06b0faf5415020dd86147073a))
* Updated schema for kick off workflow ([#27](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/27)) ([9939a7b](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/9939a7b6b25f15eec38636d3fa2247d9157f3844))
* updates to ConsensusGenomeWorkflowResults type ([#33](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/33)) ([b25922a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/b25922a1cbda73bfe2811558489b5c8e2f8545b8))

## [2.0.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.7.0...v2.0.0) (2023-11-28)


### ⚠ BREAKING CHANGES

* swap sampleId type to ID to support QualityControlQuery ([#21](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/21))

### Features

* swap sampleId type to ID to support QualityControlQuery ([#21](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/21)) ([532a648](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/532a6488c4cbafa23f980fd126938bfdb1492322))

## [1.7.0](https://github.com/chanzuckerberg/czid-graphql-federation-server/compare/v1.6.0...v1.7.0) (2023-11-21)


### Features

* added coverage viz summary ([#4](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/4)) ([e20662e](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/e20662efd6b8504312ef1dc5bbb1d43b3f0cf358))
* added kickoff_workflow ([#9](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/9)) ([65ede16](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/65ede161c23ee775058cffd31df150472317ddfd))
* **ci:** promote images from staging when deploying to prod ([#5](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/5)) ([3854cbf](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/3854cbf33ab245c466d53cf1a2444a325d64b70f))
* enable additional variables for PipelineData ([#15](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/15)) ([4c23ca7](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/4c23ca780c2481bdae72cb88d19edb810705db38))
* federeated /samples/validate_users_can_delete_objects ([#14](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/14)) ([106dc4a](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/106dc4a7bc9fd4d5273881ee0a65ccf9a5108d80))


### Bug Fixes

* updated all json schemas  ([#22](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/22)) ([bb397de](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/bb397decb41713ae01870979536b25c6be6f271d))


### Reverts

* "chore: swap sampleId type to ID to support QualityControlQuery" ([#20](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/20)) ([078b0c2](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/078b0c2230ef0f3818372614ccf45b2df57f6066))

## 1.6.0 (2023-11-02)


### Features

* Pass CSRF token when querying CZID Rails graphql ([#10](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/10)) ([cf9b8db](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/cf9b8db24428a8addaaacb8c9bbaf006fb1036d6))


### Miscellaneous Chores

* release 1.6.0  ([#12](https://github.com/chanzuckerberg/czid-graphql-federation-server/issues/12)) ([f805fca](https://github.com/chanzuckerberg/czid-graphql-federation-server/commit/f805fcaab1870800e69f8b6047763df4c39740e6))

## 1.5.0 (2023-10-23)

### **Release tags and commits not available for version 1.5.0 and below**

### Features

* **api:** federate samples/bulk_delete
* **api:** support snapshot links

## 1.4.1 (2023-10-20)


### Bug Fixes

* **cd:** revert promote staging images to prod

## 1.4.0 (2023-10-13)


### Features

* **cd:** promote staging images to prod

## 1.3.0 (2023-10-10)


### Features

* **ci:** Update stack names and parameterize sensitive infrastructure info

## 1.2.1 (2023-10-06)


### Bug Fixes

* **ci:** remove staging image promotion in prod deploy

## 1.2.0 (2023-10-06)


### Features

* **api:** federate GET '/samples/{sampleId}/report_v2' endpt
* **ci:** improve release flow for graphql federation
* support /samples/[sampleId]/report_v2 url params


### Bug Fixes

* api url for local and deployed environments
* **ci:** use correct env for happy config in deploy staging and prod workflows * release fix taxon schema

## 1.1.1 (2023-09-29)


### Bug Fixes

* **ci:** deploy-prod action should deploy release tag, not main

## 1.1.0 (2023-09-28)


### Features

* **api:** federate GET  '/samples/index_v2' endpt
* **api:** federate GET  '/samples/index_v2' endpt
* **api:** federate GET '/samples/{sampleId}.json' endpt
* **api:** federate GET '/samples/{sampleId}/amr.json' endpt
* **api:** federate GET '/workflow_runs/{workflowRunId}/results' endpt

## 1.0.0 (2023-08-11)


### Features

* add new sandbox happy env
* add prod release workflow
* happy setup for dev,staging,prod

### Bug Fixes

* service needs to be the same name
* service needs to be the same name

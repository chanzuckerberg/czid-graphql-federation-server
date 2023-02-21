.PHONY: help
help: ## display help for this makefile
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build ## Run tests
build:
	docker compose build

.PHONY: test ## Run tests
test:
	docker compose run --rm gql npm test

.PHONY: local-init ## Run tests
local-init:
	docker compose up -d

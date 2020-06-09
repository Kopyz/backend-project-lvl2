publish:
	npm publish --dry-run

lint:
	npx eslint .

install: install-deps

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test

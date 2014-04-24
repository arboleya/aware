MVERSION=node_modules/mversion/bin/version
VERSION=`$(MVERSION) | sed -E 's/\* package.json: //g'`

GHFM=node_modules/ghfm/bin/ghfm
ISTANBUL=node_modules/istanbul/lib/cli.js
MOCHA=node_modules/mocha/bin/mocha
_MOCHA=node_modules/mocha/bin/_mocha
COVERALLS=node_modules/coveralls/bin/coveralls.js


setup:
	@npm install



test:
	@$(MOCHA)

test.coverage:
	@$(ISTANBUL) cover $(_MOCHA)

test.coverage.preview: test.coverage
	@cd coverage/lcov-report && python -m SimpleHTTPServer 8080

test.coverage.coveralls: test.coverage
	@sed -i.bak \
		"s/^.*aware\/lib/SF:lib/g" \
		coverage/lcov.info

	@cat coverage/lcov.info | $(COVERALLS)


readme:
	$(GHFM) README.md


bump.minor:
	@$(MVERSION) minor

bump.major:
	@$(MVERSION) major

bump.patch:
	@$(MVERSION) patch



publish:
	git tag $(VERSION)
	git push origin $(VERSION)
	git push origin master
	npm publish

.PHONY: test
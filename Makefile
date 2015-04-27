################################################################################
# executables
################################################################################

MVERSION=node_modules/mversion/bin/version
ISTANBUL=node_modules/istanbul/lib/cli.js
MOCHA=node_modules/mocha/bin/mocha
_MOCHA=node_modules/mocha/bin/_mocha
COVERALLS=node_modules/coveralls/bin/coveralls.js
CODECLIMATE=node_modules/.bin/codeclimate

################################################################################
# variables
################################################################################

VERSION=`egrep -o '[0-9\.]{3,}' package.json -m 1`

################################################################################
# setup everything for development
################################################################################

setup:
	@npm install

################################################################################
# tests
################################################################################

# run test
test:
	@$(MOCHA)

# run tests and generates coverage
test.coverage:
	@$(ISTANBUL) cover $(_MOCHA)

# run tests, generates coverage and start up a simple server
test.coverage.preview: test.coverage
	@cd coverage/lcov-report && python -m SimpleHTTPServer 8080

# test code, generates coverage and send it to coveralls and codeclimate
test.coverage.coveralls: test.coverage
	@$(CODECLIMATE) < coverage/lcov.info
	@cat coverage/lcov.info | $(COVERALLS)

################################################################################
# manages version bumps
################################################################################

bump.minor:
	@$(MVERSION) minor

bump.major:
	@$(MVERSION) major

bump.patch:
	@$(MVERSION) patch

################################################################################
# publish / re-publish
################################################################################

publish:
	git tag -a $(VERSION) -m "Releasing $(VERSION)"
	git push origin master --tags
	npm publish

################################################################################
# OTHERS
################################################################################

.PHONY: test
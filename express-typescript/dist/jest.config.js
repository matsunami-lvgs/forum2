"use strict";
module.exports = {
    verbose: true,
    collectCoverage: true,
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    setupFilesAfterEnv: [
        `${process.cwd()}/jest.setup.js`
    ]
};

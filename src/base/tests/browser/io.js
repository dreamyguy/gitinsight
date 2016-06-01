module.exports = {
    before : function(browser) {
        browser
            .url(browser.globals.path)
            .waitForElementVisible("body", browser.globals.wait.body);
    },
    after : function(browser) {
        browser
            .end();
    }
};

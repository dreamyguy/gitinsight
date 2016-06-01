module.exports = {
    "Section - About" : function (browser) {
        browser
            .verify.elementPresent("section.about", "Section 'About' wrapper is present")
            .verify.elementPresent("section.about .section-image", "Section 'About' image is present")
            .verify.visible("section.about .section-image", "Section 'About' image is visible")
            .verify.elementPresent("section.about .heading-one", "Section 'About' heading is present")
            .verify.containsText("section.about .heading-one", "Gitinsight", "Section 'About' heading's has correct text")
            .verify.elementPresent("section.about .heading-three", "Section 'About' sub-heading is present")
            .verify.containsText("section.about .heading-three", "'git log' Visualiser", "Section 'About' heading's has correct text")
            .verify.elementPresent("section.about .link-to-source-code", "Link to source code is present")
            .verify.containsText("section.about .link-to-source-code", "the source code for this page on GitHub", "Link to source code has correct text")
            .click("section.about .link-to-source-code")
            .pause(browser.globals.wait.pause)
            .verify.urlEquals("https://github.com/dreamyguy/gitinsight", "The correct URL was opened when clicking on the link -> https://github.com/dreamyguy/gitinsight")
            .back()
    }
};

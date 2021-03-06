/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensured it has a URL defined
         * and that the URL is not empty.
         */
         it('URL defined and not empty', function() {
             allFeeds.forEach(function(feed) {
                feedLink = feed.url;
                expect(feedLink).toBeDefined();
                expect(feedLink.length).not.toBe(0);
            });
         });

        /* Wrote a test that loops through each feed
         * in the allFeeds object and ensured it has a name defined
         * and that the name is not empty.
         */
         it('name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
        });
    });


    /* Wrote a new test suite named "The menu" */
    describe('The menu', function() {
        /* Wrote a test that ensures the menu element is
         * hidden by default. Analyzed the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('menu is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
         /* Wrote a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('menu changes when icon is clicked', function () {
            const menuIcon = document.querySelector('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
      });

    /* Wrote a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Wrote a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('single entry element within feed container', function() {
             expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });
    /* Wrote a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var testFeed;
        /* Wrote a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
         beforeEach(function(done) {
             loadFeed(0, function() {
                 // store old feed
                 testFeed = $('.feed').html();
                 // fetch newer feed
                 loadFeed(1, done);
             });
         });

         it('content changes', function() {
             expect($('.feed').html()).not.toBe(testFeed);
         });
     });

}());

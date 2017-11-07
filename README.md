**Author**: Robert Reed
**Version**: 1.10.15

## Overview
We are building a blog site to the designer's specifications. We were to mirror a few images of the sample site provided by the customer.

## Getting Started
## Day 1
We were given starter code with the html file completed. You would have to layout a CSS structure in which to build the design.
1. Normalize the CSS in vendor styles folder
1. Add SMACCS style files like base.css, layout.css, modules.css
1. Link them all in the head of the html
1. Set the viewport metatag in html
1. Starting with a topdown approach create the styles for the mobile version of the site
1. Again with a topdown approach, create the styles for the full version of the site
## Day 2
1. Removed all articles from the Dom and used Nicholas and Rob's CSS to style the new page for Nicholas and Fred
1. Completed the `Article()` constructor and created instances by assigning all of the properties of each data object to properties of `this`
1. Completed the `toHtml()` method, which renders each article instance to the DOM
1. Articles are now sorted by date
1. Added the necessary script tag to include jQuery in the app
1. Utilized jQuery functionality to modify the display property of DOM elements
1. Utilized jQuery functionality to traverse the DOM and completed the HTML template for the articles
1. Refactored all `for` loops using the `.forEach()` method
## Day 3
1. Refactored all the concatenation into template literals
1. Created selector menus and functionality for those menus
1. Created tab selectors that hid and showed elements of the dom
## Day 4
1. Refactored the template into handlebar notation.
1. Refactored most of our functions into fat arrow notation.
## Day 6
1. Loaded raw data into localStorage.
1. Created function to write articles from localStorage into DOM.
1. Created header eTag to reference changes with local and "remote" data.
## Day 7
1. Included the Static resources to point express to the public content available to the client
1. Initialized project using npm, creating and populating package.json and package-lock.json
1. Required the expressjs package
1. Refactored a bunch of functions to arrow functions
1. Reviewed new code and commented on their function on their stack trace
## Day 8
1. initialized the server through node
1. required pg dependency
1. Commented on the stack flow of our server functions
## Day 9
1. Wrote sql queries for get put and post
## Day 10
1. Refactored modules into IIFEs
1. Refactored methods using functional programming techniques
1. Built an Admin page to track and display statistics

## Architecture
We used CSS and modified an html file already given to us. We imported a normalized CSS file from https://github.com/necolas/normalize.css/
We use node  via an express library to initialize the server

## Change Log
1. Initial folder setup
1. Added constring to server.js
1. article.js IIFE
1. Article.loadAll refactored
1. function calls fixed in index.html and new.html
1. wrote Article.numWordsAll
1. wrote Article.allAuthors
1. fixed Article.numAllWords and wrote Artic;e.numWordsByAuthor
1. Wrapped articleView in an IIFE
1. completed articleView.js
1. lab fully functioning
1. tweaked regex to fix word count issues

## Credits and Collaborations

Today's build concepts were discussed with Seth Donohue.

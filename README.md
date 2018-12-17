# LibreChurch Website

This site is based on the evie template: Project site: https://evie.undraw.co

An MIT licensed template bundled with a minimal style guide to build websites faster, especially combined with illustrations from [unDraw](https://undraw.co). It is extemely lightweight, customizable and works perfectly on modern browsers.

## Setup

1. Install node and npm
2. Install NetBeans 8.2 (9.0 does not seem to support HTML5/JS and node yet)
3. Checkout the project only using git (without using NetBeans)
4. run ```npm install``` within the project dir
5. Start NetBeans and configure its preferences (HTML5 pane) to make it find npm and node (and gulp)
6. Open the checked out project using NetBeans
6. Install "bartsidee-nb-ejs.nbm" from "netbeans_plugin" directory via "Tools" -> "Plugins" and restart IDE
7. Make NetBeans code highlight the ejs template files correctly (src/docs):
    - Go to Tools -> Options (or Preferences)
    - Click on Miscellaneous Tab then Files tab
    - click the "New" button
    - Type your desire extension without the dot (use ejs, EJS probably already exists).
    - Select the appropriate file type from the "Associated file type (MIME)" drop down box: "Files of EJS (application/x-ejs)"
    - Click "OK", restart IDE and you are done

Srcs:
- https://stackoverflow.com/questions/32218403/how-to-syntax-highlighting-for-ejs-file-in-netbeans
- https://github.com/bartsidee/netbeans-javascript-ejs (compiled manually for LibreChurch)

## Usage

1. Make your changes within the "src" directory.
2. Click the "build" or "run" button of NetBeans.
3. You'll find the generated site meant to be served/deployed inside the "public" directory.
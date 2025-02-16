const apiUrl = 'https://kirche.social/api/v1/accounts/13/statuses?limit=3&exclude_reblogs=true&exclude_replies=true';

async function loadPostwall() {
	const container = document.getElementById('mastodon-container');

	async function fetchPosts() {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Fehler beim Laden der Posts');
			}

			const posts = await response.json();
			renderPosts(posts);
		} catch (error) {
			console.error('Fehler:', error);
			container.innerHTML = '<p>Fehler beim Laden der Posts.</p>';
		}
	};

	function renderPosts(posts) {
		container.innerHTML = '';

		posts.forEach(post => {
			const postDate = new Date(post.created_at).toLocaleString();
			const content = post.content || 'Kein Inhalt verfügbar.';

			const postElement = document.createElement('div');
			postElement.classList.add('step__text');
			postElement.innerHTML = `
				<strong>${postDate}</strong>
				${content}
			`;
			container.appendChild(postElement);
		});
	};

	await fetchPosts();
};

// Equivalent of jQuery .ready
document.addEventListener('DOMContentLoaded', async function () {
	await loadPostwall();

	// Initialize variables
	var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop; // Scroll position of body

	// Listener to resizes
	window.onresize = function(event) {
    	lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
	};

	// Helper functions
	// Detect offset of element
	function getOffset( el ) {
		var _x = 0;
		var _y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	};

	// Add class to element => https://www.sitepoint.com/add-remove-css-class-vanilla-js/
	function addNewClass(elements, myClass) {
		// if there are no elements, we're done
		if (!elements) { return; }
		// if we have a selector, get the chosen elements
		if (typeof(elements) === 'string') {
			elements = document.querySelectorAll(elements);
		}
		// if we have a single DOM element, make it an array to simplify behavior
		else if (elements.tagName) { elements=[elements]; }
		// add class to all chosen elements
		for (var i=0; i<elements.length; i++) {
			// if class is not already found
			if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {
			// add class
			elements[i].className += ' ' + myClass;
			}
		}
	};

	// Remove class from element => https://www.sitepoint.com/add-remove-css-class-vanilla-js/
	function removeClass(elements, myClass) {
		// if there are no elements, we're done
		if (!elements) { return; }

		// if we have a selector, get the chosen elements
		if (typeof(elements) === 'string') {
			elements = document.querySelectorAll(elements);
		}
		// if we have a single DOM element, make it an array to simplify behavior
		else if (elements.tagName) { elements=[elements]; }
		// create pattern to find class name
		var reg = new RegExp('(^| )'+myClass+'($| )','g');
		// remove class from all chosen elements
		for (var i=0; i<elements.length; i++) {
			elements[i].className = elements[i].className.replace(reg,' ');
		}
	}
    
    // Responsive mobile menu
	// Create the menu 
	if (document.getElementsByClassName("nav__mobile") && document.getElementsByClassName('nav__mobile').length > 0){
		var navElements = document.getElementsByClassName('navbar__menu')[0].innerHTML;
		document.getElementsByClassName('nav__mobile')[0].innerHTML = navElements;
		// Load 
		var nav = responsiveNav(".nav__mobile", { // Selector
			animate: true, // Boolean: Use CSS3 transitions, true or false
			transition: 284, // Integer: Speed of the transition, in milliseconds
			label: "Menu", // String: Label for the navigation toggle
			insert: "before", // String: Insert the toggle before or after the navigation
			customToggle: "toggle", // Selector: Specify the ID of a custom toggle
            closeOnNavClick: true, // Bool: Close menu after clicking on a link
			openPos: "relative", // String: Position of the opened nav, relative or static
			navClass: "nav__mobile", // String: Default CSS class. If changed, you need to edit the CSS too!
		});
	} else {
		 addNewClass(document.querySelector('.navbar__menu'),'navbar__menu--noMob');
		 addNewClass(document.querySelector('.navbar__menu-mob'), 'navbar__menu-mob--noMob');
	};	

	// Smooth scrolling => https://codepen.io/andylobban/pen/qOLKVW
	if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
		// Function to animate the scroll
		var smoothScroll = function (anchor, duration) {
            // Calculate how far and how fast to scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop - 40; // Remove 40 pixels for padding
            var distance = endLocation - startLocation;
            var increments = distance/(duration/4);
            
            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function () {
                window.scrollBy(0, increments);

                var travelled = window.pageYOffset;

                // Stop animation when endLocation is reached
                // Either when scrolling down or up or end of document
                if ((increments >= 0 && (travelled >= (endLocation - increments))) ||
                        (increments < 0 && (travelled <= endLocation))) {
                    clearInterval(runAnimation);
                }
            };
            
            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 4);
        };
        
		// Define smooth scroll links
		var scrollToggle = document.querySelectorAll('.scroll');
		// For each smooth scroll link
		[].forEach.call(scrollToggle, function (toggle) {
			// When the smooth scroll link is clicked
			toggle.addEventListener('click', function(e) {
                // Prevent the default link behavior
                e.preventDefault();
                
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID + ".landing__section");
                var dataSpeed = toggle.getAttribute('data-speed');
                
                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 700);
                }
            }, false);
		});
	}

	
    // Listen to scroll position changes
    window.addEventListener("scroll", function () {

        // NAVIGATION BAR ON LANDING FIXED
        // If there is a #navConverter element then attach listener to scroll events
        if (document.body.contains(document.getElementById("navConverter"))) {
            var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // if the current body position is less than 20 pixels away from our converter, convert
            if (lastScrollTop > (getOffset(document.getElementById('navConverter')).top - 60)) {
                removeClass(document.querySelector('.navbar'), 'navbar--extended');
            } else {
                addNewClass(document.querySelector('.navbar'), 'navbar--extended');
            }
        }

        // SCROLL TO NEXT ELEMENT ON LANDING
        if (document.body.contains(document.getElementById('scrollToNext'))) {
            var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // if the current body position is less than 20 pixels away from the top, hide the icon
            if (lastScrollTop > 20) {
                addNewClass(document.getElementById('scrollToNext'), 'invisible');
            } else {
                removeClass(document.getElementById('scrollToNext'), 'invisible');
            }
        }
    });
});
/*! responsive-nav.js 1.0.40 (with fix for LibreChurch project)
 * https://github.com/viljamis/responsive-nav.js
 * http://responsive-nav.com
 *
 * Copyright (c) 2015 @viljamis
 * Available under the MIT license
 Licensed under the MIT license.
 
 Copyright (c) 2013 Viljami Salminen, http://viljamis.com/
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* global Event */
(function (document, window, index) {
    // Index is used to keep multiple navs on the same page namespaced

    "use strict";

    var responsiveNav = function (el, options) {

        var computed = !!window.getComputedStyle;

        /**
         * getComputedStyle polyfill for old browsers
         */
        if (!computed) {
            window.getComputedStyle = function (el) {
                this.el = el;
                this.getPropertyValue = function (prop) {
                    var re = /(\-([a-z]){1})/g;
                    if (prop === "float") {
                        prop = "styleFloat";
                    }
                    if (re.test(prop)) {
                        prop = prop.replace(re, function () {
                            return arguments[2].toUpperCase();
                        });
                    }
                    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
                };
                return this;
            };
        }
        /* exported addEvent, removeEvent, getChildren, setAttributes, addClass, removeClass, forEach */

        /**
         * Add Event
         * fn arg can be an object or a function, thanks to handleEvent
         * read more at: http://www.thecssninja.com/javascript/handleevent
         *
         * @param  {element}  element
         * @param  {event}    event
         * @param  {Function} fn
         * @param  {boolean}  bubbling
         */
        var addEvent = function (el, evt, fn, bubble) {
            if ("addEventListener" in el) {
                // BBOS6 doesn't support handleEvent, catch and polyfill
                try {
                    el.addEventListener(evt, fn, bubble);
                } catch (e) {
                    if (typeof fn === "object" && fn.handleEvent) {
                        el.addEventListener(evt, function (e) {
                            // Bind fn as this and set first arg as event object
                            fn.handleEvent.call(fn, e);
                        }, bubble);
                    } else {
                        throw e;
                    }
                }
            } else if ("attachEvent" in el) {
                // check if the callback is an object and contains handleEvent
                if (typeof fn === "object" && fn.handleEvent) {
                    el.attachEvent("on" + evt, function () {
                        // Bind fn as this
                        fn.handleEvent.call(fn);
                    });
                } else {
                    el.attachEvent("on" + evt, fn);
                }
            }
        },
                /**
                 * Remove Event
                 *
                 * @param  {element}  element
                 * @param  {event}    event
                 * @param  {Function} fn
                 * @param  {boolean}  bubbling
                 */
                removeEvent = function (el, evt, fn, bubble) {
                    if ("removeEventListener" in el) {
                        try {
                            el.removeEventListener(evt, fn, bubble);
                        } catch (e) {
                            if (typeof fn === "object" && fn.handleEvent) {
                                el.removeEventListener(evt, function (e) {
                                    fn.handleEvent.call(fn, e);
                                }, bubble);
                            } else {
                                throw e;
                            }
                        }
                    } else if ("detachEvent" in el) {
                        if (typeof fn === "object" && fn.handleEvent) {
                            el.detachEvent("on" + evt, function () {
                                fn.handleEvent.call(fn);
                            });
                        } else {
                            el.detachEvent("on" + evt, fn);
                        }
                    }
                },
                /**
                 * Get the children of any element
                 *
                 * @param  {element}
                 * @return {array} Returns matching elements in an array
                 */
                getChildren = function (e) {
                    if (e.children.length < 1) {
                        throw new Error("The Nav container has no containing elements");
                    }
                    // Store all children in array
                    var children = [];
                    // Loop through children and store in array if child != TextNode
                    for (var i = 0; i < e.children.length; i++) {
                        if (e.children[i].nodeType === 1) {
                            children.push(e.children[i]);
                        }
                    }
                    return children;
                },
                /**
                 * Sets multiple attributes at once
                 *
                 * @param {element} element
                 * @param {attrs}   attrs
                 */
                setAttributes = function (el, attrs) {
                    for (var key in attrs) {
                        el.setAttribute(key, attrs[key]);
                    }
                },
                /**
                 * Adds a class to any element
                 *
                 * @param {element} element
                 * @param {string}  class
                 */
                addClass = function (el, cls) {
                    if (el.className.indexOf(cls) !== 0) {
                        el.className += " " + cls;
                        el.className = el.className.replace(/(^\s*)|(\s*$)/g, "");
                    }
                },
                /**
                 * Remove a class from any element
                 *
                 * @param  {element} element
                 * @param  {string}  class
                 */
                removeClass = function (el, cls) {
                    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
                    el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g, "");
                },
                /**
                 * forEach method that passes back the stuff we need
                 *
                 * @param  {array}    array
                 * @param  {Function} callback
                 * @param  {scope}    scope
                 */
                forEach = function (array, callback, scope) {
                    for (var i = 0; i < array.length; i++) {
                        callback.call(scope, i, array[i]);
                    }
                };

        var nav,
                opts,
                navToggle,
                styleElement = document.createElement("style"),
                htmlEl = document.documentElement,
                hasAnimFinished,
                isMobile,
                navOpen;

        var ResponsiveNav = function (el, options) {
            var i;

            /**
             * Default options
             * @type {Object}
             */
            this.options = {
                animate: true, // Boolean: Use CSS3 transitions, true or false
                transition: 284, // Integer: Speed of the transition, in milliseconds
                label: "Menu", // String: Label for the navigation toggle
                insert: "before", // String: Insert the toggle before or after the navigation
                customToggle: "", // Selector: Specify the ID of a custom toggle
                closeOnNavClick: false, // Boolean: Close the navigation when one of the links are clicked
                openPos: "relative", // String: Position of the opened nav, relative or static
                navClass: "nav-collapse", // String: Default CSS class. If changed, you need to edit the CSS too!
                navActiveClass: "js-nav-active", // String: Class that is added to <html> element when nav is active
                jsClass: "js", // String: 'JS enabled' class which is added to <html> element
                init: function () {}, // Function: Init callback
                open: function () {}, // Function: Open callback
                close: function () {}               // Function: Close callback
            };

            // User defined options
            for (i in options) {
                this.options[i] = options[i];
            }

            // Adds "js" class for <html>
            addClass(htmlEl, this.options.jsClass);

            // Wrapper
            this.wrapperEl = el.replace("#", "");

            // Try selecting ID first
            if (document.getElementById(this.wrapperEl)) {
                this.wrapper = document.getElementById(this.wrapperEl);

                // If element with an ID doesn't exist, use querySelector
            } else if (document.querySelector(this.wrapperEl)) {
                this.wrapper = document.querySelector(this.wrapperEl);

                // If element doesn't exists, stop here.
            } else {
                throw new Error("The nav element you are trying to select doesn't exist");
            }

            // Inner wrapper
            this.wrapper.inner = getChildren(this.wrapper);

            // For minification
            opts = this.options;
            nav = this.wrapper;

            // Init
            this._init(this);
        };

        ResponsiveNav.prototype = {

            /**
             * Unattaches events and removes any classes that were added
             */
            destroy: function () {
                this._removeStyles();
                removeClass(nav, "closed");
                removeClass(nav, "opened");
                removeClass(nav, opts.navClass);
                removeClass(nav, opts.navClass + "-" + this.index);
                removeClass(htmlEl, opts.navActiveClass);
                nav.removeAttribute("style");
                nav.removeAttribute("aria-hidden");

                removeEvent(window, "resize", this, false);
                removeEvent(window, "focus", this, false);
                removeEvent(document.body, "touchmove", this, false);
                removeEvent(navToggle, "touchstart", this, false);
                removeEvent(navToggle, "touchend", this, false);
                removeEvent(navToggle, "mouseup", this, false);
                removeEvent(navToggle, "keyup", this, false);
                removeEvent(navToggle, "click", this, false);

                if (!opts.customToggle) {
                    navToggle.parentNode.removeChild(navToggle);
                } else {
                    navToggle.removeAttribute("aria-hidden");
                }
            },

            /**
             * Toggles the navigation open/close
             */
            toggle: function () {
                if (hasAnimFinished === true) {
                    if (!navOpen) {
                        this.open();
                    } else {
                        this.close();
                    }
                }
            },

            /**
             * Opens the navigation
             */
            open: function () {
                if (!navOpen) {
                    removeClass(nav, "closed");
                    addClass(nav, "opened");
                    addClass(htmlEl, opts.navActiveClass);
                    addClass(navToggle, "active");
                    nav.style.position = opts.openPos;
                    setAttributes(nav, {"aria-hidden": "false"});
                    navOpen = true;
                    opts.open();
                }
            },

            /**
             * Closes the navigation
             */
            close: function () {
                if (navOpen) {
                    addClass(nav, "closed");
                    removeClass(nav, "opened");
                    removeClass(htmlEl, opts.navActiveClass);
                    removeClass(navToggle, "active");
                    setAttributes(nav, {"aria-hidden": "true"});

                    // If animations are enabled, wait until they finish
                    if (opts.animate) {
                        hasAnimFinished = false;
                        setTimeout(function () {
                            nav.style.position = "absolute";
                            hasAnimFinished = true;
                        }, opts.transition + 10);

                        // Animations aren't enabled, we can do these immediately
                    } else {
                        nav.style.position = "absolute";
                    }

                    navOpen = false;
                    opts.close();
                }
            },

            /**
             * Resize is called on window resize and orientation change.
             * It initializes the CSS styles and height calculations.
             */
            resize: function () {

                // Resize watches navigation toggle's display state
                if (window.getComputedStyle(navToggle, null).getPropertyValue("display") !== "none") {

                    isMobile = true;
                    setAttributes(navToggle, {"aria-hidden": "false"});

                    // If the navigation is hidden
                    if (nav.className.match(/(^|\s)closed(\s|$)/)) {
                        setAttributes(nav, {"aria-hidden": "true"});
                        nav.style.position = "absolute";
                    }

                    this._createStyles();
                    this._calcHeight();
                } else {

                    isMobile = false;
                    setAttributes(navToggle, {"aria-hidden": "true"});
                    setAttributes(nav, {"aria-hidden": "false"});
                    nav.style.position = opts.openPos;
                    this._removeStyles();
                }
            },

            /**
             * Takes care of all even handling
             *
             * @param  {event} event
             * @return {type} returns the type of event that should be used
             */
            handleEvent: function (e) {
                var evt = e || window.event;

                switch (evt.type) {
                    case "touchstart":
                        this._onTouchStart(evt);
                        break;
                    case "touchmove":
                        this._onTouchMove(evt);
                        break;
                    case "touchend":
                    case "mouseup":
                        this._onTouchEnd(evt);
                        break;
                    case "click":
                        this._preventDefault(evt);
                        break;
                    case "keyup":
                        this._onKeyUp(evt);
                        break;
                    case "focus":
                    case "resize":
                        this.resize(evt);
                        break;
                }
            },

            /**
             * Initializes the widget
             */
            _init: function () {
                this.index = index++;

                addClass(nav, opts.navClass);
                addClass(nav, opts.navClass + "-" + this.index);
                addClass(nav, "closed");
                hasAnimFinished = true;
                navOpen = false;

                this._closeOnNavClick();
                this._createToggle();
                this._transitions();
                this.resize();

                /**
                 * On IE8 the resize event triggers too early for some reason
                 * so it's called here again on init to make sure all the
                 * calculated styles are correct.
                 */
                var self = this;
                setTimeout(function () {
                    self.resize();
                }, 20);

                addEvent(window, "resize", this, false);
                addEvent(window, "focus", this, false);
                addEvent(document.body, "touchmove", this, false);
                addEvent(navToggle, "touchstart", this, false);
                addEvent(navToggle, "touchend", this, false);
                addEvent(navToggle, "mouseup", this, false);
                addEvent(navToggle, "keyup", this, false);
                addEvent(navToggle, "click", this, false);

                /**
                 * Init callback here
                 */
                opts.init();
            },

            /**
             * Creates Styles to the <head>
             */
            _createStyles: function () {
                if (!styleElement.parentNode) {
                    styleElement.type = "text/css";
                    document.getElementsByTagName("head")[0].appendChild(styleElement);
                }
            },

            /**
             * Removes styles from the <head>
             */
            _removeStyles: function () {
                if (styleElement.parentNode) {
                    styleElement.parentNode.removeChild(styleElement);
                }
            },

            /**
             * Creates Navigation Toggle
             */
            _createToggle: function () {

                // If there's no toggle, let's create one
                if (!opts.customToggle) {
                    var toggle = document.createElement("a");
                    toggle.innerHTML = opts.label;
                    setAttributes(toggle, {
                        "href": "#",
                        "class": "nav-toggle"
                    });

                    // Determine where to insert the toggle
                    if (opts.insert === "after") {
                        nav.parentNode.insertBefore(toggle, nav.nextSibling);
                    } else {
                        nav.parentNode.insertBefore(toggle, nav);
                    }

                    navToggle = toggle;

                    // There is a toggle already, let's use that one
                } else {
                    var toggleEl = opts.customToggle.replace("#", "");

                    if (document.getElementById(toggleEl)) {
                        navToggle = document.getElementById(toggleEl);
                    } else if (document.querySelector(toggleEl)) {
                        navToggle = document.querySelector(toggleEl);
                    } else {
                        throw new Error("The custom nav toggle you are trying to select doesn't exist");
                    }
                }
            },

            /**
             * Closes the navigation when a link inside is clicked.
             */
            _closeOnNavClick: function () {
                if (opts.closeOnNavClick) {
                    var links = nav.getElementsByTagName("a"),
                            self = this;
                    forEach(links, function (i, el) {
                        addEvent(links[i], "click", function () {
                            if (isMobile) {
                                self.toggle();
                            }
                        }, false);
                    });
                }
            },

            /**
             * Prevents the default functionality.
             *
             * @param  {event} event
             */
            _preventDefault: function (e) {
                if (e.preventDefault) {
                    if (e.stopImmediatePropagation) {
                        e.stopImmediatePropagation();
                    }
                    e.preventDefault();
                    e.stopPropagation();
                    return false;

                    // This is strictly for old IE
                } else {
                    e.returnValue = false;
                }
            },

            /**
             * On touch start we get the location of the touch.
             *
             * @param  {event} event
             */
            _onTouchStart: function (e) {
                if (!Event.prototype.stopImmediatePropagation) {
                    this._preventDefault(e);
                }
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
                this.touchHasMoved = false;

                /**
                 * Remove mouseup event completely here to avoid
                 * double triggering the event.
                 */
                removeEvent(navToggle, "mouseup", this, false);
            },

            /**
             * Check if the user is scrolling instead of tapping.
             *
             * @param  {event} event
             */
            _onTouchMove: function (e) {
                if ((typeof this.startX  === 'number' && typeof this.startY  === 'number') &&
                        (Math.abs(e.touches[0].clientX - this.startX) > 10 ||
                        Math.abs(e.touches[0].clientY - this.startY) > 10))
                {
                    this.touchHasMoved = true;
                }
            },

            /**
             * On touch end toggle the navigation.
             *
             * @param  {event} event
             */
            _onTouchEnd: function (e) {
                this._preventDefault(e);
                if (!isMobile) {
                    return;
                }

                // If the user isn't scrolling
                if (!this.touchHasMoved) {

                    // If the event type is touch
                    if (e.type === "touchend") {
                        this.toggle();
                        return;

                        // Event type was click, not touch
                    } else {
                        var evt = e || window.event;

                        // If it isn't a right click, do toggling
                        if (!(evt.which === 3 || evt.button === 2)) {
                            this.toggle();
                        }
                    }
                }
            },

            /**
             * For keyboard accessibility, toggle the navigation on Enter
             * keypress too.
             *
             * @param  {event} event
             */
            _onKeyUp: function (e) {
                var evt = e || window.event;
                if (evt.keyCode === 13) {
                    this.toggle();
                }
            },

            /**
             * Adds the needed CSS transitions if animations are enabled
             */
            _transitions: function () {
                if (opts.animate) {
                    var objStyle = nav.style,
                            transition = "max-height " + opts.transition + "ms";

                    objStyle.WebkitTransition =
                            objStyle.MozTransition =
                            objStyle.OTransition =
                            objStyle.transition = transition;
                }
            },

            /**
             * Calculates the height of the navigation and then creates
             * styles which are later added to the page <head>
             */
            _calcHeight: function () {
                var savedHeight = 0;
                for (var i = 0; i < nav.inner.length; i++) {
                    savedHeight += nav.inner[i].offsetHeight;
                }

                var innerStyles = "." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened{max-height:" + savedHeight + "px !important} ." + opts.jsClass + " ." + opts.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";

                if (styleElement.styleSheet) {
                    styleElement.styleSheet.cssText = innerStyles;
                } else {
                    styleElement.innerHTML = innerStyles;
                }

                innerStyles = "";
            }

        };

        /**
         * Return new Responsive Nav
         */
        return new ResponsiveNav(el, options);

    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = responsiveNav;
    } else {
        window.responsiveNav = responsiveNav;
    }

}(document, window, 0));
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
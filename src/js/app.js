const apiUrl = 'https://kirche.social/api/v1/accounts/13/statuses?limit=3&exclude_reblogs=true&exclude_replies=true';

async function loadPostwall() {
	const container = document.getElementById('mastodon-container');
	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error('Fehler beim Laden der Posts');
		}
		const posts = await response.json();
		container.innerHTML = '';
		posts.forEach(post => {
			const postDate = new Date(post.created_at).toLocaleString();
			const content = post.content || 'Kein Inhalt verfügbar.';
			const postElement = document.createElement('div');
			postElement.classList.add('step__text');
			postElement.innerHTML = `<strong>${postDate}</strong>${content}`;
			container.appendChild(postElement);
		});
	} catch (error) {
		console.error('Fehler:', error);
		container.innerHTML = '<p>Fehler beim Laden der Posts.</p>';
	}
}

function decodeEmail() {
	const el = document.getElementById('contact-email');
	if (!el) return;
	const coded = "QXjjApa@b1fpnERXpER.Ape";
	const key = "sADB2NtmXRq9EdefWOC0pGTQ8IYUvaVlwiF3PnM7oLSjKZyuhx4czgbJ165rHk";
	const shift = coded.length;
	let link = "";
	for (let i = 0; i < coded.length; i++) {
		if (key.indexOf(coded.charAt(i)) === -1) {
			link += coded.charAt(i);
		} else {
			link += key.charAt((key.indexOf(coded.charAt(i)) - shift + key.length) % key.length);
		}
	}
	el.innerHTML = `Mail an <a href="mailto:${link}">${link}</a>.`;
}

document.addEventListener('DOMContentLoaded', async function () {
	await loadPostwall();
	decodeEmail();

	// Mobile nav toggle
	const navToggle = document.getElementById('nav-toggle');
	const navMenu = document.getElementById('navbar-menu');
	if (navToggle && navMenu) {
		navToggle.addEventListener('click', () => {
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', String(!expanded));
			navMenu.classList.toggle('nav__mobile--open');
		});
		navMenu.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				navToggle.setAttribute('aria-expanded', 'false');
				navMenu.classList.remove('nav__mobile--open');
			});
		});
	}

	// Hide scroll-to-next arrow after user scrolls away from the top
	const scrollToNext = document.getElementById('scrollToNext');
	if (scrollToNext) {
		window.addEventListener('scroll', () => {
			scrollToNext.classList.toggle('invisible', window.scrollY > 20);
		}, { passive: true });
	}
});
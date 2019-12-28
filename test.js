const { JSDOM } = require("jsdom");
const linkifyHash = require(".");

// Since DOM isn't available inside Node.js, we require JSDOM
const { window } = new JSDOM();

global.window = window;
global.document = window.document;

// Polyfill for document.createRange :
// https://github.com/tmpvar/jsdom/issues/317
document.createRange = () => ({
	createContextualFragment(html) {
		const element = document.createElement("template");
		element.innerHTML = html;
		return element.content;
	}
});

const linkifyAsDom = htmlString =>
	document.createRange().createContextualFragment(htmlString);

// Returns HTML contents
const getHTML = dom => {
	const divElement = document.createElement("div");
	divElement.append(dom);
	return divElement.innerHTML;
};

describe("Linkify Hash string tests", () => {
	let hash;
	beforeEach(() => {
		hash = "742752ca4c82c362262dfa069426be88036c819d";
	});

	it("Should return proper string output", () => {
		const userName = "someuser";
		const repoName = "somerepo";
		expect(linkifyHash(hash, { userName, repoName })).toBe(
			`<a href="https://github.com/someuser/somerepo/commit/${hash}">Visit commit</a>`
		);
	});

	it("Should escape HTML tags", () => {
		const options = {
			userName: "<script>HTML_USER</script>",
			repoName: "someRepo",
			attributes: {
				class: "<script>messedUp</script>"
			}
		};

		expect(linkifyHash(hash, options)).toBe(
			`<a href="https://github.com/&lt;script&gt;HTML_USER&lt;/script&gt;/someRepo/commit/${hash}" class=\"&lt;script&gt;messedUp&lt;/script&gt;\">Visit commit</a>`
		);
	});

	it("Should render the attributes correctly", () => {
		const attributes = {
			class: "github",
			target: "_blank"
		};
		expect(
			linkifyHash(hash, {
				userName: "someUser",
				repoName: "someRepo",
				attributes
			})
		).toBe(
			`<a href="https://github.com/someUser/someRepo/commit/${hash}" class="github" target="_blank">Visit commit</a>`
		);
	});

	it("Should change the base URL", () => {
		expect(
			linkifyHash(hash, {
				userName: "someUser",
				repoName: "someRepo",
				baseUrl: "https://google.com"
			})
		).toBe(
			`<a href="https://google.com/someUser/someRepo/commit/${hash}">Visit commit</a>`
		);
	});
});

describe("Linkify Hash DOM tests", () => {
	let hash, userName, repoName;

	beforeEach(() => {
		hash = "742752ca4c82c362262dfa069426be88036c819d";
		userName = "<h1>someUser</h1>";
		repoName = "someRepo";
		type = "dom";
	});

	it("Should return proper DOM rendered element", () => {
		const html = getHTML(
			linkifyHash(hash, {
				userName,
				repoName,
				baseUrl: "https://bing.com",
				type: "dom",
				attributes: {
					class: "<span>someClassName</span>",
					target: "_blank"
				}
			})
		);

		expect(html).toBe(
			getHTML(
				linkifyAsDom(
					`<a href="https://bing.com/&lt;h1&gt;someUser&lt;/h1&gt;/someRepo/commit/${hash}" class="&lt;span&gt;someClassName&lt;/span&gt;" target="_blank">Visit commit</a>`
				)
			)
		);
	});
});

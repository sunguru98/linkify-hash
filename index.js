const createHtmlElement = require("create-html-element");

const linkifyAsDom = htmlString => {
	const fragment = document.createDocumentFragment();
	fragment.append(document.createRange().createContextualFragment(htmlString));
	return fragment;
};

const linkifyAsString = (hash, options) => {
	const { baseUrl, userName, repoName, attributes, html } = options;
	const href = `${baseUrl}/${userName}/${repoName}/commit/${hash}`;
	return createHtmlElement({
		name: "a",
		attributes: {
			href: "",
			...attributes,
			href
		},
		html: html || "Visit commit"
	});
};

module.exports = (hash, options) => {
	// Default options
	options = {
		attributes: {}, // Empty attributes for link
		baseUrl: "https://github.com",
		type: "string", // Default output
		...options
	};

	if (!options.userName && !options.repoName)
		throw new Error("Username and repository names are required");

	if (options.type === "string") return linkifyAsString(hash, options);

	if (options.type === "dom") return linkifyAsDom(linkifyAsString(hash, options));
};

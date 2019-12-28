/// <reference lib="dom"/>

declare namespace linkifyHash {
	interface RegularOptions {
		/**
		 * Github username
		 */
		userName: string;
		/**
		 * Repository name
		 */
		repoName: string;
		/**
		 * Attributes for the HTML link
		 */
		attributes?: {
			[attributeName: string]: string | number | boolean | readonly string[];
		};
		/**
		 * Base URL
		 * @default 'https://github.com'
		 */
		baseUrl?: string;
		/**
		 * Type of the resultant link
		 * `'string'` - Gives a normal string with the HTML
		 * `'dom'` - Gives a DocumentFragemnt with the HTML
		 * @default 'string'
		 */
		type?: "string" | "dom";
	}

	interface DOMOptions extends RegularOptions {
		type: "dom";
	}
}

/**
 * Linkify Hash references.
 * @param hash - Git commit hash (Entire)
 * @param options - Options for creating element
 *
 * @example
 * ```
 * const linkifyHash = require('linkify-hash')
 * const commitHash = '0d7ad26e00ff42e6971f3eb3081503fffd48fe98'
 * 
 * const options = {
 *    userName: 'sunguru98'
 *    repoName: 'AlgoLoad',
 *    attributes: {
 *      class: 'commitHash',
 *      target: '_blank'
 *    }
 * }
 *
 * const htmlString = linkifyHash(commitHash, options)
 * // <a href='https://github.com/sunguru98/AlgoLoad/commit/0d7ad26e00ff42e6971f3eb3081503fffd48fe98' class='commitHash' target='_blank'>Visit commit</a>
 *
 * const fragment = linkifyHash(commitHash, { 
 *    ...options, 
 *    type: 'hash' 
 * })
 * 
 * document.body.appendChild(fragment)
 * ```
 */
declare function linkifyHash(
	hash: string,
	options: linkifyHash.RegularOptions
): string;
declare function linkifyHash(
	hash: string,
	options: linkifyHash.DOMOptions
): DocumentFragment;

export = linkifyHash;

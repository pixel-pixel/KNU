
/**
 * Creates a special structure for resolving CSS properties from plain CSS
 * snippets.
 * Almost all CSS snippets are aliases for real CSS properties with available
 * value variants, optionally separated by `|`. Most values are keywords that
 * can be fuzzy-resolved as well. Some CSS properties are shorthands for other,
 * more specific properties, like `border` and `border-style`. For such cases
 * keywords from more specific properties should be available in shorthands too.

 */
export default function(snippets) {
	return nest( snippets.map(snippet => new CSSSnippet(snippet.key, snippet.value)) );
}

export class CSSSnippet {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.property = null;

		// detect if given snippet is a property
		const m = value && value.match(reProperty);
		if (m) {
			this.property = m[1];
			this.value = m[2];
		}

		this.dependencies = [];
	}

	addDependency(dep) {
		this.dependencies.push(dep);
	}

	get defaultValue() {
		return this.value != null ? splitValue(this.value)[0] : null;
	}

	/**
     * Returns list of unique keywords for current CSS snippet and its dependencies
     * @return {String[]}
     */
	keywords() {
		const stack = [];
		const keywords = new Set();
		let i = 0, item, candidates;

		if (this.property) {
			// scan valid CSS-properties only
			stack.push(this);
		}

		while (i < stack.length) {
			// NB Keep items in stack instead of push/pop to avoid possible
			// circular references
			item = stack[i++];

			if (item.value) {
				candidates = splitValue(item.value).filter(isKeyword);

				// extract possible keywords from snippet value
				for (let j = 0; j < candidates.length; j++) {
					keywords.add(candidates[j].trim());
				}

				// add dependencies into scan stack
				for (let j = 0, deps = item.dependencies; j < deps.length; j++) {
					if (stack.indexOf(deps[j]) === -1) {
						stack.push(deps[j]);
					}
				}
			}
		}

		return Array.from(keywords);
	}
}
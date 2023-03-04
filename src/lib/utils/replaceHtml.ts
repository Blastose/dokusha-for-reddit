export function replaceHtml(text: string) {
	let replaced = text.replace(/&gt;/g, '>');
	replaced = replaced.replace(/&lt;/g, '<');
	replaced = replaced.replace(/&quot;/g, '"');
	replaced = replaced.replace(/&apos;/g, "'");
	replaced = replaced.replace(/&amp;/g, '&');
	replaced = replaced.replace('&#x200B;', '\n');
	return replaced;
}

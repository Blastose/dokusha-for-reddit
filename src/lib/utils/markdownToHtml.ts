import { converter } from 'reddit-md-to-html';

export function markdownToHtml(text: string) {
	return converter(text);
}

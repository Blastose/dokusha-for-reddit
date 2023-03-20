import { converter } from 'reddit-md-to-html';

export function purify(text: string) {
	return converter(text);
}

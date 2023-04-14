import { converter } from 'reddit-md-to-html';
import type { Options } from 'reddit-md-to-html/lib/options';

export function markdownToHtml(text: string, options?: Options) {
	return converter(text, { ...options, addTargetBlank: true });
}

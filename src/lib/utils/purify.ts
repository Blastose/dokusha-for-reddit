import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export function purify(text: string) {
	return DOMPurify.sanitize(marked.parse(text));
}

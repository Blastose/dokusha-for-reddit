import { CLIENT_ID } from '$env/static/private';
import { CLIENT_SECRET } from '$env/static/private';
import { Jsrwrap } from 'jsrwrap';

const jsrwrap = await Jsrwrap.fromApplicationOnlyAuth({
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	grantType: 'client_credentials',
	userAgent: 'web:dokusha-for-reddit:0.1.0 (by /u/blastose)'
});

export { jsrwrap };

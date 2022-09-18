import snoowrap from 'snoowrap';
import { CLIENT_ID } from '$env/static/private';
import { CLIENT_SECRET } from '$env/static/private';

const reddit = await snoowrap.fromApplicationOnlyAuth({
	userAgent: 'Cygnet',
	clientId: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	grantType: 'client_credentials'
});

export default reddit;

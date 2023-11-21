import apicache from 'apicache';

apicache.options({
	headers: {
		'x-apicache-bypass': true
	}
});
const cacheMiddleware = apicache.middleware;
export default cacheMiddleware;

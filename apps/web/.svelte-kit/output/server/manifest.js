export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/NEXON Lv1 Gothic Low OTF Bold.woff","fonts/NEXON Lv1 Gothic Low OTF Light.woff","fonts/NEXON Lv1 Gothic Low OTF.woff"]),
	mimeTypes: {".png":"image/png",".woff":"font/woff"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.8a1fe648.js","imports":["_app/immutable/entry/start.8a1fe648.js","_app/immutable/chunks/index.cb63b41f.js","_app/immutable/chunks/singletons.f6fdef78.js","_app/immutable/chunks/index.7fcf499c.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.f58a3a2c.js","imports":["_app/immutable/entry/app.f58a3a2c.js","_app/immutable/chunks/index.cb63b41f.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const blogJsonUrl = "/blog/md/posts.json?_=" + new Date().getTime();
const HomeView = Vue.extend({
	template: '<div class="home">\
	<div class="post row" v-for="post in posts">\
	<div class="post-meta">{{post.date}}</div>\
	<div class="post-title">\
	<a v-bind:href="post.url">{{post.title}}</a>\
	</div>\
	<div class="post-tags hidden-xs">\
	<a v-bind:href="tag.url" v-for="tag in post.tags">#{{tag.name}}</a>\
	</div>\
	</div>\
	</div>',
	data: function() {
		return {
			posts: []
		}
	},
	watch: {
		'$route': function(to, from) {
			this.init();
		}
	},
	methods: {
		init: function() {
			var that = this;
			NProgress.start();
			$.get(blogJsonUrl, function(data) {
				that.posts = data.posts;
				for (var i = 0; data.posts && i < data.posts.length; i++) {
					var post = data.posts[i];
					if (post && post.file) {
						var postArray = post.file.split("__");
						if (postArray && postArray.length == 2) {
							post.date = postArray[0];
							post.title = postArray[1];
							post.url = "/#/post/" + post.date + "/" + post.title;
							var tags = post.tags;
							post.tags = [];
							if (tags) {
								tags.sort();
							}
							for (var j = 0; tags && j < tags.length; j++) {
								var tag = tags[j];
								if (tag) {
									post.tags.push({
										name: tag,
										url: '/#/tag/' + tag
									});
								}
							}
						}
					}
				}
				that.posts.sort(function(a, b) {
					return a.date < b.date;
				});
				NProgress.done();
			});
		}
	},
	created: function() {
		this.init();
	}
});
const TagView = {
	template: '<div class="home">\
	<div class="post row" v-for="post in posts">\
	<div class="post-meta">{{post.date}}</div>\
	<div class="post-title">\
	<a v-bind:href="post.url">{{post.title}}</a>\
	</div>\
	<div class="post-tags hidden-xs">\
	<a v-bind:href="tag.url" v-for="tag in post.tags">#{{tag.name}}</a>\
	</div>\
	</div>\
	</div>',
	data: function() {
		return {
			posts: []
		}
	},
	watch: {
		'$route': function(to, from) {
			this.init();
		}
	},
	methods: {
		init: function() {
			var that = this;
			var params = that.$route.params;
			var tag = params.tag;
			NProgress.start();
			$.get(blogJsonUrl, function(data) {
				that.posts = [];
				for (var i = 0; data.posts && i < data.posts.length; i++) {
					var post = data.posts[i];
					var tags = post.tags;
					if (!tags || tags.indexOf(tag) < 0) {
						continue;
					}
					if (post && post.file) {
						var postArray = post.file.split("__");
						if (postArray && postArray.length == 2) {
							post.date = postArray[0];
							post.title = postArray[1];
							post.url = "/#/post/" + post.date + "/" + post.title;
							that.posts.push(post);
							post.tags = [];
							if (tags) {
								tags.sort();
							}
							for (var j = 0; tags && j < tags.length; j++) {
								var t = tags[j];
								if (t) {
									post.tags.push({
										name: t,
										url: '/#/tag/' + t
									});
								}
							}
						}
					}
				}
				that.posts.sort(function(a, b) {
					return a.date < b.date;
				});
				NProgress.done();
			});
		}
	},
	created: function() {
		this.init();
	}
};
const PostView = Vue.extend({
	template: '<div class="post-content">\
	<div class="post-title">{{post.title}}</div>\
	<div class="post-meta">Posted on {{post.date}}</div>\
	<div class="post-body" v-html="post.html"></div>\
	<div class="ds-thread" v-bind:data-thread-key="post.title" v-bind:data-title="post.title" v-bind:data-url="post.url"></div>\
	</div>\
	',
	data: function() {
		return {
			post: {
				title: '',
				date: '',
				html: '',
				tags: []
			}
		}
	},
	watch: {
		'$route': function(to, from) {
			this.init();
		}
	},
	methods: {
		init: function() {
			var that = this;
			NProgress.start();
			var params = that.$route.params;
			that.post.title = params.title;
			that.post.date = params.date;
			that.post.url = window.location.host + '/post/' + that.post.title;
			var url = "/blog/md/";
			url += params.date + "__" + params.title;
			url += "/" + params.date + "__" + params.title + ".md";
			$.get(url, function(data) {
				var converter = new showdown.Converter();
				that.post.html = converter.makeHtml(data);
				NProgress.done();
			});
			window.duoshuoQuery = {
				short_name: "yobdc"
			};
			var ds = document.createElement('script');
			ds.type = 'text/javascript';
			ds.async = true;
			ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
			ds.charset = 'UTF-8';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
		}
	},
	created: function() {
		this.init();
	}
});

const router = new VueRouter({
	routes: [{
		path: '/',
		component: HomeView
	}, {
		path: '/post/:date/:title',
		component: PostView
	}, {
		path: '/tag/:tag',
		component: TagView
	}]
})

const app = new Vue({
	router: router
}).$mount('#app');
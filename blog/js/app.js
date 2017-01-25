const HomeView = Vue.extend({
	template: '<div class="home">\
	<div class="post" v-for="post in posts">\
	<div class="post-meta col-xs-2">{{post.date}}</div>\
	<div class="post-title col-xs-10">\
	<a>{{post.title}}</a>\
	</div>\
	</div>\
	</div>',
	data: function() {
		return {
			posts: [{}]
		}
	},
	created: function() {
		var that = this;
		$.get("/blog/posts.json", function(data) {
			that.posts = data.posts;
			for (var i = 0; that.posts && i < that.posts.length; i++) {
				var post = that.posts[i];
				if (post && post.file) {
					var postArray = post.file.split("__");
					if (postArray && postArray.length == 2) {
						post.date = postArray[0];
						post.title = postArray[1];
					}
				}
			}
		});
	}
})
const Post = {
	template: '<div>blog text</div>'
};

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
	routes: [{
		path: '/',
		component: HomeView
	}, {
		path: '/blog/:filename',
		component: Post
	}]
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
	router
}).$mount('#app')

// 现在，应用已经启动了！
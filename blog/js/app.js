const HomeView = Vue.extend({
	template: '<div class="home">\
	<div class="post row" v-for="post in posts">\
	<div class="post-meta col-xs-2">{{post.date}}</div>\
	<div class="post-title col-xs-10">\
	<a v-bind:href="post.url">{{post.title}}</a>\
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
						post.url = "/#/post/" + post.date + "/" + post.title;
					}
				}
			}
		});
	}
})
const Post = Vue.extend({
	template: '',
	data: function() {
		return {
			posts: [{}]
		}
	},
	created: function() {
		var that = this;
	}
});

const router = new VueRouter({
	routes: [{
		path: '/',
		component: HomeView
	}, {
		path: '/post/:date/:title',
		component: Post
	}]
})

const app = new Vue({
	router
}).$mount('#app');
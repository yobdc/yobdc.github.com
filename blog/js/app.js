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
			that.posts.sort(function(a, b) {
				return a.date < b.date;
			});
		});
	}
})
const PostView = Vue.extend({
	template: '<div class="post-content">\
	<div class="post-title">{{post.title}}</div>\
	<div class="post-meta">Posted on {{post.date}}</div>\
	<div class="post-body"></div>\
	</div>',
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
	created: function() {
		var that = this;
		var params = that.$route.params;
		that.post.title = params.title;
		that.post.date = params.date;
		$.get("/blog/md/" + params.date + "__" + params.title + ".md", function(data) {
			var converter = new showdown.Converter();
			that.post.html = converter.makeHtml(data);
			$('.post-body').html(that.post.html);
		});
	}
});

const router = new VueRouter({
	routes: [{
		path: '/',
		component: HomeView
	}, {
		path: '/post/:date/:title',
		component: PostView
	}]
})

const app = new Vue({
	router
}).$mount('#app');
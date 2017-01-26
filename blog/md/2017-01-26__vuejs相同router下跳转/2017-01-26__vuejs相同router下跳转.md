> 最近用vuejs 2.0搭建一个网站前端，发现一个奇怪的现象，相同router不同url参数互相跳转，跳转到的页面并不会运行初始化代码。假设现在定义了一个router，规则是post/:id，页面中会有链接指向另一个post/:id的页面。如果在post/1中点击链接跳转到post/2页面，component是不会运行created的初始化代码。

<br>

#### 解决方法如下：
```javascript
const PostView = Vue.extend({
    template: '<div>{{post.html}}</div>',
    data: function() {
        return {
            post: {
                html: ''
            }
        }
    },
    watch: {
        '$route': function(to, from) {
            var id = this.$route.params.id;
            this.init(id);
        }
    },
    methods: {
        init: function(id) {
            this.post.html = "myinit" + id;
        }
    },
    created: function() {
        this.init();
    }
});

const router = new VueRouter({
    routes: [{
        path: '/post/:id',
        component: PostView
    }]
})
```
关键在于，需要再component中watch $route。每次route跳转至保函当前组件的页面时，便会触发此方法。
```javascript
watch: {
    '$route': function(to, from) {
    }
}
```
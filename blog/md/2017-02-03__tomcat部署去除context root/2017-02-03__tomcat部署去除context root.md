> tomcat中部署webapp，部署后默认的访问路径是带有webapp名称的路径，如[http://localhost:8080/myapp](http://localhost:8080/myapp)。如何才能去除部署工程名称呢？

<br>

#### 1. tomcat/webapps/ROOT
将打包出来的war包重命名为ROOT.war放置于tomcat/webapps目录下。tomcat默认是autodeploy的，启动tomcat时，会将ROOT.war解压部署到tomcat/webapps/ROOT目录中。然后就可以通过[http://localhost:8080](http://localhost:8080)进行访问了。

#### 2. tomcat/conf/server.xml
将myapp.war部署至tomcat/webapps/myapp目录下。修改tomcat/conf/server.xml，在`</Host>`标签之前添加如下代码。
```xml
<Context path="" docBase="myapp">
    <WatchedResource>WEB-INF/web.xml</WatchedResource>
</Context>
```
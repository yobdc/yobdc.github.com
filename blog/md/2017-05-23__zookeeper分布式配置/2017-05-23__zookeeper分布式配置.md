> 192.168.0.101~103是将要部署zookeeper集群的三台服务器ip。首先在192.168.0.101上进行如下操作。

下载最新的稳定版zookeeper，当前版本为3.4.10
```shell
mkdir -p /export/tools
wget http://apache.fayea.com/zookeeper/zookeeper-3.4.10/zookeeper-3.4.10.tar.gz
```

解压至适当位置
```shell
tar zxvf zookeeper-3.4.10.tar.gz
```

复制zoo.cfg文件
```shell
cd /export/tools/zookeeper-3.4.10/conf
cp zoo_sample.cfg zoo.cfg
```

调整zoo.cfg文件，增加以下内容
```shell
dataDir=/export/tools/zookeeper-3.4.10/data
dataLogDir=/export/tools/zookeeper-3.4.10/dataLog
server.1=192.168.0.101
server.2=192.168.0.102
server.3=192.168.0.103
```

dataDir中添加myid文件
```shell
cd /export/tools/zookeeper-3.4.10/data
touch myid
echo 1 > myid
```

将/export/tools/zookeeper-3.4.10目录复制到另外两台机器相同的路径，并修改/export/tools/zookeeper-3.4.10/data/myid文件内容为zoo.cfg所配置的server.?的数字。如192.168.0.102中myid内容为2，192.168.0.103中myid内容为3。

在三台服务器上分别运行`/export/tools/zookeeper-3.4.10/bin/zkServer.sh start`，启动zookeeper服务。可通过`/export/tools/zookeeper-3.4.10/bin/zkServer.sh status`查看状态。

运行zkCli.sh进入交互模式
```shell
/export/tools/zookeeper-3.4.10/bin/zkCli.sh
```

进入交互模式后，添加ip白名单
```shell
setAcl ip:127.0.0.1:crwda,ip:192.168.0.101:crwda,ip:192.168.0.102:crwda,ip:192.168.0.103:crwda
```
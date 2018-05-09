### shuffle 是什么
> shuffle是把数据从map端拉取到reduce端的过程。优化的方式在于两个方面，减少贷款的消耗，减少磁盘的io。

### shuffle过程
> map端：  
1.输入  
2.计算  
3.输出到内存缓冲区  
4.内存缓冲区达到阀值后，输出到磁盘，每次输出生成一个溢写文件，spill  
5.对输出到磁盘的结果做合并，merge  

> reduce端：  
1.从map端拉取数据，copy  
2.从不断的map端copy的数据做merge，先放入内存缓冲区，缓冲满了后放到磁盘

### 如何调优shuffle
> io.sort.mb：map端内存缓冲区的大小，数值越大，spill文件数量越少  
io.sort.spill.percent：内存缓冲区占用比例到达阀值时，写入spill file  
tasktracker.http.threads：map端控制多少个线程向reduce端传输map的输出，可适当调高  
mapred.reduce.parallel.copies：控制reduce端多少个线程copy来自map的输出，可适当调高  
mapred.job.reduce.input.buffer.percent：控制reduce端用于merge的比例，可适当调高  
mapreduce.map.output.compress：启用对map输出进行压缩  
## 浏览器进程

标签之外的一切都由浏览器进程处理。浏览器进程有如绘制浏览器按钮和输入字段的 UI 线程，处理网络堆栈以从互联网接收数据的网络线程，控制文件访问的存储线程等等。当您在地址栏中输入 URL 时，您的输入由浏览器进程的 UI 线程处理。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/browserprocesses.png)

## 导航

### 处理输入

当用户开始在地址栏中输入时，UI 线程询问的第一件事是“这是一个搜索查询还是 URL?”在 Chrome 中，地址栏也是一个关键字搜索，所以 UI 线程需要解析并决定是将你发送到搜索引擎，还是发送到你请求的网站。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/browser-address-input.png)

### 开始导航

当用户按 enter 键时，UI 线程启动一个网络调用来获取站点内容。加载 spinner 显示在选项卡的角落，网络线程通过适当的协议，如 DNS 查找和为请求建立 TLS 连接。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/navstart.png)

此时，网络线程可能会收到一个服务器重定向头，比如 HTTP 301。在这种情况下，网络线程与服务器请求重定向的 UI 线程通信。然后，另一个 URL 请求将被启动。

### 读取响应内容

一旦响应体(有效负载)开始传入，网络线程就会查看流的前几个字节(如果需要的话)。响应的 Content-Type 头应该说明它是什么类型的数据，但由于它可能丢失或错误，因此在这里执行 MIME 类型嗅探。正如源代码中所注释的那样，这是一项“棘手的工作”。您可以阅读注释来了解不同的浏览器是如何对待内容-类型/有效负载对的。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/browser-response.png)

如果响应是 HTML 文件，那么下一步就是将数据传递给渲染程序进程，但是如果是 zip 文件或其他文件，则意味着这是一个下载请求，因此需要将数据传递给 download manager。

![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/browser-sniff.png)

这也是安全浏览（SafeBrowsing) 检查发生的地方。如果域和响应数据似乎与已知的恶意站点相匹配，则网络线程发出警报，显示一个警告页面。另外，交叉源读取阻塞(CORB)检查是为了确保敏感的跨站点数据不会进入渲染程序进程。

### 渲染进程

一旦所有检查都完成，网络线程确信浏览器应该导航到所请求的站点，网络线程就会告诉 UI 线程数据已经准备好了。UI 线程然后找到一个渲染程序进程来进行 web 页面的渲染。
![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/browser-findrenderer.png)
由于网络请求可能需要几百毫秒才能得到响应，因此应用了一种优化方法来加速这个过程。当 UI 线程向网络线程发送 URL 请求时，它已经知道它们正在导航到哪个站点。UI 线程试图主动查找或启动一个与网络请求并行的呈现程序进程。这样，如果一切都如预期的那样进行，当网络线程接收到数据时，渲染器进程已经处于备用位置。如果导航重定向跨站点，可能不会使用这个备用进程，在这种情况下可能需要一个不同的进程。

###

到此数据和渲染进程已经准备好了，浏览器进程发送 IPC 消息到渲染进程以提交导航。同时还传递数据流，以便渲染进程可以继续接收 HTML 数据。一旦浏览器进程听到提交在呈现程序进程中发生的确认，导航就完成了，文档加载阶段开始了。

- [inside-browser-part2](https://developers.google.com/web/updates/2018/09/inside-browser-part2)

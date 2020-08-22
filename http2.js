// http-NG  即 http未来发展趋势和所要面临的挑战
// 存在的问题：实现一个 HTTP 服务器相当的复杂，可扩展性差，有些部分效率不高，依赖TCP/IP 协议设计的，需要有替代协议来提供更多支持，增加在嵌入式和无线应用之中。

// HTTP 标准的瓶颈：
// 1.一条连接上只可发送一个请求
// 2.请求只能从客户端开始。客户端不可以接收除响应以外的指令。
// 3.请求 / 响应首部未经压缩就发送。首部信息越多延迟越大。
// 4.发送冗长的首部。每次互相发送相同的首部造成的浪费较多。
// 5.可任意选择数据压缩格式。非强制压缩发送。

// 利用 Ajax 和 Comet 技术进行通信可以提升 Web 的浏览速度

// 谷歌的 SPDY 旨在解决 HTTP 的性能瓶颈
// Websocket 的出现也是为了解决 HTTP 瓶颈的问题，
// WebSocket 技术主要是为了解决 Ajax 和 Comet 里 XMLHttpRequest 附带的缺陷所引起的问题，可以进行 '双工通信'
// WebDAV 是一个可对 Web 服务器上的内容直接进行文件复制、编辑等操作的分布式文件系统 (例子：云盘 Dropbox)
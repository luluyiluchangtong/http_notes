// Web内容 都是存储在 Web服务器上的， 所以 Web服务器是 Web资源的宿主。
// web 服务器使用的是 http协议， 因此又被称为 http服务器。 http客户端有 web浏览器。
// Web 服务器会为所有 http 对象数据 附加一个MIME（multipurpose Internet mail extension）类型： 
// 即 响应报文 中会有格式类似这样： Content-type:image/jpeg 。。 权威中有 MIME 类型表。
// 协议类型（http://） 被称为 scheme （方案）。。 找服务器地址 ：www.baidu.com。。 找服务器上的某个资源 /special/saw.blade.gif
// 一个 http事务 由一条请求命令 和 一个响应结果 组成。(它们是 http 报文的形式); 报文的传输是通过 TCP 连接进行的。。

// TCP 连接前 须有 DNS 将域名解析为 IP 地址，然后获取服务器上运行的 '特定软件' 的 TCP端口号，即可通过 'IP地址 + 端口号' 进行 TCP 连接。。

// 报文有： 起始行， 首部字段， 主体  (首部字段 和 主体 有空行隔开)
// PUT  DELETE  POST  GET  增 删 改 查。。 记住了，这是基础~~！！！！



// 代理proxy：位于客户端和服务器端之间的 HTTP中间实体。可以对请求和响应进行过滤！！
// 缓存cache： web 缓存 web cache， 代理缓存 proxy cache  '是一种特殊的 HTTP 代理服务器'。
// 网关gateway：'一种特殊的服务器'， 通常用于将 http流量 转换为 其他的协议。
// 隧道tunnel: '是一个  HTTP应用程序'，用来在 两条连接（http,ssl）之间 对 原始数据 进行盲转发。
// Agent 代理：所有发布 Web请求的应用程序，都是 HTTP Agent代理。 除了浏览器，还有 '网络爬虫'，这类自动Agent代理。。
// Internet Service Provider，简称ISP   互联网服务提供商
// 局域网：几台电脑加个 交换机 然后可以通信了
// 广域网：多个局域网加些 路由设备 然后就可以通信了
// 因特网：多个广域网和局域网加了很多 路由设备 就可以通信了

// 显示提供 基础 URL， 文档内使用 base 标签<base href="http://www.example.com/">； 隐式提供 基础URL，即直接再文档内使用相对 URL
// 浏览器有自动扩展 URL 的功能，主机名扩展和历史扩展。 即 输入 baidu， 即可扩展为 www.baidu.com; 以及及时显示历史纪录中的 URL 地址。
// URL 中还需要通过 转义编码 来转义 不安全字符。。  例如： ~   转义成  %7Ejoe；  空格 转义成 %20
// 其中保留字符有:  % # / ？ 。。。。等， 除了在保留场合外使用时，需对它们进行转义。

// 方案： 
// http 默认端口 80； 
// https 默认端口 443；  在http 和 tcp 之间加了一个 加密层 SSL / TSL
// mailto 指向的是 email 地址。 mailto:lzy@outlook.com ;  
// rtsp, rtspu （real time streaming protocol） 实时流传输协议传输 音/视频媒体资源
// ftp 文件传输协议，从FTP服务器上上传，下载文件
// file 指定的主机上可以直接访问的文件
// telnet 程序可以直接和 web 服务器进行对话， Telnet 可以很好的模拟 HTTP 客户端。 用于远程控制
// news ???

// URL 的优点即提供了 统一的命名机制， 供各因特网协议之间共享。 缺点即一旦资源被移走了， URL便不再有效了。
// 实体 就是http 报文所传送的各类 '资源'
// 实体首部和实体主体由一个 空白行 分开。
// 实体首部是用来描述实体的主体的，由 Content-Type    Content-Encoding(数据是否已经被编码了 如 压缩)  

// Content-Length
// 如果主体有进行编码（压缩），就是编码后的大小； HTTP/1.1 中使用Content-Length 时，都是编码后的主体长度。
// 持久连接中 通过Content-Length, 判断报文在何时结束，下一条报文从何处开始，除非使用 分块编码 的情况下，可以没有 content-length
// HTTP/1.1 规定主体没有 content-length，导致服务器无法确定报文长度，就应当返回 400 或  401

// Content-MD5  
// 不同于 摘要认证 中的密码摘要， 实体摘要 即服务端使用 Content-MD5 首部发送对实体进行 MD5运算的结果。客户端先解码，然后再次执行相同的 MD5运算。最后与
// Content-MD5 响应首部 字段值 进行比较。 该首部是 防止对主体 不经意的修改。

// Content-Type  
// 若主体进行了编码，则 content-type 任然是编码之前的实体主体类型
// 多部分表格提交 Content-Type: multipart/form-data; boundary=AaB02x  多部分表格提交 boundary是分隔 主体中不同部分的字符串
// 多部分范围响应 Content-Type: multipart/x-byteranges; boundary= 

// Content-Encoding 
// 内容编码（压缩） Content-Encoding: gzip，， 即服务器对内容进行编码（压缩），发送给客户端。。客户端解码得到原始内容，除了 gzip 还有其他的编码算法。。
// Accept-Encoding  即防止服务器使用客户端 不支持 的编码方式。所以需要的客户端首部 Accept-Encoding: compress;q=0.5, gzip;1=1.0 列出编码方式。逗号分隔！！
// 其中给的参数 q 是优先级。

// 传输编码
// 使用 传输编码 是为了改变报文中的数据在网络上 传输的方式， 编码作用在整个报文上，报文自身的结构发生改变
// Transfer-Encoding: chunked; 这是服务端     TE: chunked; 这是客户端定义可接受的方式  chunked（分块编码）
// 分块编码是报文属性，不同于多部分编码是主体属性
// 分块编码在持久连接中，允许服务器将主体逐块发送，以大小为 0 的 块作为主体结束的信号。客户端也可以发送分块 数据
// 分块报文的拖挂， 拖挂，即分块报文最后 附带的首部字段，报文开始时无法确定的一些首部字段 如 MD5

// 验证码，新鲜度，有条件的请求
// 新鲜度 Expires   Cache-Control
// 使用 Expires时，客户端和服务端 时间的同步 可能需要运行 NTP（网络时间协议）。
// 因此使用 Cache-Control 会更精确，即规定文档从离开服务器开始，相对多少秒内是缓存期。

// 有条件的请求 If-modified-Since/If-Unmodified-Since  If-Match/If-none-Match     验证码 Last-modified   ETag
// 有条件的请求 即比较 副本 和 服务器文档的区别（修改日期，版本号）
// 弱验证码：不一定能够唯一标志资源。 强验证码  则必须如此
// Last-modified 精确度是 1 秒，，而服务器 1秒内可以处理很多次请求。。 所以时 弱验证码
// 而如果只是想美化以下文档，服务器可以在标记前面加上 /w，即意味着，只有当实体在 语义上 发生重大改变时，标记才会变化。

// 范围请求，
// 即客户端请求的中途，连接中断了，则再次发送的请求可以从 中断 的位置开始继续请求剩余的字节。前提是 被请求的文档在这两次请求的时间段内没有改变过。
// 客户端请求设置： Range:bytes = 4000-  响应返回 HTTP/1.1 206 Partial Content；  可以有多个不同范围的请求。
// 服务器端响应设置： Accept-Range: bytes  若有多个不同范围的请求，则响应包含多范围响应 Content-Type: multipart/byteranges


// 差异编码： 即客户端可以要求服务器端 提供 文档的部分更新内容， 不需要把 完整的 页面实例发送过来，
// 客户端： A-IM：diffe (Accept-Instance-Manipulation) 接受实例操控的类型， ETag: 旧的标签
// 服务端： IM: diffe 使用实例操控的类型  ETag:新的标签    Delta-base: 旧的标签
// 事项差异编程所需的额外磁盘空间可能很快会将减少传输量获得的好处抵消掉。。 因为他需保存文档的各种 旧实例。
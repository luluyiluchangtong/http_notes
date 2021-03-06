// http的通信是建立在 TCP/IP 的连接上的。
// http报文会以 流 的形式传输， TCP收到数据流后，会将 '流' 砍成 '段'，并封装在 IP分组中， IP分组游包括：IP分组首部，TCP段首部，TCP数据块
// TCP 链接是通过 4 个值来识别的： 源 IP 地址，源端口号，目的 IP 地址， 目的端口号 （两条不同 TCP连接 不能有四个完全相同的值）

// TCP API 隐藏了所有底层细节，然而可以使用 socket 调用 TCP 协议的接口
// 实际上 socket 是对TCP/IP协议的封装，Socket本身并不是协议，而是一个调用接口（API），通过Socket，我们才能使用TCP/IP协议
// 要通过互联网进行通信，至少需要一对 Socket，一个运行于客户机端，称之为ClientSocket，另一个运行于服务器端，称之为serverSocket

// 若要编写 高性能的http应用程序，需要考虑到 TCP 性能！！！对 TCP性能考虑的细节有点复杂，需要单独阅读 TCP相关书籍！！
// HTTP 事务的时延中有 事务处理时延 和 TCP网络时延。 事务处理时延的时间是很短的，除非 客户端和服务器超载，或处理复杂的动态资源。
// 否则都认定 http 事务的时延 就是由 TCP 网络时延 构成的
// 其中包括  DNS解析，TCP链接，发送请求，处理请求（事务处理时延），回送响应，都是http事务的延时。
// TCP网络延时取决于 硬件，网络，客户端和服务器端的距离，请求和响应报文的尺寸。

// 首部字段 connection 的值有一个由逗号分割的 连接标签 列表
// 串行连接的 时延： 首先串行会造成 连接时延和慢启动时延 的叠加，其次，会造成空白处没有任何反应的感觉。
// 最后是浏览器在加载完之前无法获知对象尺寸信息，会造成布局上的延时。 （因此加载的图片给个显示的宽高属性，浏览器便可在加载之前确定图形的布局了。）

// 提高 HTTP连接性能：并行连接， 持久连接， 管道化连接，复用的连接
// 并行连接：可以打开多条TCP连接，并行的 执行多个HTTP事务，并行处理的连接时延都是'重叠'的，区别于串行连接时延的'叠加'
// 然而并行连接在客户端宽带不足的情况下，性能提升时很小的。此时并行加载多个对象，每个对象都会去竞争这有限的宽带。。
// 其次，会消耗很多服务器内存资源，。所以浏览器对于并行的加载限制在一个较小的数目上（一般是4个），服务器端 可以随意 关闭 来自特定客户端的 超量连接。
// 持久连接 在事务处理结束后任然保持 TCP连接处于打开状态的的链接。 不同于 并行连接 的地方在于，它降低了时延和连接建立的开销
// 持久连接可能会积累大量的空闲链接，所以最高效的做法是：配合使用持久链接和并行链接。 即打开少量并行链接，每一个都是持久链接。
// 持久连接 有 ‘keep-alive’ 连接（旧的）， ‘persistent’ 连接（新的） 两种方式。
// connection: keep-alive;  keep-alive:max=5, timeout=120   最多为 5 个事务保持连接打开的状态，该状态保持到连接空闲了 2分钟之后
// HTTP/1.0 中 keep-alive 不是默认使用的，需要客户端发送该字段， HTTP/1.1中 keep-alive 是默认使用的。
// 持久连接中，实体的主体部分必须有正确的 content-length。 否则另一端 就无法精确的检测出 一条报文的结束和另一条报文的开始。

// 持久链接的历史原因：使用浏览器浏览一个包含多张图片的 HTML 页面时，在发送请求访问 HTML 页面资源的同时，也会请求该 HTML 页面里包含的其他资源。
// 因此，每次的请求都会造成无谓的 TCP 连接建立和断开，增加通信量的开销

// 代理或网关在 转发报文 和 将其高速缓存之前， 将删除 connection 相关字段及其自身。不应该转发 或 缓存该字段，为的就是防止“哑代理” 的出现，除了 connection，还有 Upgrade， Proxy-Authenticate。。。
// 若不支持 connection 代理服务器，进行 keep-alive， 会发生 ’哑代理‘， 即代理服务器无法理解 keep-alive的意思，只是当作扩展首部传送到服务器。。
// 而同时 connection 首部（逐跳首部）只适用于 ’单条传输链路‘，不能被转发。即在代理服务器转发时需将其删除。否则，继续向下传输的 结果是 ----
// '逐跳首部'： connection  keep-Alive  Proxy-Authenticate  Proxy-Authorization Trailer TE Transfer-Encoding Upgrade
// 除这 8 个首部字段之外，其他所有字段都属于 '端到端首部'

// 服务器和客户端都都认为自己在进行的是 keep-alive对话，而只有 代理服务器 一无所知，只是在传输完数据给客户端后 等待 服务器的关闭， 此时服务器当然不会关闭，会保持打开状态
// 此时客户端，再次发送下一条请求时，代理不认为同一条连接会有其他的请求来，所以请求被忽略！此时浏览器就一直处于挂起状态，直到连接超时，将其关闭。
// 挂起状态：进程处于静止状态，如果程序正在运行，将暂停执行，若处于就绪状态，则该进程暂不接受调度

// 如果服务器端支持 keep-alive 则回送一个 connection:keep-alive 首部。
// keep-alive 只会对 已建立的一条 http事务，产生影响。
// Proxy-Connection  扩展首部的引入解决了客户端后面紧跟着一个 盲中继/哑代理（即不支持 connection 首部的代理服务器）所带来的问题。
// 但是在多层次代理（即有哑代理和聪明代理都存在的情况下），问题依然无法解决。。

// HTTP/1.1 使用 persistent 取代了 keep-alive， 工作机制更优一些。 默认是激活状态，客户端需要显示的添加 connection:close 首部。
// 但在这并不意味着服务器承诺永久将连接保持在打开状态，客户端和服务器端可以随时关闭空闲的 连接。
// 实体主体的长度应和相应的 content-length 一致，才可保持持久连接。
// HTTP/1.1 的代理应该分别能够管理 客户端和服务器端的持久连接。此外，HTTP/1.1 的代理不应和 HTTP/1.0 的客户端建立持久连接

// 一个客户端 对任何服务器或代理服务器 最多只能维护两条持久连接。以访服务器过载。 代理服务器 则最多只能维护 2N条（N个客户端） 到任意服务器火男代理服务器的连接
// 持久连接和并行连接的结合 就是 '管道化连接'，又是一个性能优化的地方
// 持久连接中，客户端必须在 响应前整条请求关闭时，去重新发起请求。同时，客户端不应该使用管道化的方式发送会产生副作用的请求，例如 post
// 如果一个事务，不管执行一次或是多次，得到的结果都是相同的，这个事务就是幂等的。客户端不应该使用管道化的方式传送 '非幂等' 的请求 例如 post
// 否则，传输连接的过早终止，会造成一些不确定的后果。
// 正常关闭连接：
// 完全关闭：关闭 TCP 连接中服务器的输入，输出信道。  半关闭:关闭服务器输入或输出信道
// 简单的http应用程序可以使用完全关闭，，但是当 应用程序与其他类型的 http客户端，代理，服务器进行对话时且使用管道化 持久连接 时，需要使用半关闭
// 来防止 对等实体 收到 非预期 的写入错误。。！！！   nodeJS 中的 net.createServer()  有涉及 '半关闭'~~
// 而且半关闭，关闭输出信道 才是最安全的 。
// 所以正常关闭：首先半关闭输出信道，然后周期性的检查其输入信道的状态，若一定时间内，对方没有关闭输入信道，应用程序则可以强制关闭连接
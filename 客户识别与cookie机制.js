// 用户识别机制：
// HTTP 首部
// Form， User-Agent，Referer，Authorization， Client-IP， X-Forward-For， Cookie 都是承载相关用户信息的首部
// Form， 包含了用户的 Email 地址
// User-Agent，包含了用户浏览器相关的信息
// Referer，提供了用户来源页面的URL，即是从哪个来源网站跳转过来的。
// Client-IP， 客户端的 IP 地址太容易被伪造了。
// 其中有：多用户使用同一台机子，网络服务提供商在用户登录时动态提供 IP地址， 用户使用防火墙隐藏真实的 IP地址，代理或网关会打开一条新的IP的地址到服务器端
// Authorization(基本认证): 通过用户登录的  用户名，密码来判断特定用户。
// 服务器将 受保护的文档 组织成一个 '安全域' ，每个安全域授权给不同的用户集 WWW-Authenticate: Basic realm="描述所请求的文档集的字符名" 状态码为 401； 同时 客户端 弹出 认证对话框   realm 领域 范围
// 代理服务器认证和Web服务器的步骤相同，首部不同： 407 Proxy-Authenticate  Proxy-Authorization  Proxy-Authentication
// 即用户浏览站点之前需进行登录，此时服务器返回一条响应码 401，和 WWW-Authenticate首部 要求用户登录，用户输入再次完成请求，同时请求头带有 (基本认证)authorization: Basic ****(经过Base64编码) 首部携带用户名密码
// 服务器通过对用户名密码的解码，得到用户身份，响应返回可选Authentication-Info(与授权会话相关的信息)，此后用户在登录之后的整个会话期间，每次请求都服务器发送 authorization 首部。
// 但是众多网站，用户维护超多的 用户名 密码，以及不同网站的设置规则。导致很繁琐~~  其次由安全缺陷，编码后的密码很容因解码，其实就是“明文”传送的，

// 胖url：改动后包含用户信息的 url 被称为 胖url。
// 即客户首次访问网站时，服务器生成和一个唯一的 ID绑定到 URL，然后将客户端重新导向这个 胖URL，此后服务器通过收到对 胖URL 的请求来维护用户 ID 相关信息。
// 但是 此时没有公共的url 供缓存了，只要用户推出登录，或跳转到其他链接，之前所有的信息都会丢失，无法共享 url，因为上面有个人信息。

// Cookie验证
// 客户端发起请求，并通过 服务端的 响应首部 Set-Cookie 设置 请求首部 Cookie, 此后的请求客户端都携带 Cookie值，给服务器端。
// Cookie 存储在客户端，

// Session验证 （相对于 cookie 更安全）
// 用户登录，提交 用户名密码，服务器验证用户账号密码正确，创建一个 session 存储在数据库，响应报文时 将 session ID 放进 cookie 中，
// 此后的每一次请求，浏览器都会在请求中 附加这个Session ID 到服务器中去，
// Session 存储在服务端

// Token 验证  （最佳认证方式）
// 用户登录，提交 用户名密码，服务器验证用户账号密码正确, '生成 TOKEN 值'，更新 TOKEN值，然后把新的 TOKEN 值保存到 Cookie/localStorage/session storage 中，此时用户已登录，
// 此后的每一次请求，浏览器都会在请求中 附加这个 TOKEN值 到服务器中去，

// URL 可以通过 HTTP 之外的其他协议来访问资源, 如 FTP SMTP
// URL 的语法格式： schema://user:password @ host:port / path; param ? query # frag  包含 9 个部分的组件。
// 对应：           方案  用户名  密码  主机  端口  路径  参数  查询  片段  
// 注意：
// FTP服务器需要用户名和密码组件，
// 参数组件： 是为了更正确的访问资源
// 路径组件： 可以有若干路径段，每个路径段都可以有自己的参数！！
// 查询组件： 向 网关服务器 发送查询组件（以名值对的形式）

// 获取 url 的各个字段：
// 例子：URL：http://b.a.com:88/index.php?name=kang&when=2011#first
//    属性      	含义	                     值
// protocol:	协议	                     "http:" 除此还有 https ftp  大小写没有关系
// hostname:	域名(服务器的名字)	            "b.a.com"  相当于服务器的 IP 地址，用域名只是为了方便访问
// port:	    端口	                      "88"  即通过 IP 先找到 物理服务器，再根据端口找到 web服务器，原理解释在如下：
// 一台拥有IP地址的主机可以提供许多服 务，比如Web服务、FTP服务、SMTP服务等，这些服务完全可以通过1个IP地址来 实现。
// 那么，主机是怎样 区分 不同的 网络服务 呢？显然不能只靠IP地址，因为IP 地址与网络服务的关系是一对多的关系。实际上是通过“IP地址+端口号”来区 分不同的服务的
// pathname:	路径(URL中主机名后的部分)     	"/index.php"   即服务器中资源的地址  get post 请求的地址只需要写上 路径地址即可
// search:	查询字符串/请求参数 ("?"后的部分)	"   ?name=kang&when=2011"
// hash:	片段标识符(返回"#"之后的内容,后面的任何字符都不会被发送到服务器)	            "#first"
// host:	等于hostname + port	        "b.a.com:88"
// href:	当前页面的完整URL            	"http://www.a.com:88/index.php?name=kang&when=2011#first"
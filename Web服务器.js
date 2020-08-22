// 测试本地文件存在的问题： 异步请求， 服务端代码
// 本地运行服务器语言 测试远程文件 的方式： node（Express）  python(Django)   PHP(LAMP)

// 服务器端编程的功能：
// 1.信息的高效存储和传输（数据库） 2.定制用户体验（推送浏览过的类似商品）
// 3.控制对内容的访问（登录与注册页面，有些页面内容只有登录后才能访问编辑）  4.存储会话和状态信息（当再次回来时，从上次浏览过的地方开始）
// 5. 通知和通讯（推送通知信息）  6.数据分析（分析用户的浏览行为）  6.可以使用很多种编程语言来写

// html  标记语言；  css 样式表语言； js 才是编程语言；

// 编写好代码，本地测试过之后，需要购买 远程服务器， 域名，及安装文件传输协议 程序 FTP
// 仿真的 web 开发环境  JSBin  CodePen  JSFiddle ... 
// 网络服务器： 就是一台计算机，，一台存储了 网络服务软件（HTTP Server） 和 软件组成内容（html js css）的 计算机。

// 动态编程语言 和 静态编程语言 的 区别在于， 动态编程语言再运行中，可以改变属性，方法，变量。 静态语言只有在编译阶段可以这样做。

// Web 服务器可以是 Web软件，也可以是有预装软件的一台物理机。 是资源服务器，负责发送预先创建好的内容，以及服务器上的资源生成程序所产生的动态内容。
// Web服务器软件： 开源的 Apache, Tomcat, Nginx, 商用的 Azure。。。。
// Web服务器设备：预先打包好的软硬件解决方案。
// 嵌入式Web服务器：打印机及一些家用设备，即要嵌入到 消费类产品 中的小型web服务器。。
// Perl Web 服务器， 即名为 type-o-server 的 http 诊断工具。
// 分布式系统：即就是指 数据和 程序 可以不位于一个服务器上，而是分散到多个服务器。

// 一个基本的 Web 服务器处理流程： 
// 1.建立连接，Web 服务器端可以随意拒绝或立即关闭任意一条连接。识别用户端的几种方式：
//           承载用户身份信息的HTTP首部
//           客户端IP地址跟踪，通过用户的IP地址对其进行识别
//           用户登录，用认证方式识别用户
//           胖URL，一种在URL中潜入识别信息的技术
//           cookie，一种强大高效的持久身份识别技术
// 2.接受请求，解析请求报文，有些 web 服务器 还会将请求报文的 首部信息 存放在一个 快速查询表 中。服务器对请求连接的处理方式：
//           单线程：即依次处理请求，未被处理的请求被忽略。
//           多程，多线程：创建多个进程/线程，每个进程/线程分别处理请求连接
//           复用I/O：先监视所有链接，当链接状态发生变化时，才对那条链接进行处理，处理完后又将其放到监视列表中，等待下一次状态的变化
//           复用的多线程：即复用和多线程功能的结合，
// 3.处理请求，
// 4.访问资源，对资源的映射及访问，
//   docroot --- 服务器的文件目录中有一个文件夹 ---“文档根目录”，然后在服务器的 httpd.conf 中配置 DocumentRoot，
//               最后请求报文中获取的 URI附加到文档根目录后面。
//   虚拟托管的 docroot --- 即一台服务器上有多个站点，每个站点又有自己的文档根目录，然后服务器根据所托管的 Web 站点 的 HOST 首部，或不同的 IP地址区分不同的站点。
//               然后需要为每个虚拟 web 站点 配置一个 virtualhost块（虚拟服务器），以及 DocumentRoot 的配置。。
//   用户的主目录 docroot --- 即个人私有的web站点， ~bob（波浪号后的用户名）作为用户私有文档根目录，其后的 public_html为用户的主目录。
//   目录列表 --- 映射完请求的 URL 目录后，大多数服务器会去查找一个名为 index.html 的文件，然后返回那个文件的内容， 可用 DirectoryIndex指令来配置作为默认目录使用的文件名集合。
//   若没有提供默认的索引文件，且未禁止，则服务器会自动返回一个 HTML文件，文件中列出目录中所有的文件名及修改日期。
//   动态内容资源的映射 --- 将接受到的 URI 映射为 可执行文件目录，服务器收到 可执行文件目录 时，会试着去执行'相应'服务器目录中的程序。然后返回动态数据。
//   服务器端包含项（SSI） --- 若某个资源被标志为存在 服务器端包含项，则由服务器在将其发送给客户端之前对资源内容进行处理，用以增加动态生成内容。
// 5.构建响应，服务器将 MIME 类型与资源关联起来，关联方式可以通过配置服务器的一些方法： Multipurpose Internet Mail Extensions
//         MIME类型：扫描服务器的 MIME类型表（包含所有扩展名），匹配每个资源
//         魔法分类：扫描每个资源的内容，匹配 ‘魔法文件’，以决定每个文件的MIME
//         显示分类：配置服务器，强制特定文件/目录内容拥有某个MIME类型。。
//         类型协商：通过与用户协商，决定使用哪种配置好的格式来存储资源。。 
//   重定向： 即 Web服务器 将浏览器重定向到其他地方来执行请求。有以下几种情况： 
//            1.永久搬离的资源 301； 
//            2.临时搬离的资源 303（see other） 307（temporary redirect）将客户端重定向到一个新的位置，也希望用户不去修改书签，因为还会返回 来使用老的URL
//            3.URL增强  303 307 通过重定向来重写 URL，嵌入上下文，客户端根据重写的URL 重新发起请求。
//            4.负载均衡  303 307 即服务器超载了，故将客户端重定向到一个负载不太重的服务器上去。
//            5.服务器关联：服务器将客户端重定向到那个包含客户端信息的服务器端上去。
//            6.规范目录名称： 将不带斜线的 URL 目录重定向到一个加了斜线的 URL 上。
// 6.发送响应，
// 7.日志文件（记录事务处理过程） Web服务器会向日志文件添加一条记录，描述已经执行的事务。

// 8. web框架的好处：
//    1.直接处理 HTTP 请求和响应   2.将请求路由到相关的handler中
//    3.使从请求中获得数据变得简单   4.抽象和简化数据库接口   5.渲染数据
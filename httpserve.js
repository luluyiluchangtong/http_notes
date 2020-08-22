const http = require("http"); // 引入模块


http.createServer(function (request, response) {
    response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("hel lo world");
    response.end()
}).listen(8000); // 服务器监听的 端口号，接收异步请求

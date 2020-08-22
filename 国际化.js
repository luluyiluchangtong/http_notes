// 字符集： 各种文字，抽象符号的总称   
// 字符编码： 就是将 符号 转换为计算机可以接受的 数字系统 的数，称为数字代码。
// 编码后的字符集： 把 数字化的字符代码 映射为实际的字符      ASCII字符集  
// 字符编码方案： 把 数字化的字符代码 编码成一系列的二进制码的算发     UTF-8                  
// 字符集 其实就是 字符编码方案 和 编码后的字符集 两种概念的组合。。 指的就是一种方法。
// 理解以上概念其实就是  字符集  编码前/后  数字化的字符代码  二进制码

// 服务器端： Content-Type: text/html; charset=iso-2002-jp
// 客户端： Accept-Charset: iso-8859, utf-8

// 语言标记：  en  zh-CN 。。。。  Content-language: en   Accept-language:en  zh-CN
// 语言标记没有大小写，一般 小写表示 语言， 大写表示 国家。

// URI 的设计限制了字符集，虽然此举得到世界上大多数软件和键盘的支持， 但是却不方便使用和记忆。。
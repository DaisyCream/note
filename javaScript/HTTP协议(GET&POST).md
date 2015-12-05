##HTTP协议(GET&POST)
- GET - 从指定的资源请求数据
- POST - 向指定的资源提交要被处理的数据

###GET
查询字符串是在GET请求中的URL中发送的：

```
	/text/demo_form.asp?name1=value1&name2=value2
```
有关GET请求的其他一些注释：
- GET请求可能被缓存

- GET请求保留在浏览器的历史记录中

- GET请求可能被收藏为书签

- GET请求不应该在处理敏感数据时使用

- GET请求有长度限制

- GET请求只应当用于取回数据

###POST
查询字符串是在POST请求中的HTTP消息主体中发送的：
```
POST /text/demo_form.asp HTTP/1.1
Host: w3schools.com
name1=value&name2=value2
```
有关POST请求的其他一些注释：
- POST请求不会被缓存

- POST请求不会保留在浏览器的历史记录中

- POST不能被收藏为书签

- POST请求对数据长度没有要求


<table><tr>
<th style="width:20%;">&nbsp;</th>
<th>GET</th>
<th>POST</th>
</tr>

<tr>
<td>后退按钮/刷新</td>
<td>无害</td>
<td>数据会被重新提交（浏览器应该告知用户数据会被重新提交）。</td>
</tr>

<tr>
<td>书签</td>
<td>可收藏为书签</td>
<td>不可收藏为书签</td>
</tr>

<tr>
<td>缓存</td>
<td>能被缓存</td>
<td>不能缓存</td>
</tr>

<tr>
<td>编码类型</td>
<td>application/x-www-form-urlencoded</td>
<td>application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。</td>
</tr>

<tr>
<td>历史</td>
<td>参数保留在浏览器历史中。</td>
<td>参数不会保存在浏览器历史中。</td>
</tr>

<tr>
<td>对数据长度的限制</td>
<td>是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）。</td>
<td>无限制。</td>
</tr>

<tr>
<td>对数据类型的限制</td>
<td>只允许 ASCII 字符。</td>
<td>没有限制。也允许二进制数据。</td>
</tr>

<tr>
<td>安全性</td>
<td><p>与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。</p>
<p>在发送密码或其他敏感信息时绝不要使用 GET ！</p></td>
<td>POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。</td>
</tr>

<tr>
<td>可见性</td>
<td>数据在 URL 中对所有人都是可见的。</td>
<td>数据不会显示在 URL 中。</td>
</tr>
</table>
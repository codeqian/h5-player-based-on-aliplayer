基于[aliplayer](https://player.alicdn.com/aliplayer/index.html) 的视频播放器。
很简单的东西，没什么重要的改写，主要是给公司的前端一个范例。

一、使用此播放器分3步<br>
1.复制本仓库下所有文件到你需要的服务器（除了.html文件，这仅仅是范例)(如果和加载播放器的页面不在同一个目录下，需要按照存放地址修改代码中的图片及样式表加载地址)<br>
2.引入js：<br>
```
<script src="js/player.js"></script>
```
3.创建播放器<br>
```
<script>createPlayer("player-con", 
    "视频地址",
    "是否直播",
    "2019-03-31T16:00:00.000Z",
    "2019-04-31T16:00:00.000Z")</script>
```
参数说明：<br>
(1).必要参数：前三个参数分别是 容器id，视频地址，是否直播流<br>
(2).非必要参数：视频流支持直播时移的情况下，liveStartTime起始时间，结束时间liveOverTime<br><br>

<br>
二、页面可调用的方法：<br>
1.VideoCtrl(act):<br>
act参数是个字符串，表示要执行的行为。目前提供的是"play"、"pause"2个行为。<br><br>

三、播放事件监听：<br>
事件监听可使用标准video标签的用法，例如<br>
```
player.on("ended", endedHandle);

function endedHandle(){
   console.log("play end");
 }
```
<br>

四、不同流界面的区别：<br>
1.界面直播界面默认不显示播放播放、暂停按钮以及进度条，在有时移参数的情况下，会显示播放、暂停按钮以及进度条。<br>
2.点播页面显示常见的操作按钮及进度条。<br><br>

五、补充说明：<br>
pc端和移动端使用不同的界面，默认情况下不需要专门设置。<br>
具体区别：<br>
1.在不同的客户端下会加载player.css和player4m.css两个不同的样式表。目前样式里面仅图片所在文件夹地址不同（img和img4monile），替换相应图片即可实现不同界面。<br>
2.ui控件的位置在js中设置，js中根据isPc参数调用不同的加载逻辑设置不同的控件位置。<br>
3.其他更细节的说明写在注释里了。<br>

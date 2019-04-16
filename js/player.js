// 引入阿里播放器
document.write("<script language='javascript' src='https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js'></script>");

let divWidth;
let divHeight;
let x0 = 0;
let y0 = 0;
let isPc = IsPC();
var player;

/**
 * 播放器基本配置
 * @param {*} viewID  容器id
 * @param {*} mediaUrl 视频地址
 * @param {*} isLive 是否直播流
 */
function createPlayer(viewID, mediaUrl, isLive, liveStartTime, liveOverTime) {
  measureSize(viewID);

  //配置相关JSON
  var playerJson = {//详细参数说明见https://player.alicdn.com/aliplayer/docs/properties.html
    "id": viewID,
    "source": mediaUrl,
    "width": "100%",
    "height": "100%",
    "autoplay": true,
    "isLive": isLive,
    "rePlay": false,
    "playsinline": true,
    "preload": true,
    "controlBarVisibility": "hover",
    "useH5Prism": true,
  };
  //是否有时移参数
  if (liveStartTime) {
    playerJson.liveStartTime = liveStartTime;
  }
  if (liveStartTime) {
    playerJson.liveOverTime = liveOverTime;
  }
  //控制栏按钮设置
  //界面参数详情见https://help.aliyun.com/document_detail/62948.html?spm=a2c4g.11186623.2.21.IHJU9w
  var ctrlBarJson = {
    "name": "controlBar",
    "align": "blabs",
    "x": 0,
    "y": 0,
  }
  var ctrlBarSkinArray = [
    {
      "name": "fullScreenButton",
      "align": "tr",
      "x": 10,
      "y": 12
    },
    {
      "name": "volume",
      "align": "tr",
      "x": 10,
      "y": 10
    }
  ];
  //直播显示Live标志
  if(isLive){
    ctrlBarSkinArray.push(
      {
        "name": "liveDisplay",
        "align": "tlabs",
        "x": 45,
        "y": 3
      },
    );
    //直播状态下，支持时移的会显示播放暂停按钮以及进度条
    if(liveStartTime && liveOverTime){
      ctrlBarSkinArray.push(
        {
          "name": "playButton",
          "align": "tl",
          "x": 15,
          "y": 12
        },
      );
      ctrlBarSkinArray.push(
        {
          "name": "progress", 
          "align": "tlabs", 
          "x": 0, 
          "y": 0
        },
      );
    }
  }else{
    ctrlBarSkinArray.push(
      {
        "name": "setting",
        "align": "tr",
        "x": 10,
        "y": 12
      },
    );
    ctrlBarSkinArray.push(
      {
        "name": "playButton",
        "align": "tl",
        "x": 15,
        "y": 12
      },
    );
    ctrlBarSkinArray.push(
      {
        "name": "timeDisplay",
        "align": "tl",
        "x": 10,
        "y": 4
      },
    );
    ctrlBarSkinArray.push(
      {
        "name": "progress", 
        "align": "tlabs", 
        "x": 0, 
        "y": 0
      },
    );
  }
  
  ctrlBarJson.children=ctrlBarSkinArray;
  //界面控件数组
  var skinArray = [
    {
      "name": "infoDisplay"
    },
    {//加载动画
      "name": "H5Loading",
      "align": "cc"
    },
  ];
  skinArray.push(ctrlBarJson);

  //客户端不同，按钮位置不同
  if (isPc) {
    skinArray.push({
      "name": "bigPlayButton",
      "align": "blabs",
      "x": 30,
      "y": 80
    });
  } else {
    skinArray.push({
      "name": "bigPlayButton",
      "align": "blabs",
      "x": x0,
      "y": y0,
    });
  }

  playerJson.skinLayout = skinArray;

  //创建播放器
  player = new Aliplayer(playerJson, function (player) {
    // player._switchLevel = 0;//不知道什么用
    console.log("播放器创建了。");
  });
  //播放完毕监听，其他事件监听也同基本Video标签写法
  player.on("ended", endedHandle);
}

/**
 * 相应页面发起的行为
 */
function VideoCtrl(act){
  switch(act){
    case "play":
    player.play();
    break
    case "pause":
    player.pause();
    break
  }
}

/**
 * 播放完毕监听
 */
 function endedHandle(){
   console.log("play end");
 }

/**
 * 获得容器尺寸
 * 用已计算ui控件所需位置
 */
function measureSize(viewID) {
  let playerDiv = document.getElementById(viewID);

  if (playerDiv) {
    divWidth = playerDiv.clientWidth;
    divHeight = playerDiv.clientHeight;
    console.log("size:" + divWidth + "_" + divHeight);//外尺寸
    //计算居中位置
    if (divWidth) {//45是prism-big-play-btn尺寸的一半，如果修改了ui的尺寸，这个值也要改
      x0 = divWidth / 2 - 45;
    }
    if (divHeight) {
      y0 = divHeight / 2 - 45;
    }
  }
}

/**
  * 加载播放器CSS
  * @param {string} url 样式地址
  */
function dynamicLoadCss(url) {
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = url;
  head.appendChild(link);
}

/**
 * 判断是否pc端
 * 针对不同的平台可使用不同界面
 */
function IsPC() {
  var userAgentInfo = navigator.userAgent;
  console.log("userAgentInfo:" + userAgentInfo);
  var Agents = ["Android", "iPhone", "SymbianOS",
    "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  console.log("isPc:" + flag);
  // 根据客户端选择不同的样式
  if (flag) {
    dynamicLoadCss("player.css");
    // dynamicLoadCss("https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer.css");
  } else {
    dynamicLoadCss("player4m.css");
  }
  return flag;
}


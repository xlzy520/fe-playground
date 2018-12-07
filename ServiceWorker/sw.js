// sw.js

// 导入谷歌提供的 Workbox 库
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

if ( !workbox ) {
  console.log(`Workbox didn't load.`);
}

// Workbox 注册成功, 可以进行下一步的操作

// 立即激活, 跳过等待
workbox.skipWaiting();
workbox.clientsClaim();

// workbox.routing.registerRoute()...

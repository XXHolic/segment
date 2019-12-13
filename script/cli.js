#! /usr/bin/env node
var fs = require("fs");
var path = require("path");



/**
 * 递归目录及下面的文件，找出目标文件
 * @param {String} dir 文件夹路径
 */
function readDir(dir) {
  var exist = fs.existsSync(dir);
  // 排除不需要遍历的文件夹或文件
  var excludeDir = /^(\.|node_module)/;
  if (!exist) {
    console.error("目录路径不存在");
    return;
  }
  var pa = fs.readdirSync(dir);

  for (let index = 0; index < pa.length; index++) {
    let file = pa[index];
    var pathName = path.join(dir, file);
    var info = fs.statSync(pathName);
    if (info.isDirectory() && !excludeDir.test(file)) {
      readDir(pathName);
    } else {
      let fileName = path.basename(file);
      let fileNameArr = fileName.split('.');
      let fileNameArrFirst = fileNameArr[0];
      if (/^[0-9]*$/.test(fileNameArrFirst) && path.extname(file) === ".md") {
        fileArr.push(pathName);
      }
    }
  }
}

function traverseFile(file) {
  // 同步创建目录，没有回调
  fs.mkdirSync(jjFilePath, { recursive: true }, (err) => {});
  fs.mkdirSync(sfFilePath, { recursive: true }, (err) => {});

  file.length &&
  file.forEach(ele => {
    dealFile(ele);
  });
}

function dealFile(filePath) {
  const urlPrefix = 'https://xxholic.github.io/segment';
  const addText = '\r\n- [Origin][url-origin]\r\n- [My GitHub][url-my-github]\r\n\r\n';
  const addUrl = '\r\n\r\n[url-origin]:https://github.com/XXHolic/segment/issues/1\r\n[url-my-github]:https://github.com/XXHolic';
  const str = fs.readFileSync(filePath,{encoding:'utf-8'});
  let splitArr = [];
  let newStr='';
  // 判断是否有目录并处理
  const indexIndex = str.indexOf('name="index"');
  if (indexIndex > -1) {
    splitArr = str.split('##');
    splitArr.splice(1,1);

  }

  // 插入 origin GitHub 显示文字
  splitArr[1] = splitArr[1] + addText

  // 替换 .. 为实际地址
  newStr = splitArr.join('##');
  newStr = newStr.replace(/\.\./g,urlPrefix);

  // 最末尾加上 URL
  newStr = newStr + addUrl;

  let secondStr = newStr;
  let secondStrArr = secondStr.split('##');
  let secondStrArrLen = secondStrArr.length;
  // 清除 title 上的 html 标签
  for (let index = 0; index < secondStrArrLen; index++) {
    let element = secondStrArr[index];
    const aEndIndex = element.indexOf('</a>');
    if (aEndIndex > -1) {
      const aStartIndex = element.indexOf('<a');
      let startPartStr = '';
      if (aStartIndex > -1) {
        startPartStr = element.slice(0, aStartIndex);
      }
      secondStrArr[index] = startPartStr + element.slice(aEndIndex+5)
    }
  }

  secondStr = secondStrArr.join('##');

  // 去除 details
  const luggageIndex = secondStr.indexOf(':wastebasket:');
  if (luggageIndex > -1) {
    const detailsIndex = secondStr.lastIndexOf('<details>');
    secondStr = secondStr.slice(0, detailsIndex);
  }

  // 最末尾加上 URL
  secondStr = secondStr + addUrl;

  var fileName = path.basename(filePath);
  console.info('fileName',fileName);

  fs.writeFile(`${jjFilePath}/${fileName}`, newStr, dealError);
  fs.writeFile(`${sfFilePath}/${fileName}`, secondStr, dealError);
}

function dealError(err) {
  if (err) {
    console.error("文件写入失败");
  } else {
    console.info("文件写入成功");
  }
}


var currentPath = './draft'; // 获取当前执行路径
var fileArr = []; // 存储目标文件路径
var jjFilePath = './draft/jj';
var sfFilePath = './draft/sf';

readDir(currentPath);
traverseFile(fileArr);

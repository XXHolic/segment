#! /usr/bin/env node
const fs = require("fs");
const path = require("path");

const currentPath = "./draft2/1"; // 目标执行路径
const config = JSON.parse(fs.readFileSync(`${currentPath}/config.json`));
const formatFilePrefix = `${currentPath}/format`;
let filePath = ""; // 需要解析文件的绝对路径

/**
 * 递归目录及下面的文件，找出目标文件
 * @param {String} dir 文件夹路径
 */
function readDir(dir) {
  const exist = fs.existsSync(dir);
  // 排除不需要遍历的文件夹或文件
  const excludeDir = /^(\.|node_module)/;
  if (!exist) {
    console.error("目录路径不存在");
    return;
  }
  const pa = fs.readdirSync(dir);

  for (let index = 0; index < pa.length; index++) {
    let file = pa[index];
    const pathName = path.join(dir, file);
    const info = fs.statSync(pathName);
    if (info.isDirectory() && !excludeDir.test(file)) {
      // 只遍历一层，如果是文件夹就什么也不做
    } else {
      if (path.extname(file) === ".md") {
        filePath = pathName;
      }
    }
  }
}

function dealError(err) {
  if (err) {
    console.info("err", err);
    console.error("文件写入失败");
  } else {
    // console.info("文件写入成功");
  }
}

function dealFile(file) {
  if (!file) {
    console.log("无效文件路径");
    return;
  }
  var fileName = path.basename(file);
  const articleLink = config.originIndex;
  const urlPrefix = config.imgPrefix;
  const addText =
    "\r\n- [Origin][url-origin]\r\n- [My GitHub][url-my-github]\r\n\r\n";
  const addUrl = `\r\n\r\n[url-origin]:https://github.com/XXHolic/starry-night/issues/${articleLink}\r\n[url-my-github]:https://github.com/XXHolic`;

  let str = fs.readFileSync(filePath, { encoding: "utf-8" });

  // 替换 .. 为实际地址
  str = str.replace(/\.\/image\//g, urlPrefix);

  // 用于 GitHub
  let githubStr = str;

  let splitArr = [];
  let commonDealStr = "";

  splitArr = str.split("##");
  // 判断是否有目录,在开始第一段插入 origin GitHub 显示文字
  const indexIndex = str.indexOf('name="index"');
  if (indexIndex > -1) {
    splitArr[2] = splitArr[2] + addText;
  } else {
    splitArr[1] = splitArr[1] + addText;
  }

  commonDealStr = splitArr.join("##");
  // 最末尾加上 URL
  commonDealStr = commonDealStr + addUrl;

  // 针对 博客园 的格式
  let bkyStr = commonDealStr;
  //去掉 emoji 符号 :wastebasket:  :arrow_up:
  const wastebasketIndex = commonDealStr.indexOf(":wastebasket:");
  const arrowUpIndex = commonDealStr.indexOf(":arrow_up:");

  if (arrowUpIndex > -1) {
    bkyStr = bkyStr.replace(/:arrow_up:/g, "");
  }

  if (wastebasketIndex > -1) {
    bkyStr = bkyStr.replace(/:wastebasket:/g, "");
    const detailsIndex = bkyStr.lastIndexOf("<details>");
    bkyStr = bkyStr.slice(0, detailsIndex);
    // 最末尾加上 URL
    bkyStr = bkyStr + addUrl;
  }
  //不是末尾的 <details> ，文中用到的要转换一下
  if (bkyStr.lastIndexOf("<details>") > -1) {
    bkyStr = bkyStr.replace(/<details>/g, "");
    bkyStr = bkyStr.replace(/<\/details>/g, "");
    bkyStr = bkyStr.replace(/<summary>/g, "");
    bkyStr = bkyStr.replace(/<\/summary>/g, "");
  }

  // 针对 掘金 的格式
  let jjStr = commonDealStr;
  let jjStrArr = [];
  if (indexIndex > -1) {
    jjStrArr = jjStr.split("##");
    jjStrArr.splice(1, 1);
    jjStr = jjStrArr.join("##");
  }

  if (wastebasketIndex > -1) {
    jjStr = jjStr.replace(/:wastebasket:/g, "");
  }

  if (arrowUpIndex > -1) {
    let replaceStr1 =
      '<div align="right"><a href="#index">Top :arrow_up:</a></div>';
    let replaceStr2 =
      '<div align="right"><a href="#index">Back to top :arrow_up:</a></div>';
    jjStr = jjStr.replace(new RegExp(replaceStr1, "g"), "");
    jjStr = jjStr.replace(new RegExp(replaceStr2, "g"), "");
  }
  // 最近掘金多个换行粘贴会被解析为斜杠，多个换行转换为 1 个换行
  const jjStrFinal = jjStr.replace(/[\r\n]+/g, "\r\n");

  // 针对 segmentFault CSDN 简书 格式
  let secondStr = jjStr;
  let secondStrArr = secondStr.split("##");
  let secondStrArrLen = secondStrArr.length;
  // 清除 title 上的 html 标签
  for (let index = 0; index < secondStrArrLen; index++) {
    let element = secondStrArr[index];
    const aEndIndex = element.indexOf("</a>");
    if (aEndIndex > -1) {
      const aStartIndex = element.indexOf("<a");
      let startPartStr = "";
      if (aStartIndex > -1) {
        startPartStr = element.slice(0, aStartIndex);
      }
      secondStrArr[index] = startPartStr + element.slice(aEndIndex + 5);
    }
  }

  secondStr = secondStrArr.join("##");

  // 去除 details
  if (wastebasketIndex > -1) {
    const detailsIndex = secondStr.lastIndexOf("<details>");
    secondStr = secondStr.slice(0, detailsIndex);
    // 最末尾加上 URL
    secondStr = secondStr + addUrl;
  }

  //不是末尾的 <details> ，文中用到的要转换一下
  if (secondStr.lastIndexOf("<details>") > -1) {
    secondStr = secondStr.replace(/<details>/g, "");
    secondStr = secondStr.replace(/<\/details>/g, "");
    secondStr = secondStr.replace(/<summary>/g, "");
    secondStr = secondStr.replace(/<\/summary>/g, "");
  }

  fs.writeFile(`${formatFilePrefix}/github.${fileName}`, githubStr, dealError);
  fs.writeFile(`${formatFilePrefix}/bky.${fileName}`, bkyStr, dealError);
  fs.writeFile(`${formatFilePrefix}/jj.${fileName}`, jjStrFinal, dealError);
  fs.writeFile(`${formatFilePrefix}/csdn.${fileName}`, secondStr, dealError);
  console.info(`${fileName}转换成功`);
}

readDir(currentPath);
dealFile(filePath);

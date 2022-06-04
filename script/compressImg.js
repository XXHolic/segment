#! /usr/bin/env node
const tinify = require("tinify");
const fs = require("fs");
const path = require("path");

// 压缩时，填入自己的 key 值
tinify.key = "";

// 获取当前执行路径,后续新加的图片，这个针对性的改一下，因为免费的有压缩数量限制
const currentPath = "./draft/1/image";
const fileArr = []; // 存储目标文件路径

/**
 * 递归目录及下面的文件，找出目标文件
 * @param {String} dir 文件夹路径
 */
function readDir(dir) {
  const exist = fs.existsSync(dir);
  // 排除不需要遍历的文件夹或文件
  const excludeDir = /^(\.|node_module|wx|n)/;
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
      readDir(pathName);
    } else {
      let fileExt = path.extname(file);

      if (fileExt === ".png" || fileExt === ".jpg" || fileExt === ".jpeg") {
        fileArr.push(pathName);
      }
    }
  }
}

function traverseFile(file) {
  file.length &&
    file.forEach((ele) => {
      dealFile(ele);
    });
}

function dealFile(filePath) {
  var fileName = path.basename(filePath);

  const source = tinify.fromFile(filePath);
  source.toFile(filePath, function () {
    console.info(`${fileName}压缩完成`);
  });
}

readDir(currentPath);
traverseFile(fileArr);

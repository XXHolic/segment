#! /usr/bin/env node
var fs = require("fs");
var path = require("path");

function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}

var jjFilePath = './draft/jj';
var sfFilePath = './draft/sf';

delDir(jjFilePath);
delDir(sfFilePath);
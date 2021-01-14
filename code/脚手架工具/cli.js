#!/usr/bin/env node

// node CLI 的应用入口文件必须有这样的文件头
// 如果是 Linux 或者 macOS 还需要修改此文件的修改权限，具体就是 chmod 755 cli.js

// 脚手架的工作过程
// 1、通过命令行交互询问用户问题
// 2、根据用户回答的结果生成文件

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const ejs = require("ejs");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Project Name?",
    },
  ])
  .then((anwsers) => {
    // 模板目录
    const tmpDir = path.join(__dirname, "templates");

    // 目标目录
    const destDir = process.cwd();

    // 将模板下的文件全部转换到目标目录
    fs.readdir(tmpDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // 通过目标引擎渲染文件
        ejs.renderFile(path.join(tmpDir, file), anwsers, (err, result) => {
          if (err) throw err;
          // 将结果写入目标文件
          fs.writeFileSync(path.join(destDir, file), result);
        });
      });
    });
  });

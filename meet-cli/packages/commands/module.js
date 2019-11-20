const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

// 要拷贝的目标所在路径
let templatePath;
// 目标文件夹根路径
let targetRootPath;

function generateModule(meetConfig, name) {
  templatePath = typeof meetConfig.moduleTemplatePath !== 'undefined' ? path.resolve(meetConfig.moduleTemplatePath) : path.join(__dirname, '../meet/module');
  targetRootPath = path.resolve(meetConfig.modulePath);
  let targetDir = path.join(targetRootPath, name);

  if (fs.existsSync(targetDir)) {
    // 如果已存在改模块，提问开发者是否覆盖该模块
    inquirer.prompt([{
      name: 'module-overwrite',
      type: 'confirm',
      message: `Module named ${name} is already existed, are you sure to overwrite?`,
    }]).then(answers => {
      console.log('answers: ', answers);
      // 如果确定覆盖
      if (answers['module-overwrite']) {
        // 删除文件夹
        fs.removeSync(targetDir)
        console.log(chalk.yellow(`Module already existed , removing!`));
        //创建新模块文件夹
        fs.mkdirSync(targetDir);
        fs.copySync(templatePath, targetDir)
        console.log(chalk.green(`Generate new module "${name}" finished!`));
      }
    }).catch(err => {
      console.log(chalk.red(err));
    })
  } else {
    //创建新模块文件夹
    fs.mkdirSync(targetDir);
    fs.copySync(templatePath, targetDir)
    console.log(chalk.green(`Generate new module "${name}" finished!`));
  }
};

module.exports = generateModule;
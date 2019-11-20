const aliOss = require('meetyou-ali-oss');

function upload(uploadConfig) {
  return aliOss(uploadConfig.config);
}

module.exports = upload;
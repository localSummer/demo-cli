const extension = {
  js: ['.js'],
  html: ['.html'],
  css: ['.css'],
  image: ['.png', '.jpg', '.webp', '.gif', '.svg'],
  media: ['.mp3', '.mpa', '.wav', '.mp4', '.wmv', '.swf', '.mov', '.avi']
};

function detectExtension(ext) {
  // for循环return可直接终止循环，退出函数
  for (let key in extension) {
    if (extension[key].includes(ext)) {
      return key;
    }
  }
  return 'other';
}

module.exports = detectExtension;
// 作者：孙溢周
// 建立时间：2026-11-13
// 使用大模型：DeepSeek-V4.1-Flash
// 功能名称：诗词数据服务器（端口 3004）

const syz_express = require('express');
const syz_fs = require('fs');
const syz_path = require('path');

const syz_app = syz_express();
const syz_PORT = 3004;
// 数据文件与静态目录：db.json 在 db 目录，网页在项目根目录
const syz_DB_FILE = syz_path.join(__dirname, 'db.json');
const syz_ROOT_DIR = syz_path.join(__dirname, '..');

// 函数功能：读取 db.json，返回完整的 { poems, authors } 对象；读取或解析失败时抛出错误
function syz_readDb() {
  const syz_text = syz_fs.readFileSync(syz_DB_FILE, 'utf8');
  const syz_data = JSON.parse(syz_text);
  return {
    poems: Array.isArray(syz_data.poems) ? syz_data.poems : [],
    authors: Array.isArray(syz_data.authors) ? syz_data.authors : []
  };
}

// 静态资源：把项目根目录作为网站根目录，浏览器可直接访问 poem.html
syz_app.use(syz_express.static(syz_ROOT_DIR));

// 允许跨域：页面用 file:// 双击打开时，也能请求到本服务器的接口和图片
syz_app.use(function (syz_req, syz_res, syz_next) {
  syz_res.setHeader('Access-Control-Allow-Origin', '*');
  syz_next();
});

// 接口：返回 poems 列表（图片、标题、正文、作者）
syz_app.get('/api/poems', function (syz_req, syz_res) {
  try {
    syz_res.json({
      code: 0,
      data: syz_readDb().poems
    });
  } catch (syz_err) {
    syz_res.status(500).json({
      code: 500,
      msg: '读取 db.json 失败：' + syz_err.message
    });
  }
});

// 接口：返回作者列表（姓名、朝代、简介）
syz_app.get('/api/authors', function (syz_req, syz_res) {
  try {
    syz_res.json({
      code: 0,
      data: syz_readDb().authors
    });
  } catch (syz_err) {
    syz_res.status(500).json({
      code: 500,
      msg: '读取 db.json 失败：' + syz_err.message
    });
  }
});

// 函数功能：代理外部图片（gitee 有防盗链，直接引用会加载失败），由本地服务器转发后返回给页面
syz_app.get('/api/img', async function (syz_req, syz_res) {
  const syz_url = syz_req.query.u;
  if (!syz_url || !/^https?:\/\//i.test(syz_url)) {
    syz_res.status(400).json({ code: 400, msg: '缺少图片地址参数 u' });
    return;
  }
  try {
    const syz_resp = await fetch(syz_url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'follow'
    });
    if (!syz_resp.ok) {
      syz_res.status(502).json({ code: 502, msg: '图片下载失败：HTTP ' + syz_resp.status });
      return;
    }
    const syz_buffer = Buffer.from(await syz_resp.arrayBuffer());
    syz_res.setHeader('Content-Type', syz_resp.headers.get('content-type') || 'image/jpeg');
    syz_res.setHeader('Cache-Control', 'public, max-age=3600');
    syz_res.send(syz_buffer);
  } catch (syz_err) {
    syz_res.status(502).json({ code: 502, msg: '图片代理失败：' + syz_err.message });
  }
});

syz_app.listen(syz_PORT, function () {
  console.log('服务已启动：http://localhost:' + syz_PORT + '/poem.html');
  console.log('接口地址：http://localhost:' + syz_PORT + '/api/poems 、/api/authors');
});

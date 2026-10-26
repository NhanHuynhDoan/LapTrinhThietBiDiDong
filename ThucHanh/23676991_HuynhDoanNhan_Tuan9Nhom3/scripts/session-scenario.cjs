const fs = require('node:fs');
const path = require('node:path');
const jwt = require('../server/node_modules/jsonwebtoken');
const { JWT_SECRET_KEY } = require('../server/node_modules/json-server-auth/dist/constants');

const scenario = process.argv[2];
const expiredToken = jwt.sign({ email: 'test@gmail.com' }, JWT_SECRET_KEY, { subject: '4', expiresIn: -60 });
if (scenario === 'expired-token') {
  const outputDir = path.join(__dirname, '../.test-output');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'expired-token.txt'), expiredToken);
  console.log('Đã tạo JWT hết hạn có chữ ký thật của server bài tập.');
  console.log('Sao chép: Get-Content -Raw .test-output/expired-token.txt | Set-Clipboard');
  console.log('Postman: Authorization > Bearer Token > dán vào ô Token.');
  return;
}
const mutations = {
  expired: `session.token = ${JSON.stringify(expiredToken)};
  session.expiresAt = Date.now() + 86400000;`,
  invalid: `session.token = session.token.split('.').slice(0, 2).join('.') + '.invalid-signature';`,
  forbidden: `session.user.id = session.user.id === 1 ? 4 : 1;`,
};

let code;
if (scenario in mutations) {
  code = `(() => {
  const raw = localStorage.getItem('auth:tuan9_2');
  if (!raw) throw new Error('Hãy đăng nhập test@gmail.com / 123456 trước.');
  const session = JSON.parse(raw);
  ${mutations[scenario]}
  localStorage.setItem('auth:tuan9_2', JSON.stringify(session));
  location.reload();
})();\n`;
} else if (scenario === 'review-expired') {
  code = `(() => {
  window.__restoreMocSachReviewTest?.();
  const proto = XMLHttpRequest.prototype;
  const open = proto.open;
  const setHeader = proto.setRequestHeader;
  const targets = new WeakSet();
  const restore = () => {
    proto.open = open;
    proto.setRequestHeader = setHeader;
    delete window.__restoreMocSachReviewTest;
  };
  window.__restoreMocSachReviewTest = restore;
  proto.open = function(method, url, ...args) {
    if (String(method).toUpperCase() === 'POST' && /\\/reviews(?:[?#]|$)/.test(String(url))) targets.add(this);
    return open.call(this, method, url, ...args);
  };
  proto.setRequestHeader = function(name, value) {
    if (targets.has(this) && String(name).toLowerCase() === 'authorization') {
      value = 'Bearer ' + ${JSON.stringify(expiredToken)};
      restore();
    }
    return setHeader.call(this, name, value);
  };
  console.log('Đã chuẩn bị token hết hạn cho POST /reviews kế tiếp. Bấm Gửi đánh giá, KHÔNG reload.');
})();\n`;
} else {
  console.error('Dùng: npm run test:session -- expired|invalid|forbidden|review-expired|expired-token');
  process.exitCode = 1;
  return;
}

const outputDir = path.join(__dirname, '../.test-output');
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, 'session-console.js'), code);
console.log(`Đã tạo kịch bản ${scenario} tại .test-output/session-console.js.`);
console.log('Sao chép bằng PowerShell: Get-Content -Raw .test-output/session-console.js | Set-Clipboard');
console.log('Dán vào Console (F12) của trang BookStore 9.2 web rồi nhấn Enter.');

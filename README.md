# Cloudflare-PagesKV-wedev
# Cloudflare Pages 文件上传 & 管理系统
一个基于 Cloudflare Pages + KV 实现的轻量文件上传、直链下载、管理员管理系统。
无需服务器，无需数据库，全球加速，完全免费部署。

## ✨ 项目特色
- 纯静态部署，基于 Cloudflare Pages
- 支持文件上传，自动生成**永久直链下载链接**
- 管理员登录（当天一次登录，全天有效）
- 未登录不显示上传与文件列表
- 管理员可查看**所有已上传文件**
- 支持复制下载链接、删除文件
- 链接直接下载，不跳转、不返回主页
- 无广告、无第三方依赖、简洁安全

## 🚀 搭建教程
### 1. 创建 Cloudflare Pages 项目
1. 登录 Cloudflare
2. 进入 Workers & Pages → 创建应用 → 选择 **Pages**
3. 选择 **直接上传**，上传本项目文件夹

### 2. 项目文件结构
functions/
api/
upload.js # 上传接口
[id].js # 下载接口
list.js # 文件列表接口
delete/
[key].js # 删除接口
index.html # 主页（上传 + 管理）

### 3. 部署项目
直接将整个项目上传到 Cloudflare Pages，等待部署完成。

---

## 🔑 KV 绑定注意事项
**本项目必须绑定 KV，否则无法使用！**

### 1. 先创建 KV 命名空间
Cloudflare → Workers & Pages → KV → 创建命名空间（名称随意）

### 2. 绑定到 Pages 项目
1. 进入 Pages 项目 → 设置 → 绑定 → 添加绑定
2. 选择：KV 命名空间
3. 设置：
变量名称：FILE_KV
KV 命名空间：你创建的 KV

### 3. 绑定完成必须 **重新部署**

---

## ⚠️ 绑定 KV 时需要修改的地方
**如果你绑定的 KV 变量名称不是 FILE_KV，必须修改以下文件：**

### 需要修改的文件（4 个）
1. functions/api/upload.js
2. functions/api/[id].js
3. functions/api/list.js
4. functions/api/delete/[key].js

### 把所有文件中的
```js
env.FILE_KV
改为你自己的变量名
env.MY_KV
管理员密码修改
打开 index.html，找到：
const ADMIN_PASSWORD = "123456";
#📌 使用说明
未登录：仅显示登录框
登录后：显示上传 + 文件管理功能
上传后自动生成直链，可复制、可下载
管理员可查看所有文件、删除不需要的文件
登录状态当天有效，无需重复登录
###🎯 演示效果
上传 → 生成直链
直链访问 → 直接下载文件
管理员面板 → 管理所有上传记录
安全、简单、高速

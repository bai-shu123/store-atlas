# 店面货品摆放 · 共享网站

这是一个手机端优先的店面货品区域管理网站。访客可以浏览和搜索共享货品；员工登录后才能新增、编辑、移动、补货和删除货品；管理员还可以管理账号、回收站与操作记录。离线时只允许查看最近缓存。

## 上线前配置 Supabase

1. 在 Supabase 项目中打开 SQL Editor，运行 [`supabase-schema.sql`](./supabase-schema.sql)。
2. 在 Project Settings → API 中复制 Project URL 和 `anon public` key。
3. 将它们填入 [`supabase-config.js`](./supabase-config.js)：

```js
window.STORE_ATLAS_CONFIG = {
  url: 'https://你的项目.supabase.co',
  anonKey: '你的 anon public key'
};
```

只使用 `anon public` key，不要把 `service_role` key 放进网页。当前 SQL 策略只允许匿名访问者读取有效货品；所有写入都要求已启用的员工账号。

完整的数据库、Edge Functions、管理员初始化、Azure Translator 和定时维护步骤见 [`DEPLOYMENT.md`](./DEPLOYMENT.md)。

## 发布到 GitHub Pages

将整个文件夹推送到 GitHub 仓库的 `main` 分支后，`.github/workflows/pages.yml` 会自动发布。首次发布时在仓库 Settings → Pages 中选择 GitHub Actions 作为 Source。

图片会压缩后上传到 Supabase Storage 的 `product-images` 公共桶；货品记录保存在 `products` 表中。网站还包含 PWA manifest 和离线缓存，可添加到手机主屏幕。

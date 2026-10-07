# 店面货品摆放 · 共享网站

这是一个手机端优先的店面货品区域管理网站。默认可以离线运行；配置 Supabase 后，所有访问者会共享同一套货品数据与图片。

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

只使用 `anon public` key，不要把 `service_role` key 放进网页。当前 SQL 策略允许匿名访问者读取、新增、编辑和删除货品，因为本项目目标是让店内所有人共同维护同一份信息。

## 发布到 GitHub Pages

将整个文件夹推送到 GitHub 仓库的 `main` 分支后，`.github/workflows/pages.yml` 会自动发布。首次发布时在仓库 Settings → Pages 中选择 GitHub Actions 作为 Source。

图片会上传到 Supabase Storage 的 `product-images` 公共桶；货品记录保存在 `products` 表中。

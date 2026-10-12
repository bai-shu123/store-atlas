# 店面货品导航部署清单

此版本仍在开发分支中。完成测试前，不要覆盖当前线上主分支。

## Supabase

1. 先备份现有 `products` 表和 Storage。
2. 在 SQL Editor 运行 `supabase-schema.sql`。
3. 部署 `staff-api` 与 `translate-product` Edge Functions。
4. Edge Function 只在服务端配置以下 secrets：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AZURE_TRANSLATOR_KEY`
   - `AZURE_TRANSLATOR_REGION`
   - 可选：`AZURE_TRANSLATOR_ENDPOINT`
5. 不要把 service role key 或 Azure 密钥写入任何前端文件。
6. 用 Supabase Auth 创建主管理员后，把对应 UUID 写入 `staff_profiles`，角色设为 `owner`，用户名设为 `粨蜀`，`must_change_password` 设为 `true`。
7. 主管理员 Auth 邮箱使用已确认的恢复邮箱；临时密码只在后台设置，不能提交到 Git。

## 定时维护

每天调用一次 `select public.run_store_maintenance();`，负责：

- 需要补货连续 7 天后移入回收站；
- 清除到期的 3 天移位提示；
- 永久清理超过 30 天的回收站货品；
- 清理超过一年的操作日志。

可使用 Supabase Cron 在每天店铺闭店后的低峰时段执行。

## 上线前

- 验证匿名访客只能读取有效货品；
- 验证员工离线时不能写入；
- 验证主管理员新设备邮件验证码；
- 验证普通管理员不能管理其他管理员；
- 验证同一区域同编号被数据库拒绝；
- 验证移动、补货、合并、回收站和多语言翻译；
- 在手机 Edge 和桌面 Edge 检查 PWA 安装与离线缓存；
- 轮换任何曾经暴露在聊天或截图中的服务端密钥。

# isdream-blog-admin

## 特性

- **前端模版** 使用 [isdream-vue-admin](https://github.com/isdreamcn/isdream-vue-admin)

## 安装使用

- 获取项目代码

```bash
https://github.com/isdreamcn/isdream-blog-admin.git
https://gitee.com/isdreamcn/isdream-blog-admin.git
```

- 配置 `.env`、`.env.dev`、`.env.prod`（可选）；`.env.dev` 的 `VITE_OAUTH_URL` 指定「主站账号登录」的授权端点（本地联调 `http://localhost:7001/oidc/auth`），不配置时走 `isdream-oauth` 库默认生产地址

- 安装依赖

```bash
cd isdream-blog-admin
pnpm install
```

- 运行

```bash
pnpm run dev
```

- 打包

```bash
pnpm run build
```

## License

[MIT](https://opensource.org/license/mit/)
Copyright (c) 2022-present isdream.cn

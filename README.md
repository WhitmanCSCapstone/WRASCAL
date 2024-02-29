# WRASCAL
Backend repo: [WhitmanCSCapstone/wrascal-ts-2024](https://github.com/WhitmanCSCapstone/wrascal-ts-2024)

## Deployment
To change the base url of the backend, modify the string inside the `baseURL` variable in `src/axiosClient.ts`

``` ts
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ADDR ?? "http://127.0.0.1:8083/rest"
})
```

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

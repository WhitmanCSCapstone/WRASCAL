# WRASCAL

Backend repo: [WhitmanCSCapstone/wrascal-ts-2024](https://github.com/WhitmanCSCapstone/wrascal-ts-2024)

## Deployment

To change the base url of the backend, modify the string inside the `baseURL` variable in `src/axiosClient.ts`

```ts
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ADDR ?? "http://127.0.0.1:8083/rest",
});
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

# Deployment Notes

The frontend service is deployed using the `vite` service. The deployment configuration can be found in the `vite.config.ts` file. The deployment configuration can be modified to change the deployment settings. The service is deployed on the `render` platform. render is easy and straight forward and Documentation for the `render` platform can be found [here](https://render.com/docs).

The backend service is using the `axios` service. The base url for the backend service can be supplied via the following environment variable:

```ts
VITE_BACKEND_ADDR = "<backend-url>";
```

The backend service is also credentialed using the `supabase` service, which is used for user authetificaiton. The credentials for the supabase service can be suplied via the following environment variables:

```ts
VITE_SUPABASE_URL = "https://<supabase-url>.supabase.co";
VITE_SUPABASE_KEY = "<supabase-key>";
```

For this deployment, the login and signup pages are disabled. To enable them, do the following:

uncomment the following lines in `src/routes/index.ts`:

```ts
// NOTE: The following routes are for future development. uncomment when needed

// {
//   path: 'login',
//   name: 'Log In',
//   component: () => import('@/views/LoginPage.vue')
// },
// {
//   path: "register",
//   name: "Register",
//   component: () => import("@/views/RegisterPage.vue"),
// },
// {
//   path: "new-entry",
//   name: "New Entry",
//   component: () => import("@/views/NewEntry.vue"),
// },
```

- Enable the login, logout, new-entry and register buttons by removing `disabled` in the vite btn components in `src/components/App.vue`:

  - Login [<v-btn v-if="!authStore.isLoggedIn" @click="login" `disabled`color="grey"](https://github.com/WhitmanCSCapstone/WRASCAL/blob/131fb44d12795fc971ab2b675c8f4420f68395e1/src/App.vue#L35-L55)
  - Logout [<v-btn v-if="authStore.isLoggedIn" @click="logout" `disabled` color="grey"](https://github.com/WhitmanCSCapstone/WRASCAL/blob/131fb44d12795fc971ab2b675c8f4420f68395e1/src/App.vue#L35-L55)
  - New-entry [<v-btn v-if="authStore.isLoggedIn" @click="newEntry" `disabled` color="grey" >New Entry</v-btn>"](https://github.com/WhitmanCSCapstone/WRASCAL/blob/131fb44d12795fc971ab2b675c8f4420f68395e1/src/App.vue#L35-L55)
  - Register [<v-btn v-if="!authStore.isLoggedIn" @click="register" `disabled` color="grey">Register</v-btn>](https://github.com/WhitmanCSCapstone/WRASCAL/blob/131fb44d12795fc971ab2b675c8f4420f68395e1/src/App.vue#L35-L55)

## Database Configuration

The user data is stored in the `supabase` database. The database configuration can be found in the `src/store/authStore.ts` file. The database configuration can be modified to change the database settings. The service is deployed on the `supabase` platform. supabase is easy and straight forward and Documentation for the `supabase` platform can be found [here](https://supabase.io/docs). The database is configured to store the user data in the same table as the ligand in the auth schema where as in the ligands table is int the public schema.

This app is using a backend that is deployed on render for the ligands and using supabase as a standalone service for authentication. To test user authentication, you can create a supabase and follow documentation for their authentication service. Then supply the `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` environment variables in the `.env` file.

The databas on the render service is strictly for ligands and the database on the supabase service is strictly for user authentication. But this can be changed and all user data can also be written to the render database. To doso, you can have the supabase service write to the render database, or you can use a different service to store user data. User generated data (new entries) is stored in the render database. The data is stored in the schema `public` in the tables ending with `_user_gen`.

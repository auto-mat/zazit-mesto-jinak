# Zažít město jinak frontend (zazit-mesto-jinak)

A Zažít město jinak web app is based on the [Quasar framework](https://quasar.dev/)
([Vue.js version 3](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/),
[TOML](https://toml.io)).

## Install the dependencies

App dependencies

```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

Adjust app config via [TOML](https://toml.io/en/) config file `zazit_mesto_jinak_config.toml` or
via SHELL/ENV variables (check vars with `cat ./src/utils/get_app_conf.js`).

App global vars defined inside config file `zazit_mesto_jinak_config.toml` are overrided
by SHELL/ENV vars (defined here `./src/utils/get_app_conf.js`).

For local run of BE add SHELL/ENV variables or rewrite them in config file `zazit_mesto_jinak_config.toml`:

```bash
export API_BASE=http://localhost:8000/api/
export URL_BASE_BACKEND=http://localhost:8000
```

Start dev server with

```bash
yarn dev
```

### Lint the files

```bash
yarn lint
```

### Format the files

```bash
yarn format
```

### Build the app for production

Adjust app config via [TOML](https://toml.io/en/) config file `zazit_mesto_jinak_config.toml` or
via SHELL/ENV variables (check vars with `cat ./src/utils/get_app_conf.js`).

Build app with

```bash
yarn build
```

Copy content of the `dist/spa/*` dir into webserver Apache/NGINX dir.

### Deployed app

App is automatically deployed into k8 repository.

Open web app URL https://ced-test.dopracenakole.net/#/ with your default browser.

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Licence

[GNU AGPLv3](https://www.gnu.org/licenses/agpl-3.0.en.html) or later.

<img src="https://fit.cvut.cz/static/images/fit-cvut-logo-en.svg" alt="FIT CTU logo" height="200">

This software was developed with the support of the **Faculty of Information Technology, Czech Technical University in Prague**.
For more information, visit [fit.cvut.cz](https://fit.cvut.cz).

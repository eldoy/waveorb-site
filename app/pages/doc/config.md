## Config

The `app/config` folder contains configuration, settings and options for your app. They are loaded into the `app` object and accessible from `$.app.config` inside of your layouts, pages, filters and actions.

Anything you need available, such as properties, data, API keys and environment variables, can be added here. The files here can be JSON, YAML or Javascript files returning objects.

For example, adding a file in `app/config/env.yml` with the content `key: secret-key` will make the `secret-key` value available in `$.app.config.env.key` in your app.

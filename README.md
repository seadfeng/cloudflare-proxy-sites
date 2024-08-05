# Cloudflare Proxy Sites


## Local Deploy 

### 1. install `wrangler`

```sh
npm i -g wrangler
```

### 2. Configure your root domain - **Important!**

Free domain name application:

- https://secure.nom.za/
- https://nic.eu.org/ 
- https://nic.ua

```js
// index.js
// replace to your domain
const currentDomain = "example.com";
```

### 3. deploy to workers

```sh
# Login
wrangler login

# Deploy
wrangler deploy
```


## Or Deploy by Workflows

To automate your deployment process, you can use GitHub Actions or a similar CI/CD tool. Below are the steps to set up your deployment workflow and the necessary GitHub secrets:

### Configure GitHub Secrets

#### Add GitHub Secrets

Store sensitive information as secrets in your GitHub repository. Navigate to your repository settings and add the following secrets:

- **`CLOUDFLARE_API_TOKEN`**: Your Cloudflare **API token**. This token should have permissions to deploy and manage your Cloudflare Workers.
- **`CLOUDFLARE_ACCOUNT_ID`**: Your Cloudflare account ID.


#### To add secrets:

- Go to your repository on GitHub.
- Click on "Settings" in the top menu.
- Select "Secrets" from the sidebar.
- Click on "New repository secret" to add each secret.

## 通过 cloudflare 界面安装

中文安装教程参考, 类似的CF反代，通过目录访问

https://github.com/gaboolic/cloudflare-reverse-proxy


## Configure Workers for Proxy Site

eg. 
- <https://www.proxysites.ai.serp.ing/>, source [www.proxysites.ai](https://www.proxysites.ai)
- <https://www.serpchecking.com.serp.ing/>, source [www.serpchecking.com](https://www.serpchecking.com)

### 1. Go Workers & Pages

Make sure you have deployed to Workers

![Workers & Pages](images/workers-pages.png)

### 2. Add a custom domain for your Worker.

Support multiple domain names, the following only set up a as an example

![Add a custom domain](images/triggers.png)


### 3. Done

Ensure the certificate is active.

![Domain config ](images/done.png)

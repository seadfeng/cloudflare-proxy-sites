# Manual Cloudflare Setup

## 1. Open Workers & Pages

![Open Workers & Pages](images/create1.png)


## 2. Create Worker

![Create Worker](images/create2.png)


## 3. Deploy Worker

![Deploy Worker](images/deploy.png)


## 4. Edit Code

![Edit Code 1](images/edit.png)


Copy your code to editor [workers.dev/index.js](index.js) or [index.js](../index.js)

### workers.dev/index.js

Only support for single domain

In this case, you will need change the code:

```js
// workers.dev/index.js
// replace to your target site domain
const targetDomain = 'example.com';
```

### index.js

Support for multiple domains

![Edit Code 2](images/edit2.png)


## Done and Preview


![Done and Preview](images/done.png)
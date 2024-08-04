addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
 
const getProxySite = (host, rootDomain) => {
  return host.split(`.${rootDomain}`)[0]; 
}
 
const currentDomain = "serp.ing";

async function handleRequest(request) {
  const url = new URL(request.url);
  const host = url.host;

  if (url.pathname === '/robots.txt') {
    const robots = `User-agent: *
Disallow: /
    `;
   return new Response(robots,{ status: 200 });
  }

  const proxySite = getProxySite(host, currentDomain);

  const serverHost = host;
  const urlPath = url.pathname;
  const origin = `https://${proxySite}`; 
  const actualUrl = new URL(`${origin}${urlPath}${url.search}${url.hash}`); 

  const modifiedRequestInit = {
    method: request.method,
    headers: request.headers,
    redirect: 'follow'
  };

  if (!['GET', 'HEAD'].includes(request.method)) {
    const requestBody = await request.clone().arrayBuffer();
    modifiedRequestInit.body = requestBody;
  }

  const modifiedRequest = new Request(actualUrl, modifiedRequestInit);

  const response = await fetch(modifiedRequest);

  let body = await response.arrayBuffer();
  const contentType = response.headers.get('content-type');

  if (contentType && (contentType.includes('text/') || contentType.includes('application/x-javascript'))) {
    let text = new TextDecoder('utf-8').decode(body);
    text = text.replace(new RegExp( proxySite, 'g'), serverHost );
    body = new TextEncoder().encode(text).buffer;
  }

  const modifiedResponse = new Response(body, response);
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  return modifiedResponse; 
 
}

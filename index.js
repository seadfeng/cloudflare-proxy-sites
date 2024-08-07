addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
 
const getTargetDomain = (host, rootDomain) => {
  return host.split(`.${rootDomain}`)[0]; 
}
 
const ownDomain = "serp.ing";

async function handleRequest(request) {
  const url = new URL(request.url);
  const { host, pathname } = url;

  if (pathname === '/robots.txt') {
    const robots = `User-agent: *
Disallow: /
    `;
   return new Response(robots,{ status: 200 });
  }

  const targetDomain = getTargetDomain(host, ownDomain); 
  const origin = `https://${targetDomain}`; 
  const actualUrl = new URL(`${origin}${pathname}${url.search}${url.hash}`); 

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

  // Check if the 'content-type' exists and matches JavaScript or any text/* types (e.g., text/html, text/xml)
  if (contentType && ( /^(application\/x-javascript|text\/)/i.test(contentType))) {
    let text = new TextDecoder('utf-8').decode(body);

    // Replace all instances of the proxy site domain with the current host domain in the text
    text = text.replace(new RegExp( `(//|https?://)${targetDomain}`, 'g'), `$1${host}` );
    body = new TextEncoder().encode(text).buffer;
  }

  const modifiedResponse = new Response(body, response);
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  return modifiedResponse; 
 
}

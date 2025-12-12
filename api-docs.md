---
title: "Developer Resource"
navTitle: "Getting Started"
slug: "/developers"
type: "overview"
description: "Welcome to our IPinfo developer resource - the quickest and easiest way to get started with IPinfo is to use one of our official libraries."
---

# IPinfo Developer Resource

The quickest and easiest way to get started with IPinfo is to use one of our [official libraries](/developers/libraries), which are available for many popular programming languages and frameworks. If you'd like to write your own library or interact directly with our API, then the documentation below can help you.

## Authentication

Your API token is used to authenticate you with our API and can be provided either as an HTTP Basic Auth username, a bearer token, or alternatively as a token URL parameter.

```bash
# With Basic Auth
curl -u $TOKEN: ipinfo.io

# With Bearer token
curl -H "Authorization: Bearer $TOKEN" ipinfo.io

# With token query parameter
curl ipinfo.io?token=$TOKEN
```

## JSON Response

We try to automatically detect when someone wants to call our API versus view our website, and then we send back the appropriate JSON response rather than HTML. We do this based on the user agent for known popular programming languages, tools, and frameworks. However, there are a couple of other ways to force a JSON response when it doesn't happen automatically.

One is to append `/json` at the end of any request:

```bash
curl ipinfo.io/json
curl ipinfo.io/8.8.8.8/json
```

The other is to set the `Accept` header to `application/json`:

```bash
curl -H "Accept: application/json" ipinfo.io
curl -H "Accept: application/json" ipinfo.io/8.8.8.8
```

## IP Address Parameter

The API supports passing in a single IPv4 or IPv6 IP address. Alternatively, if you do not pass in any IP address, we'll return details for the calling address. This allows you to look up your own (or a visitor to your site) IP address details without knowing the IP address in advance.

```bash
# Get details for 8.8.8.8
curl ipinfo.io/8.8.8.8?token=$TOKEN

# Get details for 2001:4860:4860::8888
curl ipinfo.io/2001:4860:4860::8888?token=$TOKEN

# Get details for your own IP address, which'll be included in the response
curl ipinfo.io?token=$TOKEN
```

## HTTPS/ SSL

Our API is available over a secure HTTPS connection for all users. Simply add `https://` to the request URLs to make the requests secure.

```bash
# Get details for your own IP address over HTTPS
curl https://ipinfo.io?token=$TOKEN
```

## Rate Limits

IPinfo Lite offers unlimited access to our API.

Paid plans include monthly request limits with configurable alerts to help you stay in control. If you exceed your plan’s limit, you’ll receive a 429 HTTP status code—but with metered billing, you can automatically extend your usage without interruptions.

[Paid plans](/pricing) come with higher monthly limits, and configurable alerts.

## Filtering Responses

You can filter the API response down to specific fields or objects by adding the field or object name to the URL. In the case of a field you'll get it returned in plaintext, and an object will get returned as JSON.

```bash
# Get json the org field as plaintext
curl ipinfo.io/8.8.8.8/org?token=$TOKEN
AS15169 Google Inc.

# Get just the city as plaintext
curl ipinfo.io/8.8.8.8/city?token=$TOKEN
Mountain View

# Get country ISO code as plaintext
curl ipinfo.io/8.8.8.8/country?token=$TOKEN
US
```

## JSONP/ CORS Requests

JSONP and CORS are supported, allowing you to use ipinfo.io entirely in client-side code. For JSONP you just need to specify the callback parameter, e.g. `http://ipinfo.io/?callback=callback&token=$TOKEN`.

### Request visitor data using Fetch API (Promise)

```javascript
fetch("https://ipinfo.io/json?token=$TOKEN")
  .then((response) => response.json())
  .then((jsonResponse) => console.log(jsonResponse.ip, jsonResponse.country));
```

### Request visitor data using Fetch API (Async/Await)

```javascript
const request = await fetch("https://ipinfo.io/json?token=$TOKEN");
const jsonResponse = await request.json();

console.log(jsonResponse.ip, jsonResponse.country);
```

### Request visitor data using JSONP

```html
<script>
  function recordData(data) {
    console.log(data.ip, data.country);
  }
</script>
<script src="https://ipinfo.io/json?callback=recordData"></script>
```

## IPv6 API endpoint

IPinfo's API ensures seamless support for both IPv4 and IPv6 connection. However, for technical reasons, we use distinct API endpoints:

- IPv4 connection: [ipinfo.io](https://ipinfo.io/)
- IPv6 connection: [v6.ipinfo.io](https://v6.ipinfo.io/)

If you're on an IPv6 address, use the ### [v6.ipinfo.io](https://v6.ipinfo.io/) API endpoint, which functions identically to the standard IPv4 API. All API parameters and arguments are supported as usual.

Example:

```bash
curl https://v6.ipinfo.io
```

Our website, however, is fully dual-stacked, supporting both IPv4 and IPv6 natively through the [ipinfo.io](https://ipinfo.io/) domain. Our IP data download product always includes both IPv4 and IPv6 IP addresses in each individual database download. If you are looking up IPv6 addresses as an API parameter or input, you can do so simply as well. Usage of [v6.ipinfo.io](https://v6.ipinfo.io/) only applies to IPv6 traffic visiting our API service.

### Why Separate API Endpoints

By separating the API endpoints, we prevent unintended behavior when tools default to IPv6 (via AAAA records). This ensures you receive the expected address type for your query. Because if we have A and AAAA records for the domain (supporting both v4 and v6), the users would get their v6 address back when they go to ipinfo.io's API (internet services usually default to v6 if it’s available), which is not usually what they expect.

## Updated API System

With the release of our [IPinfo Lite API service](https://ipinfo.io/lite), we are rolling out a new API system available at `https://api.ipinfo.io`. This API system is much more robust in handling billions of requests and addresses DNS level issues with IPv6 and IPv4 connections. We are actively developing the API system and [we welcome feedback and queries from our IPinfo user community](https://community.ipinfo.io/). It supports our existing authentication methods as well.

### IP Lookup query - IPinfo Lite API

```bash
curl http://api.ipinfo.io/lite/104.28.246.147?token=$TOKEN
```

```json
{
  "ip": "104.28.246.147",
  "asn": "AS13335",
  "as_name": "Cloudflare, Inc.",
  "as_domain": "cloudflare.com",
  "country_code": "SG",
  "country": "Singapore",
  "continent_code": "AS",
  "continent": "Asia"
}
```

### IP Lookup query - IPinfo Lite API Visitor/Use

The `/me` endpoint provides the IP information of the visitor the URL.

```bash
curl https://api.ipinfo.io/lite/me?token=$TOKEN
```

```json
{
  "ip": "8.8.8.8",
  "asn": "AS15169",
  "as_name": "Google LLC",
  "as_domain": "google.com",
  "country_code": "US",
  "country": "United States",
  "continent_code": "NA",
  "continent": "North America"
}
```

### Simplified API system for IPv6 connections

Our new API system is dual stacked, making it easier for users on IPv6 connections. You can access the API seamlessly without needing to switch endpoints.

```bash
curl -6 https://api.ipinfo.io/lite/me?token=$TOKEN
```

```json
{
  "ip": "2602:f8de::",
  "asn": "AS53356",
  "as_name": "Free Range Cloud Hosting Inc.",
  "as_domain": "freerangecloud.com",
  "country_code": "US",
  "country": "United States",
  "continent_code": "NA",
  "continent": "North America"
}
```

```bash
curl -4 https://api.ipinfo.io/lite/me?token=$TOKEN
```

```json
{
  "ip": "102.135.36.0",
  "asn": "AS208485",
  "as_name": "Nese Mala trading as Moon Dc",
  "as_domain": "moondc.com",
  "country_code": "TR",
  "country": "Turkey",
  "continent_code": "AS",
  "continent": "Asia"
}
```

### Explicity IPv4 and IPv6 endpoint - IPinfo Lite API

For IPv4 connections, you can prepend the API endpoint with the subdomain `v4`.

```bash
curl https://v4.api.ipinfo.io/lite/me?token=$TOKEN
curl https://v4.api.ipinfo.io/lite/8.8.8.8?token=$TOKEN
```

For IPv6 connections, you can prepend the API endpoint with the subdomain `v6`.

```bash
curl https://v6.api.ipinfo.io/lite/me?token=$TOKEN
curl https://v6.api.ipinfo.io/lite/8.8.8.8?token=$TOKEN
```
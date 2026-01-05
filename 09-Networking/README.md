# Frontend-Backend Communication

## Overview
- Explains how frontend and backend exchange data.
- Covers HTTP protocol, request-response flow, HTTP messages, methods, GET vs POST, and status codes.
- Helps frontend developers understand backend operations for effective collaboration.

---

## Frontend-Backend Data Exchange and HTTP
- Frontend alone cannot provide dynamic content; backend is required.
- Frontend-backend communication is the data exchange between browser (frontend) and server (backend).
- HTTP protocol defines the rules for this communication.

---

## 1. Understanding Frontend-Backend Communication

### What is Frontend-Backend Communication?
- The process of exchanging data between frontend (browser) and backend (server).
- Frontend needs backend data; backend may require frontend input.

### Backend-to-Frontend Data Transfer
- Example: visiting a webpage.
- Browser requests HTML, CSS, JS, images, etc., from the server.
- Server responds with the requested files for rendering the webpage.

### Frontend-to-Backend Data Transfer
- Example: user login, registration, search forms, or form submission.
- Frontend sends user input to backend; backend processes it and returns a result.

### Communication Flow
- Browser usually initiates the request (active) and server responds (passive).
- Communication follows a **request-response cycle**.

### Key Concepts
- **Frontend:** browser side.  
- **Client:** any tool that can communicate with a server (browser, CLI tools like `curl`).  
- **Backend:** server side.

---

## 2. Methods of Frontend-Backend Communication

### Accessing a Webpage via Browser
- Typing a URL and pressing Enter triggers a request to the server.

### HTML Tags That Trigger Requests
- Tags that automatically request resources: `<link>`, `<img>`, `<script>`, `<iframe>`.  
- User actions can also trigger requests: `<a>` (click), `<form>` (submit).

### Ajax and Fetch
- Both are techniques for asynchronous frontend-backend communication.
- Fetch is newer, Promise-based, but less compatible and lacks features like timeout or abort.

---

## 3. HTTP Protocol

### What is HTTP?
- HTTP = Hyper Text Transfer Protocol.
- Defines rules for transmitting files (HTML, JS, CSS, images) between server and browser.
- Every frontend-backend communication follows HTTP requests and responses.

### HTTP Request-Response Flow

> What happens when you enters a URL in the browser's address bar?

1. Checking for cache
   1. if cache valid, use it
   2. if expired, request from server
2. DNS lookup & TCP connection
   1. if IP is not stored locally, the browser asks DNS server to resolve the domain name to IP (This takes longer)
   2. establish a TCP connection to the server
3. HTTP request & response
   1. sends HTTP requests to the server
   2. receive HTTP response from the server
   3. render the content & may update the cache.

> The reason why we experience delays when we access a webpage the very first time is because of DNS lookup.

### HTTP Messages
- **Request message:** sent from browser to server.  
- **Response message:** sent from server to browser.  
- Structure: headers + body.  
- GET typically has no body; POST may include a body.

---

## 4. HTTP Methods

### Common HTTP Methods
- `GET`, `POST`, `PUT`, `DELETE`
- Define the operation type on a resource.

### Semantics of Methods
- `GET` → fetch data  
- `POST` → create data  
- `PUT` → update data  
- `DELETE` → remove data  
- Summarized as **CRUD** (Create, Read, Update, Delete).

### RESTful API Design
- RESTful APIs use HTTP methods semantically.
- Example:  
  
```text
GET /user?id=1    → fetch user info
POST /user        → create user
PUT /user         → update user
DELETE /user      → delete user
 
```
### GET vs POST

- GET: sends data via URL's query string, limited size, can be cached, visible in browser.

- POST: sends data via request body, larger size, not cached, slightly safer for sensitive info.

> Technically, all HTTP methods can contains a request body, but request body on GET may not be useful becuase it can get ignored / rejected by the servers.
> POST can also carry data on the URLs like GET, but it is rare in practice.

---

## 5. HTTP Status Codes

- 100–199: informational, request accepted, continue processing. (e.g., 101 switching protocols)

- 200–299: success, request processed successfully. (e.g., 200 ok)

- 300–399: redirection (e.g., 301 permanent redirect  ).

- 400–499: client error (e.g., 404 Not Found).

- 500–599: server error (e.g., 500 Internal Server Error).

**Common 301 Redirection Strategies:**

> - prevents poor user experience (broken links, 404 errors)
> - prevent SEO issue caused by abandoned / outdated URLs.

- HTTP no-www → www
- HTTP www → no-www
- HTTPs no-www → www
- HTTPs no-www → www

**Caveats of Using 301 Redirection**
1. Permanent.
   - Browsers can cache the redirect.
   - We cannot control users' browser cache.
   - If something has changed in the server side, users may continue to be redirected to the old or incorrect URL!
2. Request method for the subsequent request may change.
   - `POST` → `GET`
   - Use 307 temporary redirect / 308 permanent redirect to prevent the request method from changing in the subsequent request.
---

## Summary

- Frontend-backend communication is request-response based.

- Methods: browser, HTML tags, Ajax, Fetch.

- HTTP protocol governs data transmission.

- Key concepts: HTTP request-response, messages, methods (GET/POST/PUT/DELETE), status codes.

- Essential for frontend-backend collaboration and teamwork.
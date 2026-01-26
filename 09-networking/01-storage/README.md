# Storage

## 01 HTTP Cookie

Small piece of text data a server sent to a user's web browser.

The browser can do something to the cookies.

In most cases, the browser will attach the cookies in the subsequent requests to the server.

Since HTTP protocol is stateless, cookies makes web application able to remember state.


**Purposes:**
1. Session Management: user sign-in status, shopping cart content, game scores, etc.
2. Personalization: language, UI theme
3. Tracking: user behavior analysis


**Downsides:**
1. Limited number (50+ - 180+) of cookies per domain
2. Limited size per cookie (~4KB)
3. Cookies are sent in every request


**Read and Write Cookies:**

```js
// Read cookie
document.cookie // return string: "name1=value1; name2=value2"

// Write cookie
document.cookie = "name=value;"

// Update cookie
// - Same name + same path (and domain if specified) -> overwrites value
document.cookie = "name=newVal;"

// Delete cookie
// - Must match name + path (and domain if specified)
// - max-age <= 0 makes cookie expires immediately
document.cookie = "name=val;max-age=0"
```

**Cookie Properties**

1. name-value (required)
2. expires (Date in UTC/GMT format) / max-age (Number - second)
3. domain
4. path
5. HttpOnly (server-only access)
6. Secure
7. Same-site

> - Unless specified otherwise, these properties can be set by JavaScript in browser content too.
> - When max-age / expires are not specified explicitly, the cookie becomes session cookie.
>> - Session cookies are stored for the current **browser session** and expire when the browser is closed

**Same Cookie**
- Name + Domain + Path must match

**What kind of cookie will be sent to the server?**
- Domain & Path must match the requested url.
- Secure must be fulfilled (HTTPS if set).
- Not expired.


## 02 Local Storage & Session Storage

Modern web storage

Instances of Storage

**Local Storage**

- Permanent storage
- ~5MB per origin
- No limitation on individual stored data

**Session Storage**

- The data is stored for the current page / tab session only
- Closing tab / browser window removes the stored data (session storage)


**API:**

```js
// setItem(key, value): set stored data

// getItem(key): get stored data with key

// removeItem(key): remove stored data with key

// clear(): clear the stored data

// length: number of stored data
```


// named exports are live binding (reference), not copy (snapshot).
export let user = "twx";

// After 3 sec, user is changed.
setTimeout(() => {
  user = "too wei xin";
}, 3000);

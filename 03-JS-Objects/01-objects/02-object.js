var user = {
  id: 1,
  name: "Too",
  status: "SCLFSDFLKDSJF",
  status2: "dfjijfoiesdfjosdfg",
};

delete user.status;
delete user["status2"];

console.log(user);

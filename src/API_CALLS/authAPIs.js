export const login = (userLogin) => {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(userLogin),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      return;
    });
};

// To retrieve info of logged in user
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.loggedIn) {
    return JSON.parse(localStorage.getItem("loggedIn"));
  }
  return false;
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("loggedIn", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedIn");
    next();
  }
};

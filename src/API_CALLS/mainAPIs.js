export const createContact = (token, details) => {
  return fetch(`${process.env.REACT_APP_API_URL}/contacts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(details),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

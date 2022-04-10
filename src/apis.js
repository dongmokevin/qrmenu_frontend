import { toast } from "react-toastify";

const axios = require("axios");

export function signin1(username, password) {
  return fetch("/auth/token/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      console.log(response);

      //if is success
      if (response.ok) {
        return response.json();
      }

      //Otherwise, if thereare errors
      return response
        .json()
        .then((json) => {
          if (response.status === 400) {
            console.log(json);
            const errors = Object.keys(json).map((k) => `${json[k].join(" ")}`);
            throw new Error(errors.join(" "));
          }
          throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
          if (e.name === "SyntaxError") {
            throw new Error(response.statusText);
          }
          throw new Error(e);
        });
    })
    .then((json) => {
      //call API successfully
      toast(JSON.stringify(json), { type: "success" });
    })
    .catch((e) => {
      //handle all errors
      toast(e.message, { type: "error" });
    });
}

export function signin(username, password) {
  return axios
    .post("/auth/token/login/", { username: username, password: password })
    .then((response) => {
      console.log(response.data);
      // toast(JSON.stringify(response.data), { type: "success" });
      return response.data;
    })
    .catch((error) => {
      console.log("Me");
      //   const err = error.toJSON();
      if (error.response) {
        const data = error.response.data;
        const errors = Object.keys(data).map(
          (k) => `${k.toUpperCase()} Error: ${data[k].join(" ")}`
        );

        toast(errors.join(" "), { type: "error" });
      }
    });
}

export function register(username, password) {
  return axios
    .post("/auth/users/", { username: username, password: password })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Me");
      //   const err = error.toJSON();
      if (error.response) {
        const data = error.response.data;
        const errors = Object.keys(data).map(
          (k) => `${k.toUpperCase()} Error: ${data[k].join(" ")}`
        );

        toast(errors.join(" "), { type: "error" });
      }
    });
}

export function fetchPlaces(token) {
  return axios
    .get("api/places/", {
      headers: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
}

export function addPlaces(data, token) {
  return axios({
    method: "post",
    url: "/api/places/",
    data: data,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function uploadImage1(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "qrmenu");

  return axios
    .post(
      "https://api.cloudinary.com/v1_1/the-university-of-bamenda/image/upload",
      { body: formData }
    )
    .then((response) => {
      return response.json();
    });
}

export function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "qrmenu_photos");

  return fetch("https://api.cloudinary.com/v1_1/democ4s/image/upload", {
    method: "POST",
    body: formData,
  }).then((response) => {
    return response.json();
  });
}

export function fetchPlace(id, token) {
  return axios.get(`/api/places/${id}`, {
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function addCategory(data, token) {
  return axios({
    method: "post",
    url: "/api/categories/",
    data: data,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function addMenuItems(data, token) {
  return axios({
    method: "post",
    url: "/api/menu_items/",
    data: data,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function updateMenuItem(id, data, token) {
  return axios({
    method: "PATCH",
    url: `/api/menu_items/${id}`,
    data: data,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function removePlace(id, token) {
  return axios({
    method: "delete",
    url: `/api/places/${id}`,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function removeCategory(id, token) {
  return axios({
    method: "delete",
    url: `/api/categories/${id}`,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function removeMenuItem(id, token) {
  return axios({
    method: "delete",
    url: `/api/menu_items/${id}`,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

export function updatePlace(id, data, token) {
  return axios({
    method: "patch",
    url: `/api/places/${id}`,
    data: data,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
  });
}

// export function createPaymentIntent(data, token) {
//   return axios({
//     method: "post",
//     url: `/api/create_payment_intent/`,
//     data: data,
//     headers: {
//       Authorization: token ? `Token ${token}` : "",
//       "Content-Type": "application/json",
//     },
//   });
// }

function request(path, { data = null, token = null, method = "GET" }) {
  return fetch(path, {
    method,
    headers: {
      Authorization: token ? `Token ${token}` : "",
      "Content-Type": "application/json",
    },
    body: method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
  })
    .then((response) => {
      // If it is success
      if (response.ok) {
        if (method === "DELETE") {
          // If delete, nothing return
          return true;
        }
        return response.json();
      }

      // Otherwise, if there are errors
      return response
        .json()
        .then((json) => {
          // Handle JSON error, response by the server

          if (response.status === 400) {
            const errors = Object.keys(json).map((k) => `${json[k].join(" ")}`);
            throw new Error(errors.join(" "));
          }
          throw new Error(JSON.stringify(json));
        })
        .catch((e) => {
          if (e.name === "SyntaxError") {
            throw new Error(response.statusText);
          }
          throw new Error(e);
        });
    })
    .catch((e) => {
      // Handle all errors
      toast(e.message, { type: "error" });
    });
}

export function createPaymentIntent(data, token) {
  return request("/api/create_payment_intent/", {
    data,
    token,
    method: "POST",
  });
}

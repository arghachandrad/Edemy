import axios from "./customAxios"

export const CallWithOutAuth = async (method, apiUrl, body) => {
  let url = "/api/v1" + apiUrl
  if (method === "POST") {
    const response = await axios.post(url, body)
    return Promise.resolve(response)
  }
  if (method === "PUT") {
    const response = await axios.put(url, body)
    return Promise.resolve(response)
  }
  if (method === "PATCH") {
    const response = await axios.patch(url, body)
    return Promise.resolve(response)
  }
  if (method === "GET") {
    const response = await axios.get(url)
    return Promise.resolve(response)
  }
  if (method === "DELETE") {
    const response = await axios.delete(url)
    return Promise.resolve(response)
  }
}

export const CallWithAuth = async (method, apiUrl, body) => {
  const header = {
    // headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }

  let url = "/api/v1" + apiUrl // no base_url required because using custom server nextjs we are using same origin

  if (method === "POST") {
    const response = await axios.post(url, body, header)
    return Promise.resolve(response)
  }
  if (method === "PUT") {
    const response = await axios.put(url, body, header)
    return Promise.resolve(response)
  }
  if (method === "PATCH") {
    const response = await axios.patch(url, body, header)
    return Promise.resolve(response)
  }
  if (method === "DELETE") {
    const response = await axios.delete(url, header)
    return Promise.resolve(response)
  }
  if (method === "GET") {
    const response = await axios.get(url, header)
    return Promise.resolve(response)
  }
}

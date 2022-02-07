import axios from "axios"

export const CallWithOutAuth = async (method, apiUrl, body) => {
  let url = process.env.NEXT_PUBLIC_BASE_URL + apiUrl
  if (method === "POST") {
    const response = await axios.post(url, body)
    return Promise.resolve(response)
    // try {
    //   const response = await axios.post(url, body)
    //   if (response.status === 200 || response.status === 201) {
    //     return Promise.resolve({ status: true, res: response })
    //   } else {
    //     return Promise.resolve({ status: false, res: response })
    //   }
    // } catch (error) {
    //   return Promise.resolve({ status: false, res: error })
    // }
  }
  if (method === "PUT") {
    try {
      const response = await axios.put(url, body)
      if (response.status === 200) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
  if (method === "PATCH") {
    try {
      const response = await axios.patch(url, body)
      if (response.status === 200) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
  if (method === "GET") {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
}

export const CallWithAuth = async (method, apiUrl, body) => {
  const header = {
    // headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }

  let url = process.env.BASE_URL + apiUrl

  if (method === "POST") {
    try {
      const response = await axios.post(url, body, header)
      if (response.status === 200 || response.status === 201) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
  if (method === "PUT") {
    try {
      const response = await axios.put(url, body, header)
      if (response.status === 200) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
  if (method === "PATCH") {
    try {
      const response = await axios.patch(url, body, header)
      if (response.status === 200) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
  if (method === "DELETE") {
    try {
      const response = await axios.delete(url, header)
      if (response.status === 200) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
  if (method === "GET") {
    try {
      const response = await axios.get(url, header)
      if (response.status === 200) {
        return Promise.resolve({ status: true, res: response })
      } else {
        return Promise.resolve({ status: false, res: response })
      }
    } catch (error) {
      return Promise.resolve({ status: false, res: error })
    }
  }
}

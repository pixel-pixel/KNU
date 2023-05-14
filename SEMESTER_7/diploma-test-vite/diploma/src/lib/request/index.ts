
export const request = {
  async POST(url: string, body?: object, headers?: object) {
    const strBody = JSON.stringify(body)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: strBody
    }) 

    return res.json()
  }
}
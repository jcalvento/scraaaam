export const stubPost = (http, url, payload, returnValue) => {
    http.post.withArgs(url, payload).callsFake(() => {
        return createResponse(returnValue)
    })
  }

export const createResponse = (data) => {
    return {
      toPromise() {
        return Promise.resolve({
          json() {
            return data;
          }
        })
      }
    }
  }
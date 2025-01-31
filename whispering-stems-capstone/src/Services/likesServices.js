export const getAllArrangementLikes = () => {
    return fetch (`http://localhost:8088/arrangement_likes?_expand=arrangement`).then(res => res.json())
}

export const createUserEntryLike = (newEntry) => {
    return fetch (`http://localhost:8088/arrangement_likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry)
    }).then((res) => res.json())
  }

export const deleteUserLikeEntry = (arrangementId) => {
    return fetch (`http://localhost:8088/arrangement_likes/${arrangementId}`, {
      method: "DELETE"
    }).then((res) => res.json())
  }
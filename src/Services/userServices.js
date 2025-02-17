export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  )
}

export const createUser = (customer) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  }).then((res) => res.json())
}

export const getUserByUserId = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}`).then((res) => res.json())
}

export const editUserById = (user) => {
  return fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
}

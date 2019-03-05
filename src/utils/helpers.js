import decode from "jwt-decode"

// Async function to remove try catch in functions
export const asyncAction = promise => {
  return promise.then(data => [null, data]).catch(error => [error])
}

// format GraphQl errors
export const formatErrors = (error, state) => {
  if (error.graphQLErrors && error.graphQLErrors.length) {
    state = { ...state, error: `GRAPHQL_ERROR: ${error.graphQLErrors}` }
  }
  if (error.networkError) {
    state = { ...state, error: `REQUEST_ERROR: ${error.networkError.message}` }
  }

  return state
}

export const isInteger = num => /^[0-9]\d*$/.test(num)

export const uniqueObjects = (arr, key) =>
  arr.filter(
    (obj_1, i) => arr.findIndex(obj_2 => obj_2[key] === obj_1[key]) === i
  )

export const removeDuplicateInts = arr =>
  arr.filter((a, i) => arr.findIndex(b => a === b) === i)

export const round = value => {
  return Number(Math.round(value + "e2") + "e-2")
}

export const decimalNumbersTwoDigits = num =>
  Number(Number(Math.round(num + "e2") + "e-2")).toFixed(2)

export const isAuth = () => {
  try {
    const token =
      typeof window !== "undefined" &&
      window.localStorage.getItem("authorization")

    const t = decode(token)
    const { exp } = t
    const currentTime = new Date().getTime() / 1000

    // Token expired
    if (exp < currentTime) {
      typeof window !== "undefined" &&
        window.localStorage.removeItem("authorization")
      return false
    }

    return true
  } catch (error) {
    typeof window !== "undefined" &&
      window.localStorage.removeItem("authorization")
    return false
  }
}


export const SERVER_API_URL = "http://localhost:80/messenger";


export const AUTH_TOKEN_KEY = 'messenger-token';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const PROJECT_STATUS = [
  {
    key: "0",
    value: "New"
  },
  {
    key: "1",
    value: "Progress"
  },
  {
    key: "2",
    value: "Pending"
  },
  {
    key: "3",
    value: "Done"
  }
]

export const TASK_STATUS = {
  NEW: {key: 'NEW', value: 0},
  TODO: {key: 'TODO', value: 1},
  PROGRESS: {key: 'PROGRESS', value: 2},
  DONE: {key: 'DONE', value: 3},
  CANCELED: {key: 'CANCELED', value: 4},
}

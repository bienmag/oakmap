require('dotenv').config()

if (process.env.MONGODB_URL === undefined) {
  throw new Error('MONGODB_URL must be defined as an env variable')
}
export const MONGODB_URL = process.env.MONGODB_URL
if (process.env.MONGODB_DB === undefined) {
  throw new Error('MONGODB_DB must be defined as an env variable')
}
export const MONGODB_DB = process.env.MONGODB_DB


if (process.env.GOOGLE_CLIENT_ID === undefined) {
  throw new Error('GOOGLE_CLIENT_ID must be defined as an env variable')
}
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID




if (process.env.GOOGLE_CLIENT_SECRET === undefined) {
  throw new Error('GOOGLE_CLIENT_SECRET must be defined as an env variable')
}
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

if (process.env.JWT_SECRET === undefined) {
  throw new Error('JWT_SECRET must be defined as an env variable')
}
export const JWT_SECRET = process.env.GOOGLE_CLIENT_ID


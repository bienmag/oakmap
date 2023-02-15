if(process.env.MONGODB_URL === undefined) {
  throw new Error('MONGODB_URL must be defined as an env variable')
}
export const MONGODB_URL = process.env.MONGODB_URL
if(process.env.MONGODB_DB === undefined) {
  throw new Error('MONGODB_DB must be defined as an env variable')
}
export const MONGODB_DB = process.env.MONGODB_DB
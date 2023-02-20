

export const GOOGLE_CLIENT_ID = ensureEnvVarExistance('GOOGLE_CLIENT_ID')
export const GOOGLE_CLIENT_SECRET = ensureEnvVarExistance('GOOGLE_CLIENT_SECRET')
export const JWT_SECRET = ensureEnvVarExistance('JWT_SECRET')

function ensureEnvVarExistance(name: string): string {
  const value = process.env[name]
  if (value === undefined) {
    throw new Error(`${name} must be defined as an env variable`)
  }
  return value
}
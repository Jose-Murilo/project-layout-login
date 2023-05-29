import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = 'chaveDeCriptografia'

// Função para criptografar os dados
export const encryptData = (
  data:
    | { name: string; password: string }
    | string
    | {
        newPassword: string
        confirmNewPassword: string
      },
) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    ENCRYPTION_KEY,
  ).toString()
  return encryptedData
}

// Função para descriptografar os dados

export const decryptData = (encryptedData: string | null) => {
  if (encryptedData == null) return

  const decryptedDataBytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
  const decryptedData = JSON.parse(
    decryptedDataBytes.toString(CryptoJS.enc.Utf8),
  )
  return decryptedData
}

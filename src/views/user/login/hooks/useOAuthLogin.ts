import { useUserStore } from '@/store'

// 生成安全的 state 参数
function generateState(length = 32) {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .slice(0, Math.ceil((length * 4) / 3)) // 精确长度控制
}

// 生成安全的随机字符串 (Base64URL)
function generateCodeVerifier(length = 43) {
  const array = new Uint8Array(length)
  window.crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .substring(0, length)
}

const viteEnv = import.meta.env

// 生成 code_challenge (S256 方法)
async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await window.crypto.subtle.digest('SHA-256', data)

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const useOAuthLogin = () => {
  const oauthLoginTo = async () => {
    const state = generateState()
    const code_verifier = generateCodeVerifier()
    const code_challenge = await generateCodeChallenge(code_verifier)

    const data = {
      client_id: viteEnv.VITE_OAUTH_CLIENT_ID,
      scope: 'openid profile',
      response_type: 'code',
      redirect_uri: viteEnv.VITE_OAUTH_REDIRECT_URI,
      code_challenge,
      state
    }

    const url =
      `https://api.account.isdream.cn/oidc/auth?` +
      `client_id=${data.client_id}&` +
      `redirect_uri=${data.redirect_uri}&` +
      `scope=${data.scope}&` +
      `response_type=${data.response_type}&` +
      `code_challenge=${data.code_challenge}&` +
      `code_challenge_method=S256&` +
      `state=${data.state}`

    sessionStorage.setItem('code_verifier', code_verifier)
    sessionStorage.setItem('state', state)

    location.href = url
  }

  const oauthLoginVerify = () => {
    return new Promise<{
      code: string
      code_verifier: string
    }>((resolve, reject) => {
      const code_verifier = sessionStorage.getItem('code_verifier')
      const state = sessionStorage.getItem('state')

      // `location.search` 得到url中?之后#之前的部分
      const searchParams = new URLSearchParams(location.search)
      const code = searchParams.get('code')

      if (!code) return reject('code获取不到')
      if (!code_verifier) return reject('code_verifier获取不到')
      if (state !== searchParams.get('state')) return reject('state发生变更')

      resolve({
        code,
        code_verifier
      })
    })
  }

  const oauthLogin = () => {
    oauthLoginVerify().then((res) => {
      useUserStore().oauthLogin(res)
    })
  }

  return {
    oauthLoginTo,
    oauthLogin
  }
}

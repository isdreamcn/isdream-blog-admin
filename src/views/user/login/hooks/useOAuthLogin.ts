// useOAuthLogin.ts
import { useUserStore } from '@/store'

// ---------- 工具函数 ----------
/** 生成随机 Base64URL 字符串（不截断，长度固定） */
function base64URLEncode(buffer: Uint8Array) {
  let binary = ''
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i])
  }
  return btoa(binary)
    .replace(/\+/g, '-') // URL安全字符替换
    .replace(/\//g, '_')
    .replace(/=/g, '') // 移除填充
}

/** 生成 state（默认 32 字节 => 43 字符） */
function generateState(lenBytes = 32) {
  // 验证长度有效性
  if (lenBytes < 1) throw new Error('lenBytes must be at least 1')

  const bytes = new Uint8Array(lenBytes)
  window.crypto.getRandomValues(bytes) // 使用密码学安全随机数
  return base64URLEncode(bytes)
}

/** 生成 code_verifier（43-128 字符，默认 43） */
function generateCodeVerifier(lenBytes = 32) {
  // 根据 RFC 7636 验证字节长度范围
  if (lenBytes < 32 || lenBytes > 96) {
    throw new Error('lenBytes must be between 32 and 96 (inclusive)')
  }

  const bytes = new Uint8Array(lenBytes)
  window.crypto.getRandomValues(bytes)
  return base64URLEncode(bytes)
}

/** 生成 code_challenge (S256) */
async function generateCodeChallenge(verifier: string) {
  // 验证输入长度符合 PKCE 规范
  if (verifier.length < 43 || verifier.length > 128) {
    throw new Error('Verifier must be 43-128 characters')
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(verifier) // UTF-8 编码
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return base64URLEncode(new Uint8Array(digest)) // 哈希后Base64URL编码
}

// ---------- 主 Hook ----------
export const useOAuthLogin = () => {
  // 跳转授权页
  const oauthLoginTo = async () => {
    const VITE_OAUTH_CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID
    const VITE_OAUTH_REDIRECT_URI = import.meta.env.VITE_OAUTH_REDIRECT_URI

    if (!VITE_OAUTH_CLIENT_ID) {
      console.log('oauthLoginTo: 缺少 VITE_OAUTH_CLIENT_ID')
      return
    }
    if (!VITE_OAUTH_REDIRECT_URI) {
      console.log('oauthLoginTo: 缺少 VITE_OAUTH_REDIRECT_URI')
      return
    }

    try {
      const state = generateState()
      const codeVerifier = generateCodeVerifier()
      const codeChallenge = await generateCodeChallenge(codeVerifier)

      // 存储到 sessionStorage（兼容隐私模式）
      try {
        sessionStorage.setItem('oauth_state', state)
        sessionStorage.setItem('oauth_code_verifier', codeVerifier)
      } catch {
        alert('浏览器隐私模式可能导致登录异常，请关闭隐私模式后重试。')
        return
      }

      // 构造 URL（使用 URLSearchParams 防止编码问题）
      const url = new URL('https://api.account.isdream.cn/oidc/auth')
      Object.entries({
        client_id: VITE_OAUTH_CLIENT_ID,
        redirect_uri: VITE_OAUTH_REDIRECT_URI,
        scope: 'openid profile',
        response_type: 'code',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        state,
        prompt: 'consent'
      }).forEach(([k, v]) => url.searchParams.set(k, v))

      location.href = url.toString()
    } catch (err) {
      console.error('跳转授权页失败：', err)
      alert('跳转失败，请稍后重试')
    }
  }

  // 处理回调：校验参数 + 换 token
  const oauthLoginVerify = () => {
    return new Promise<{
      code: string
      code_verifier: string
    }>((resolve, reject) => {
      const params = new URLSearchParams(location.search)
      const code = params.get('code')
      const state = params.get('state')

      const storedState = sessionStorage.getItem('oauth_state')
      const codeVerifier = sessionStorage.getItem('oauth_code_verifier')

      // 清理 sessionStorage
      sessionStorage.removeItem('oauth_state')
      sessionStorage.removeItem('oauth_code_verifier')

      // 基础校验
      if (!code) return reject('授权失败：缺少 code')
      if (!codeVerifier) return reject('本地数据丢失，请重新登录')
      if (!storedState || state !== storedState)
        return reject('state 校验失败，疑似 CSRF')

      resolve({
        code: code,
        code_verifier: codeVerifier
      })
    })
  }

  // 处理回调：换 token
  const oauthLoginCallback = () => {
    oauthLoginVerify()
      .then((res) => {
        useUserStore().oauthLogin(res)
      })
      .catch((err) => {
        console.log('登录失败')
        console.log(err)
      })
  }

  return { oauthLoginTo, oauthLoginCallback }
}

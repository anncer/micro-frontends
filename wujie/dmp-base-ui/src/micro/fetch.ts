// 携带登录态credentials必须为include
export default function fetch(url: string, options:any) {
  return window.fetch(url, { ...options, credentials: "omit" });
}

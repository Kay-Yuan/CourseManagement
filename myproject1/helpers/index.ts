import cookie from "cookie"

export function parseCookies(req: any): { [key: string]: string } {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}
import { setck } from '../cookies/funcs';

export function setLangLocal(lang) {
  localStorage.setItem('lang', lang);
}

export function setLangCookie(lang) {
  setck('lang', lang);
}

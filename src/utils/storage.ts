import { profile } from "@/types/uset";
const KEY = 'rabbit-profile-92'
export function setProfile(profile: profile): void {
  localStorage.setItem(KEY, JSON.stringify(profile))
}
export function getProfile(): void {
  return JSON.parse(localStorage.getItem(KEY) || '{}')
}
export function removeProfile(): void {
  localStorage.removeItem(KEY)
}
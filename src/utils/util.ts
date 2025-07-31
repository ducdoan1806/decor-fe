import { decode } from "html-entities";
export const formatPhoneVN = (phone: string) => {
  let n = phone.replace(/\D/g, "");
  if (n.startsWith("84")) n = "0" + n.slice(2);
  if (n.length === 10) return n.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  return phone;
};
// Hàm tiện ích để loại bỏ HTML tags
export function stripHtml(html: string) {
  return decode(html.replace(/<[^>]*>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

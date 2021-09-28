export default function convertDateTime2Date(dt) {
  return String(dt).substring(0, 10).replaceAll('-', '.');
}

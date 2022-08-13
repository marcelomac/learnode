export default function fakename(prefix?: String, sufix?: String) {
  return `${prefix} ${Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 8)} ${sufix}`;
}

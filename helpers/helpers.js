export const toTitleCase = (string) => {
  return string
    ?.split("")
    ?.map((str, key) => (key === 0 ? str.toUpperCase() : str))
    ?.join("");
};

export const kebabToCapitalize = (string) => {
  return string
    ?.split("-")
    ?.map((word) =>
      word
        ?.split("")
        ?.map((str, key) => (key === 0 ? str.toUpperCase() : str))
        ?.join("")
    )
    ?.join(" ");
};

export const idConverter = (id) => {
  if (id < 10) {
    return `#00${id}`
  } else if (id < 100) {
    return `#0${id}`
  } else {
    return `#${id}`
  }
}
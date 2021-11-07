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
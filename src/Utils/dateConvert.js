export const dateConvert = value => {
    return new Date(value.replace(",", "")).toLocaleDateString();
}
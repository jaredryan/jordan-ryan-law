export const transformTextToUrlParams = (text: string) => text.toLowerCase().split(' ').join('-').replace(/,/g, "");

import Cookies from "js-cookie";
export const setCookies = (cookieObj) => {
  Cookies.set(
    `${Object.keys(cookieObj)?.[0]}`,
    JSON.stringify(Object.values(cookieObj)?.[0])
  );
};
export const getCookies = (keyName) => {
  var cookiesInfo = Cookies.get(keyName.toString());
  if (cookiesInfo) {
    const cookiesInfoParse = JSON.parse(cookiesInfo);
    return cookiesInfoParse;
  }
};

export const removeCookies = (keyName) => {
    var cookiesInfo = Cookies.remove(keyName.toString());
    // console.log('cookiesInfo', cookiesInfo)
  };
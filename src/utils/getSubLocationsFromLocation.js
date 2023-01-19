export const getSubLocationsFromLocation = (keys, str = "") => {
  let result = {};
  keys.forEach((key) => {
    if (str.indexOf(key) == -1) {
      result[key] = null;
    } else {
      let sliced = str.substring(str.indexOf(key) + key.length + 2);
      result[key] = sliced.substring(0, sliced.indexOf("<"));
    }
  });
  return result={...result, ["postal-code"]: result["postal-code"]==null? null:result["postal-code"].split("-")[0] };
};

import react, { useContext, useEffect } from "react";
import { SocialMediaAppContext } from "./Contexts";

function getLocalStorageData(key) {
  const localStorageValue = localStorage.getItem(key);

  if (localStorageValue === null || localStorageValue === "undefined") {
    return [];
  } else {
    const parsedValue = JSON.parse(localStorageValue);
    return parsedValue;
  }
}

function storeInLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export { getLocalStorageData, storeInLocalStorage };

//Check if item exist in local storage

//not overwrite if set to overwrite false
export const setLocalStorage = (storageKey, storageItem, override = true) => {
  if (!storageKey || !storageItem || storageItem.length === 0) {
    throw new Error("no data avail");
  }

  let items = JSON.parse(localStorage.getItem(storageKey));
  if (!items) {
    items = {};
  }

  const newItems = { ...items, ...storageItem };
  const keyExist = Object.keys(items).find(
    (i) => i === Object.keys(storageItem)[0]
  );

  if (!keyExist || (keyExist && override)) {
    localStorage.setItem(storageKey, JSON.stringify(newItems));
  }
  const updatedStorage = JSON.parse(localStorage.getItem(storageKey));
  return updatedStorage;
};

// for first load of application
export function initLocalStorage(langBase) {
  const items = JSON.parse(localStorage.getItem("language"));
  if (items) {
    return;
  }
  setLocalStorage("language", { dictionary: langBase }, true);
}

export const getTranslation = (name, category = "") => {
  try {
    const items = JSON.parse(localStorage.getItem("language"));
    let retTranslation = category
      ? items.dictionary[category][name]
      : items.dictionary[name];

    return retTranslation;
  } catch (error) {
    const msg = "You have been fired.";

    throw new Response(msg, { status: 500 });
  }
};

//Checks if current token is valid. Returns false if not valid and true if valid.
export const isTokenExpired = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const expireDate = new Date(token.expire);
  var currentDate = new Date();
  console.log(expireDate, currentDate, currentDate > expireDate);
  return currentDate > expireDate;
};

export const privateFetch = async (url, method, currentHeaders, body) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let newHeaders = { ...currentHeaders, authUid: token.token };
  const bodyString = JSON.stringify(body);
  let options = { method: method, headers: newHeaders };

  if (method !== "GET" && body) {
    options = { ...options, bodyString };
  }
  console.log(options);

  const response = await fetch(url, options);
  return response;
};

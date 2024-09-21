//Check if item exist in local storage
//not overwrite if set to overwrite false
export const setLocalStorage = (storageKey, storageItem, override = true) => {
  if (!storageKey || !storageItem || storageItem.length === 0) {
    throw new Error("no data avail");
  }

  const items = JSON.parse(localStorage.getItem(storageKey));
  const newItems = { ...items, ...storageItem };
  if (override) {
    localStorage.setItem(storageKey, JSON.stringify(newItems));
  }
  const updatedStorage = JSON.parse(localStorage.getItem(storageKey));
  return updatedStorage;
};

export const getTranslation = (name) => {
  const items = JSON.parse(localStorage.getItem("language"));
  const retTranslation = items.dictionary[name];

  return retTranslation;
};

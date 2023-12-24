import { blankTouch } from "../../../state/User";

export const recipeChange = (value, recipeList, setRecipeInfo) => {
  if (recipeList.findIndex(a => a === value) === -1) {
    setRecipeInfo({
      recipeName: value,
      recipeId: "",
      about: "",
      buildName: "Original",
      new: true
    });
  } else {
    setRecipeInfo({
      recipeName: value.recipeName,
      recipeId: value.recipeId,
      about: value.about,
      buildName: "",
      new: false
    });
  }
  return;
};

export const fieldChange = (field, value, x, setX) => {
  setX({
    ...x,
    [field]: value
  });
};

export const touchChange = (field, value, index, touches, setTouches) => {
  const newTouch = {
    ...touches[index],
    [field]: field === "amount" ? parseFloat(value) : value
  };

  touches.splice(index, 1, newTouch);
  setTouches([...touches]);
};

export const ingredientChange = (value, index, touches, setTouches) => {
  console.log(value);
  const newTouch = {
    ...touches[index],
    ingredient: value
  };
  const newTouches = touches;
  newTouches.splice(index, 1, newTouch);
  console.log(newTouches);
  setTouches([...newTouches]);
};

export const removeTouch = (index, touches, setTouches) => {
  touches.splice(index, 1);
  console.log(touches);
  setTouches([...touches]);
};

export const addTouch = (touches, setTouches) => {
  const rec = [...touches, blankTouch(touches.length)];
  setTouches(rec);
};

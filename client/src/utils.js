export function restructure(accumulator, currentValue) {
  const index = accumulator.findIndex(
    i => i.recipeId === currentValue.recipe.id
  );
  if (index === -1) {
    accumulator.push({
      recipeId: currentValue.recipe.id,
      recipeName: currentValue.recipe.name,
      about: currentValue.recipe.about,
      builds: [currentValue]
    });
  } else {
    accumulator[index].builds.push(currentValue);
  }
  return accumulator;
}

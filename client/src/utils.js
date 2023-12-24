export function restructure(accumulator, currentvalue) {
  const index = accumulator.findIndex(
    i => i.recipeId === currentvalue.recipeId
  );
  if (index === -1) {
    accumulator.push({
      recipeId: currentvalue.recipeId,
      recipeName: currentvalue.recipeName,
      about: currentvalue.about,
      builds: [currentvalue]
    });
  } else {
    accumulator[index].builds.push(currentvalue);
  }
  return accumulator;
}

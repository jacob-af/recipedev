export function restructure(accumulator, currentvalue) {
  const index = accumulator.findIndex(
    i => i.recipeId === currentvalue.recipeId
  );
  if (index === -1) {
    //console.log(currentvalue, "beep");
    accumulator.push({
      recipeId: currentvalue.recipeId,
      recipeName: currentvalue.recipeName,
      history: currentvalue.recipeHistory,
      builds: [currentvalue]
    });
  } else {
    accumulator[index].builds.push(currentvalue);
  }
  return accumulator;
}

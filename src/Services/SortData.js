export const SortData = (data) => {
  return data.sort((a, b) => {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });
};

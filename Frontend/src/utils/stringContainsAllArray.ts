const stringContainsAllArray = (
  title: string,
  searchQueryTerms: string[],
): boolean => {
  const lowerTitle = title.toLowerCase();
  for (let i = 0; i < searchQueryTerms.length; i++) {
    if (!lowerTitle.includes(searchQueryTerms[i])) {
      return false;
    }
  }
  return true;
  //return searchQueryTerms.every((term) => lowerTitle.includes(term))
};

export default stringContainsAllArray;

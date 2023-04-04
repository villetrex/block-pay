export const getPathLocales = () => {
  return ['en-ng', 'en-za'].map(locale => ({
    params: {
      locale,
    },
  }));
};

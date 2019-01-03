export default () => {
  const users = '/users';
  return {
    url: () => users,
    profile: (userId = ':userId') => {
      const profile = `${users}/${userId}`;
      return {
        url: () => profile,
      };
    },
  };
};

export default () => {
  const pools = '/pools';
  return {
    url: () => pools,
    new: () => `${pools}/new`,
    party: (partyId = ':partyId') => {
      const party = `${pools}/${partyId}`;
      return {
        url: () => party,
        entries: () => {
          const entries = `${party}/entries`;
          return {
            url: () => entries,
            entry: (entryId = ':entryId') => `${entries}/${entryId}`,
          };
        },
        standings: () => {
          const standings = `${party}/standings`;
          return {
            url: () => standings,
          };
        },
      };
    },
  };
};

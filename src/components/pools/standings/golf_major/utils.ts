export const calculateWinnings = (winnings: number, shares: number) => {
  const effWinnings = (winnings / (shares || 1)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `$${effWinnings}${shares > 1 ? ` (${shares} shares)` : ''}`;
};

export const parseRank = (rank: string): number =>
  rank.indexOf('T') < 0 ? parseInt(rank) : parseInt(rank.substring(1));

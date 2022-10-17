type IMatch = {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: number,
};

type IGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export {
  IMatch,
  IGoals,
};

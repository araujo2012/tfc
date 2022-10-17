import teamModel from '../database/models/Team';
import matchModel from '../database/models/Match';
import ILeaderboard from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/match';
import ITeam from '../interfaces/ITeam';

const startResult = () => {
  const result = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };
  return result;
};

const resolveHomeMatches = (emptyResult: ILeaderboard, teamMatches: Array<IMatch>) => {
  const result = emptyResult;
  teamMatches.forEach((match) => {
    result.totalGames += 1;
    result.goalsFavor += match.homeTeamGoals;
    result.goalsOwn += match.awayTeamGoals;
    if (match.homeTeamGoals > match.awayTeamGoals) result.totalVictories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) result.totalDraws += 1;
    if (match.homeTeamGoals < match.awayTeamGoals) result.totalLosses += 1;
  });
  result.totalPoints = 3 * result.totalVictories + result.totalDraws;
  result.goalsBalance = result.goalsFavor - result.goalsOwn;
  result.efficiency = String((100 * result.totalPoints) / (3 * result.totalGames));
  return result;
};

const resolveAwayMatches = (emptyResult: ILeaderboard, teamMatches: Array<IMatch>) => {
  const result = emptyResult;
  teamMatches.forEach((match) => {
    result.totalGames += 1;
    result.goalsFavor += match.awayTeamGoals;
    result.goalsOwn += match.homeTeamGoals;
    if (match.homeTeamGoals < match.awayTeamGoals) result.totalVictories += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) result.totalDraws += 1;
    if (match.homeTeamGoals > match.awayTeamGoals) result.totalLosses += 1;
  });
  result.totalPoints = 3 * result.totalVictories + result.totalDraws;
  result.goalsBalance = result.goalsFavor - result.goalsOwn;
  result.efficiency = String((100 * result.totalPoints) / (3 * result.totalGames));
  return result;
};

const createAwayLeaderboard = (teams: Array<ITeam>, matches: Array<IMatch>) => teams.map((team) => {
  const teamMatches = matches
    .filter((match) => match.awayTeam === team.id)
    .filter((match) => match.inProgress === 0);
  const result = startResult();
  result.name = team.teamName;
  return resolveAwayMatches(result, teamMatches);
});

const createHomeLeaderboard = (teams: Array<ITeam>, matches: Array<IMatch>) => teams.map((team) => {
  const teamMatches = matches
    .filter((match) => match.homeTeam === team.id)
    .filter((match) => match.inProgress === 0);
  const result = startResult();
  result.name = team.teamName;
  return resolveHomeMatches(result, teamMatches);
});

const addLeaderboards = (away: Array<ILeaderboard>, home: Array<ILeaderboard>) => {
  const leaderboard = away.map((_awayTeam, index) => {
    const result = {
      name: away[index].name,
      totalPoints: away[index].totalPoints + home[index].totalPoints,
      totalGames: away[index].totalGames + home[index].totalGames,
      totalVictories: away[index].totalVictories + home[index].totalVictories,
      totalDraws: away[index].totalDraws + home[index].totalDraws,
      totalLosses: away[index].totalLosses + home[index].totalLosses,
      goalsFavor: away[index].goalsFavor + home[index].goalsFavor,
      goalsOwn: away[index].goalsOwn + home[index].goalsOwn,
      goalsBalance: away[index].goalsBalance + home[index].goalsBalance,
      efficiency: String((100 * (away[index].totalPoints + home[index].totalPoints))
       / (3 * (away[index].totalGames + home[index].totalGames))),
    };
    return result;
  });
  return leaderboard;
};

const sortLeaderboard = (leaderboard: Array<ILeaderboard>) => leaderboard.sort((a, b) => {
  if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
  if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
  if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
  return 0;
});

class userService {
  constructor(private TeamModel: typeof teamModel, private MatchModel: typeof matchModel) {}

  async leaderboardHome() {
    const matches = await this.MatchModel.findAll();
    const teams = await this.TeamModel.findAll();
    const homeLeaderboard = createHomeLeaderboard(teams, matches);
    return sortLeaderboard(homeLeaderboard);
  }

  async leaderboardAway() {
    const matches = await this.MatchModel.findAll();
    const teams = await this.TeamModel.findAll();
    const awayLeaderboard = createAwayLeaderboard(teams, matches);
    return sortLeaderboard(awayLeaderboard);
  }

  async leaderboard() {
    const matches = await this.MatchModel.findAll();
    const teams = await this.TeamModel.findAll();
    const awayLeaderboard = createAwayLeaderboard(teams, matches);
    const homeLeaderboard = createHomeLeaderboard(teams, matches);
    const leaderboard = addLeaderboards(awayLeaderboard, homeLeaderboard);
    return sortLeaderboard(leaderboard);
  }
}

export default userService;

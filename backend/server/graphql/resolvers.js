const axios = require('axios');
const { GraphQLJSON } = require('graphql-scalars');
const {
  PORT_JSON_SERVER,
  URL_BASE_DEV
} = require('./../../../config');
const serverMode = 'json'; // json | something else, eventually
const graphQLRequestRoot = () => {
  let url = '';
  if (serverMode === 'json') {
    url = `${URL_BASE_DEV}:${PORT_JSON_SERVER}/commits/`;
  }
  return url;
};
// Import helpers
const { statsAuthors } = require('./../../helpers/statsAuthors');
const { statsGlobal } = require('./../../helpers/statsGlobal');
const { statsRepos } = require('./../../helpers/statsRepos');

const Query = {
  // ('res.data' because 'axios' returns a 'data' array)
  // all commits
  commits: () => axios.get(`${graphQLRequestRoot()}`).then(res => res.data),
  // commits by
  commitsByRepository: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.repository === args.repository)
  ),
  commitsByCommitNr: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.commit_nr === args.commit_nr)
  ),
  commitsByCommitHash: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.commit_hash === args.commit_hash)
  ),
  commitsByAuthorName: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.author_name === args.author_name)
  ),
  commitsByAuthorEmail: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.author_email === args.author_email)
  ),
  commitsByAuthorDate: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.author_date === args.author_date)
  ),
  commitsByAuthorDateRelative: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.author_date_relative === args.author_date_relative)
  ),
  commitsByAuthorDateUnixtimestamp: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.author_date_unix_timestamp === args.author_date_unix_timestamp)
  ),
  commitsByAuthorDateIso_8601: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.author_date_iso_8601 === args.author_date_iso_8601)
  ),
  commitsBySubject: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.subject === args.subject)
  ),
  commitsBySubjectSanitized: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.subject_sanitized === args.subject_sanitized)
  ),
  commitsByStats: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.stats === args.stats)
  ),
  commitsByTimeHour: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.time_hour === args.time_hour)
  ),
  commitsByTimeMinutes: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.time_minutes === args.time_minutes)
  ),
  commitsByTimeSeconds: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.time_seconds === args.time_seconds)
  ),
  commitsByTimeGmt: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.time_gmt === args.time_gmt)
  ),
  commitsByDateDayweek: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.date_day_week === args.date_day_week)
  ),
  commitsByDateMonthDay: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.date_month_day === args.date_month_day)
  ),
  commitsByDateMonthName: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.date_month_name === args.date_month_name)
  ),
  commitsByDateMonthNumber: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.date_month_number === args.date_month_number)
  ),
  commitsByDateYear: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.date_year === args.date_year)
  ),
  commitsByDateIso8601: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.date_iso_8601 === args.date_iso_8601)
  ),
  commitsByFilesChanged: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.files_changed === args.files_changed)
  ),
  commitsByInsertions: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.insertions === args.insertions)
  ),
  commitsByDeletions: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.deletions === args.deletions)
  ),
  commitsByImpact: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => res.data.filter(f => f.impact === args.impact)
  ),
  // stats
  statsAuthors: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => statsAuthors({ data: res.data, sortBy: args.sortBy, sortDirection: args.sortDirection, count: args.count })
  ),
  statsGlobal: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => statsGlobal({ data: res.data })
  ),
  statsRepos: (parentValue, args) => axios.get(`${graphQLRequestRoot()}`).then(
    res => statsRepos({ data: res.data, sortBy: args.sortBy, sortDirection: args.sortDirection, count: args.count })
  ),
};

const JSON = GraphQLJSON;

module.exports = { Query, JSON };

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import {
  statsReposQueryStaleness,
  statsReposQueryTop30,
  statsGlobalQuery,
} from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import {
  Calendar,
  ChevronRight,
  Code,
  Flag,
  Folder,
  TrendingUp,
  UserGroup,
} from './../primitives/Icon';
import Card from '../primitives/Card/Card';
import Heat from '../primitives/Heat/Heat';
import { isNotEmptyArray } from '../../utils/isEmptyUtil';
import { getAvatarFromEmail } from '../../utils/getAvatarFromEmailUtil';
import { getDate } from '../../utils/getDateUtil';
import { getNameFromEmail } from '../../utils/getNameFromEmailUtil';
import { stalenessStatus } from '../../utils/stalenessStatusUtil';
import { thousandify } from '../../utils/thousandifyUtil';

const DatesFromUntil = ({ from, until }) => (
  <>
    {from && until ? (
      <div>
        <span>{getDate(from)}</span> - <span>{getDate(until)}</span>
      </div>
    ) : null}
  </>
);

const renderRepositories = ({ statsRepos }) => {
  const output = [];
  if (statsRepos && isNotEmptyArray(statsRepos)) {
    statsRepos.map(sa => {
      const {
        repository,
        commitDateLast: commitDateLastRepo,
        commits: commitsRepo,
        daysActive,
        // daysSinceLastCommit,
        // impact,
        impactRatio,
        contributors: contributorsRepo,
        staleness,
      } = sa;
      output.push(
        <li key={uuidv4()}>
          <a href="#" className="block hover:bg-gray-50">
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 flex items-center">
                <span className="inline-block relative">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={getAvatarFromEmail(repository)}
                    alt={getNameFromEmail(repository)}
                  />
                  <span
                    className={classnames(
                      'absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white',
                      staleness ? stalenessStatus(staleness, 'color') : '',
                    )}
                  />
                </span>
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {getNameFromEmail(repository)}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <Folder className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span className="truncate">{repository.replace(/.git/g, '')}</span>
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="text-gray-400">Last commit: </span>
                        <time dateTime="2020-01-07">{getDate(commitDateLastRepo)}</time>
                      </p>
                      {/* <p className="mt-2 flex items-center text-sm text-gray-500">
                        <CheckCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                        Completed phone screening
                      </p> */}
                      <div className="min-w-0 flex-1 md:grid md:grid-cols-3 xl:grid-cols-5 md:gap-4 flex items-center text-sm text-gray-500 mt-2">
                        <div className="flex items-center">
                          <Code className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-green-dark" />
                          <span className="mr-3">{thousandify(commitsRepo)}</span>
                        </div>
                        <div className="flex items-center">
                          <UserGroup className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-orange-dark" />
                          <span className="mr-3">{thousandify(contributorsRepo)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-green-light" />
                          <span className="mr-3">{thousandify((daysActive / 365).toFixed(1))}</span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-turquoise" />
                          <span className="mr-3">{thousandify(impactRatio.toFixed(0))}</span>
                        </div>
                        <div className="flex items-center">
                          <Flag className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-pink-shock" />
                          <span className="mr-3">{staleness.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </a>
        </li>,
      );
      return null;
    });
  }
  return output;
};

const Repositories = ({ statsRepos }) => (
  <>
    {statsRepos && isNotEmptyArray(statsRepos) ? (
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
        <ul className="divide-y divide-gray-200">{renderRepositories({ statsRepos })}</ul>
      </div>
    ) : null}
  </>
);

const PageRepositories = () => {
  const {
    data: {
      statsGlobal,
      statsGlobal: {
        commitDateFirst,
        commitDateLast,
        commits,
        contributors,
        // contributorsList, // array list
        repositories,
      } = {},
    } = {},
  } = useQuery(statsGlobalQuery);
  const { data: { statsRepos } = {} } = useQuery(statsReposQueryTop30);
  const { data: { statsRepos: statsReposStaleness } = {} } = useQuery(statsReposQueryStaleness);
  return (
    <Wrapper pageType="repositories">
      {statsGlobal && (
        <>
          <dl className="flex items-baseline md:flex-col lg:flex-row lg:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Repositories</h1>
            <DatesFromUntil from={commitDateFirst} until={commitDateLast} />
          </dl>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card type="repositories" heading="Repositories" stat={thousandify(repositories)} />
            <Card type="contributors" heading="Contributors" stat={thousandify(contributors)} />
            <Card type="code" heading="Commits" stat={thousandify(commits)} />
          </dl>
          <Heat statuses={statsReposStaleness} />
          <Repositories statsRepos={statsRepos} />
        </>
      )}
    </Wrapper>
  );
};
export default PageRepositories;

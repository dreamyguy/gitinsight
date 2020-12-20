/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@apollo/react-hooks';
import { statsAuthorsQueryTop30, statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import { ChevronRight, Code, Flag, Folder, Mail } from './../primitives/Icon';
import Card from '../primitives/Card/Card';
import { isNotEmptyArray } from '../../utils/isEmptyUtil';
import { getDate } from '../../utils/getDateUtil';
import { getNameFromEmail } from '../../utils/getNameFromEmailUtil';
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

const renderContributors = ({ statsAuthors }) => {
  const output = [];
  if (statsAuthors && isNotEmptyArray(statsAuthors)) {
    statsAuthors.map(sa => {
      const {
        author,
        commitDateLast: commitDateLastAuthor,
        commits: commitsAuthor,
        // daysActive,
        // daysSinceLastCommit,
        // impact,
        // impactRatio,
        repositories: repositoriesAuthor,
        staleness,
      } = sa;
      output.push(
        <li key={uuidv4()}>
          <a href="#" className="block hover:bg-gray-50">
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="min-w-0 flex-1 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {getNameFromEmail(author)}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span className="truncate">{author}</span>
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="text-gray-400">Last commit: </span>
                        <time dateTime="2020-01-07">{getDate(commitDateLastAuthor)}</time>
                      </p>
                      {/* <p className="mt-2 flex items-center text-sm text-gray-500">
                        <CheckCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                        Completed phone screening
                      </p> */}
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <Code className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-green-dark" />
                        <span className="mr-3">{commitsAuthor}</span>
                        <Folder className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-purple-middle" />
                        <span className="mr-3">{repositoriesAuthor}</span>
                        <Flag className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-pink-shock" />
                        {staleness.toFixed(2)}
                      </p>
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

const Contributors = ({ statsAuthors }) => (
  <>
    {statsAuthors && isNotEmptyArray(statsAuthors) ? (
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
        <ul className="divide-y divide-gray-200">{renderContributors({ statsAuthors })}</ul>
      </div>
    ) : null}
  </>
);

const PageContributors = () => {
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
  const { data: { statsAuthors } = {} } = useQuery(statsAuthorsQueryTop30);
  return (
    <Wrapper pageType="contributors">
      {statsGlobal && (
        <>
          <dl className="flex items-baseline md:flex-col lg:flex-row lg:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Contributors</h1>
            <DatesFromUntil from={commitDateFirst} until={commitDateLast} />
          </dl>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card type="contributors" heading="Contributors" stat={thousandify(contributors)} />
            <Card type="repositories" heading="Repositories" stat={thousandify(repositories)} />
            <Card type="code" heading="Commits" stat={thousandify(commits)} />
          </dl>
          <Contributors statsAuthors={statsAuthors} />
        </>
      )}
    </Wrapper>
  );
};
export default PageContributors;

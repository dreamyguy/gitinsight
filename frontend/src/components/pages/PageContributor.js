/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import { statsAuthorQuery, statsGlobalQuery } from '../../graphql/queries';
import Wrapper from '../layout/Wrapper';
import PageTitleWithDate from '../content/PageTitleWithDate';
import { Calendar, Code, Flag, Folder, Mail, TrendingUp } from './../primitives/Icon';
import { isNotEmptyArray } from '../../utils/isEmptyUtil';
import { getAvatarFromEmail } from '../../utils/getAvatarFromEmailUtil';
import { getDate } from '../../utils/getDateUtil';
import { getNameFromEmail } from '../../utils/getNameFromEmailUtil';
import { stalenessStatus } from '../../utils/stalenessStatusUtil';
import { thousandify } from '../../utils/thousandifyUtil';

const renderContributor = ({ statsAuthor }) => {
  const output = [];
  if (statsAuthor && isNotEmptyArray(statsAuthor)) {
    statsAuthor.map(sa => {
      const {
        author,
        commitDateLast: commitDateLastAuthor,
        commits: commitsAuthor,
        daysActive,
        impactRatio,
        repositories: repositoriesAuthor,
        staleness,
      } = sa;
      output.push(
        <li key={uuidv4()}>
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
              <span className="inline-block relative">
                <img
                  className="h-12 w-12 rounded-full"
                  src={getAvatarFromEmail(author)}
                  alt={getNameFromEmail(author)}
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
                    <div className="min-w-0 flex-1 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-2 lg:gap-4 flex items-center text-sm text-gray-500 mt-2">
                      <div className="flex items-center">
                        <Code className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-green-dark" />
                        <span className="mr-3">{thousandify(commitsAuthor)}</span>
                      </div>
                      <div className="flex items-center">
                        <Folder className="flex-shrink-0 mr-1.5 h-5 w-5 text-fav-purple-middle" />
                        <span className="mr-3">{thousandify(repositoriesAuthor)}</span>
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
          </div>
        </li>,
      );
      return null;
    });
  }
  return output;
};

const Contributor = ({ statsAuthor }) => (
  <>
    {statsAuthor && isNotEmptyArray(statsAuthor) ? (
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
        <ul className="divide-y divide-gray-200">{renderContributor({ statsAuthor })}</ul>
      </div>
    ) : null}
  </>
);

const PageContributor = () => {
  const { paramAuthorEmail } = useParams();
  const {
    data: { statsGlobal, statsGlobal: { commitDateFirst, commitDateLast } = {} } = {},
  } = useQuery(statsGlobalQuery);
  const { data: { statsAuthor } = {} } = useQuery(statsAuthorQuery, {
    variables: { authorEmail: paramAuthorEmail },
  });
  return (
    <Wrapper pageType="contributor">
      {statsGlobal && (
        <>
          <PageTitleWithDate title="Contributor" from={commitDateFirst} until={commitDateLast} />
          <Contributor statsAuthor={statsAuthor} />
        </>
      )}
    </Wrapper>
  );
};
export default PageContributor;

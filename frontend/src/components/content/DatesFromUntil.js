import React from 'react';
import { getDate } from '../../utils/getDateUtil';

const DatesFromUntil = ({ from, until }) => (
  <>
    {from && until ? (
      <>
        <div className="flex md:hidden">
          <span className="mr-2">{getDate(from, 'compact')}</span>&mdash;
          <span className="ml-2">{getDate(until, 'compact')}</span>
        </div>
        <div className="hidden md:flex">
          <span className="mr-2">{getDate(from)}</span>&mdash;
          <span className="ml-2">{getDate(until)}</span>
        </div>
      </>
    ) : null}
  </>
);

export default DatesFromUntil;

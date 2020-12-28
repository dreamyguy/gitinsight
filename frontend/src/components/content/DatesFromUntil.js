import React from 'react';
import { getDate } from '../../utils/getDateUtil';

const DatesFromUntil = ({ from, until }) => (
  <>
    {from && until ? (
      <div>
        <span>{getDate(from)}</span> - <span>{getDate(until)}</span>
      </div>
    ) : null}
  </>
);

export default DatesFromUntil;

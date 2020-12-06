import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { ErrorContext } from '../../../contexts';
import { isNotEmptyArray } from '../../../utils/isEmptyUtil';

const Errors = ({ inlineErrors }) => {
  const { errors } = useContext(ErrorContext);
  const [localErrors, setLocalErrors] = useState([]);

  useEffect(() => {
    if (errors) {
      setLocalErrors(errors);
    } else if (inlineErrors) {
      setLocalErrors(inlineErrors);
    }
  }, [errors, inlineErrors]);

  let errorHeading = '';
  if (localErrors && isNotEmptyArray(localErrors)) {
    errorHeading = `Error${localErrors.length > 1 ? 's' : ''}!`;
    const errorPluralization = `${localErrors.length > 1 ? 'some errors' : 'an error'}`;
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-grey-aa">{errorHeading}</h3>
            <p className="text-md text-grey-dark">
              We have recorded {errorPluralization} in our logs.
            </p>
          </div>
          <div className="border-t border-grey-light px-4 py-5 sm:px-6">
            {localErrors.map(errorItem => {
              // Send errors to 'Sentry' or similar service(s) before the return below
              if (errorItem?.error?.err) {
                // Sentry.something(errorItem.error.err)
              }
              return (
                <div key={uuidv4()}>
                  {errorItem?.error?.err?.message && (
                    <>
                      <p key={uuidv4()} className="mt-1 max-w-2xl text-grey-aa">
                        {errorItem.error.err.message}
                      </p>
                      {errorItem.error.explanation && (
                        <p key={uuidv4()} className="mt-1 max-w-2xl italic text-grey-dark">
                          {errorItem.error.explanation}
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-grey-aa">Error</h3>
          <p className="text-md text-grey-dark">We have recorded an error in our logs.</p>
        </div>
        <div className="border-t border-grey-light px-4 py-5 sm:px-6">
          <p className="mt-1 max-w-2xl text-grey-aa">We did not catch a specific error.</p>
          <p className="mt-1 max-w-2xl italic text-grey-dark">
            &lsquo;localErrors&rsquo; (array) is empty.
          </p>
        </div>
      </div>
    </div>
  );
};

Errors.propTypes = {
  inlineErrors: PropTypes.array,
};

export default Errors;

import { useEffect, useRef } from 'react';
import clp from 'console-log-plus';

// See: https://usehooks.com/useWhyDidYouUpdate/

export default function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props
  //  for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        clp({
          type: 'default',
          prefix: `why-did-you-update - ${name}`,
          message: `${JSON.stringify(changesObj)}`,
        });
        console.log('\n\n');
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}

import React from 'react';
import PropTypes from 'prop-types';
import MetronomeHit from './MetronomeHit';
import {reverse} from '../PureFunctions';

const MetronomeHitHistory = ({hits, frequency}) => {
  const hitList = reverse(hits).map((hit, index) =>
    <MetronomeHit
      key={hits.length - 1 - index}
      index={hits.length - 1 - index}
      missInMilliseconds={hit.miss}
      preliminarmiss={hit.preliminarmiss}
      missInFractions={hit.miss / frequency}
    />
  );

  return (
    <div className="history">
      {hitList}
    </div>
  );
};

MetronomeHitHistory.propTypes = {
  hits: PropTypes.array.isRequired,
  frequency: PropTypes.number.isRequired
};

export default MetronomeHitHistory;

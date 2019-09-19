import React, {Fragment} from 'react'
import spinner from '../../img/spinner.gif';

export default () => (
  <Fragment>
    <div className="spinner text-center">
      <img
        className="spinner-img"
        src={spinner}
        style={{ width: '220px'}}
        alt="spinner"
      />
    </div>
  </Fragment>
);
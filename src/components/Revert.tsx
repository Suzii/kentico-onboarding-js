import * as React from 'react';

export interface IRevertCallbackProps {
  readonly revertAction: () => void;
}

export const Revert: React.SFC<IRevertCallbackProps> = ({ revertAction }) =>
  <button
    className="btn btn-danger"
    onClick={revertAction}
  >
    Revert
  </button>;

import React from 'react';

interface Props {
  onClickMore: () => void
}

export function More(props: Props) {
  const handleMoreClick = () => props.onClickMore();
  return (
    <div className='row'>
      <div className='col-sm-12'>
        <div className='button-group fluid'>
          <button className='button default' onClick={handleMoreClick}>
            More...
          </button>
        </div>
      </div>
    </div>
  );
}
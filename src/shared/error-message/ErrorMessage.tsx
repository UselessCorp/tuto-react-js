import React from 'react';

interface Props {
  errorMessage?: string
}

export function ErrorMessage(props: Props) {
  return (
    <div className='row'>
      <div className='card large error'>
        <section>
          <p>
            <span className='icon-alert inverse '></span>
            {props.errorMessage}
          </p>
        </section>
      </div>
    </div>
  );
}

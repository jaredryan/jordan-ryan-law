'use client';

import { useActionState, useState } from 'react';
import { sendContactUsEmail, State } from '@/app/lib/utils';
import '@/app/ui/contact-us-form.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SubmitButton({ pending, message, resetMessage, ignoreMessage }: {
  pending: boolean,
  message: string | null | undefined,
  resetMessage: () => void,
  ignoreMessage: boolean,
}) {
  if (pending) {
    return (
      <button type="submit" disabled aria-disabled className="pending">
        <FontAwesomeIcon icon={faSpinner} spin pulse />
      </button>
    )
  } else if (message === 'success' && !ignoreMessage) {
    setTimeout(resetMessage, 3000)
    return (
      <button type="submit" className="success" disabled aria-disabled>
        Success!
      </button>
    )
  } else if (message === 'failure' && !ignoreMessage) {
    setTimeout(resetMessage, 3000)
    return (
      <button type="submit" className="failure" disabled aria-disabled>
        Failure
      </button>
    )
  } else {
    return (
      <button type="submit">
        Submit
      </button>
    )
  }
}


export default function Form() {
  const [ignoreMessage, setIgnoreMessage] = useState(false)
  const initialState: State = { message: null, errors: {} };
  // @ts-ignore
  const [state, formAction, pending] = useActionState(sendContactUsEmail, initialState);
  const action = (...args: any) => {
    setIgnoreMessage(false)
    // @ts-ignore
    formAction(...args);
  }

  return (
    <form className="contactUsForm" action={action}>
      <div className="inputFields">
        <div className="input" key="name">
          <label htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
          />
          {/* @ts-ignore */}
          {state && state.errors?.name && state.errors.name[0] && !pending &&
            <div id="name-error" aria-live="polite" aria-atomic="true" className="inputError">
              <p>
                {/* @ts-ignore */}
                {state.errors.name[0]}
              </p>
            </div>
          }
        </div>
        <div className="input" key="phone">
          <label htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            // pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
          />
          {/* @ts-ignore */}
          {state && state.errors?.phone && state.errors.phone[0] && !pending &&
            <div id="phone-error" aria-live="polite" aria-atomic="true" className="inputError">
              <p>
                {/* @ts-ignore */}
                {state.errors.phone[0]}
              </p>
            </div>
          }
        </div>
        <div className="input" key="email">
          <label htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
          />
          {/* @ts-ignore */}
          {state && state.errors?.email && state.errors.email[0] && !pending &&
            <div id="email-error" aria-live="polite" aria-atomic="true" className="inputError">
              <p>
                {/* @ts-ignore */}
                {state.errors.email[0]}
              </p>
            </div>
          }
        </div>
        <div className="textareaInput" key="description">
          <label htmlFor="description">
            How can we help?
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
          />
          {/* @ts-ignore */}
          {state && state.errors?.description && state.errors.description[0] && !pending &&
            <div id="description-error" aria-live="polite" aria-atomic="true" className="inputError">
              <p>
                {/* @ts-ignore */}
                {state.errors.description[0]}
              </p>
            </div>
          }
        </div>
      </div>
      <div className="buttonContainer">
        <SubmitButton
          pending={pending}
          message={state.message}
          resetMessage={() => setIgnoreMessage(true)}
          ignoreMessage={ignoreMessage}
        />
        {/* @ts-ignore */}
        {state.message === 'failure' && <p className="formError">{state?.errors?.sendGrid}</p>}
      </div>
    </form>
  );
}

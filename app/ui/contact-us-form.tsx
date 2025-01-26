'use client';

import { useActionState, useState } from 'react';
import { sendContactUsEmail, State } from '@/app/lib/utils';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQueryState } from 'nuqs'

import '@/app/ui/contact-us-form.css';

function SubmitButton({ pending, message, ignoreMessage }: {
  pending: boolean,
  message: string | null | undefined,
  ignoreMessage: boolean,
}) {
  if (pending) {
    return (
      <button type="submit" disabled aria-disabled className="pending">
        <FontAwesomeIcon icon={faSpinner} spin pulse />
      </button>
    )
  } else if (message === 'success' && !ignoreMessage) {
    return (
      <button type="submit" className="success" disabled aria-disabled>
        Success!
      </button>
    )
  } else if (message === 'failure' && !ignoreMessage) {
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


export default function ContactUsForm() {
  const [hasbeenReset, setReset] = useState(false)
  const [name, setName] = useQueryState('name', { defaultValue: '' })
  const [phone, setPhone] = useQueryState('phone', { defaultValue: '' })
  const [email, setEmail] = useQueryState('email', { defaultValue: '' })
  const [description, setDescription] = useQueryState('description', { defaultValue: '' })

  const [ignoreMessage, setIgnoreMessage] = useState(false)
  const initialState: State = { message: null, errors: {} };
  // @ts-ignore
  const [state, formAction, pending] = useActionState(sendContactUsEmail, initialState);
  const action = async (...args: any) => {
    setReset(false)
    setIgnoreMessage(false)
    // @ts-ignore
    formAction(...args);
  }

  if (state?.message === 'success' && !hasbeenReset) {
    setReset(true)
    setTimeout(() => setIgnoreMessage(true), 3000)
    if (state && state.message == 'success') {
      Promise.all([
        setName(null),
        setPhone(null),
        setEmail(null),
        setDescription(null),
      ])
    }
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
            onChange={(e) => setName(e.target.value)}
            value={name || ''}
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
            onChange={(e) => setPhone(e.target.value)}
            value={phone || ''}
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
            onChange={(e) => setEmail(e.target.value)}
            value={email || ''}
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
            onChange={(e) => setDescription(e.target.value)}
            value={description || ''}
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
          ignoreMessage={ignoreMessage}
        />
        {/* @ts-ignore */}
        {state.message === 'failure' && <p className="formError">{state?.errors?.sendGrid}</p>}
      </div>
    </form>
  );
}

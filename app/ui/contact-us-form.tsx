'use client';

import { useActionState } from 'react';
import { useFormStatus } from "react-dom";
import { sendContactUsEmail, State } from '@/app/lib/utils';
import '@/app/ui/contact-us-form.css';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  // @ts-ignore
  const [state, formAction, pending] = useActionState(sendContactUsEmail, initialState);

  return (
    <form className="contactUsForm" action={formAction}>
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
      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? 'Please Wait' : 'Submit'}
      </button>
      {state.message === 'success' && <p>Success</p>}
      {state.message === 'failure' && <p>Failure</p>}
    </form>
  );
}

'use client';

import { useActionState } from 'react';
import { sendContactUsEmail, State } from '@/app/lib/utils';
import '@/app/ui/contact-us-form.css';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  // @ts-ignore
  const [state, formAction] = useActionState(sendContactUsEmail, initialState);

  console.log(state)

  return (
    <form className="contactUsForm" action={formAction}>
      <div className="inputFields">
        <div className="input">
          <label htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
          />
          {/* @ts-ignore */}
          {state && state.errors?.name && state.errors.name.map((error: string) => (
            <div id="name-error" aria-live="polite" aria-atomic="true">
              <p key={error}>
                {error}
              </p>
            </div>
          ))}
        </div>
        <div className="input">
          <label htmlFor="email">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            // pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
          />
          {/* @ts-ignore */}
          {state && state.errors?.phone && state.errors.phone.map((error: string) => (
            <div id="phone-error" aria-live="polite" aria-atomic="true">
              <p key={error}>
                {error}
              </p>
            </div>
          ))}
        </div>
        <div className="input">
          <label htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
          />
          {/* @ts-ignore */}
          {state && state.errors?.email && state.errors.email.map((error: string) => (
            <div id="email-error" aria-live="polite" aria-atomic="true">
              <p key={error}>
                {error}
              </p>
            </div>
          ))}
        </div>
        <div className="textareaInput">
          <label htmlFor="description">
            How can we help?
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
          />
          {/* @ts-ignore */}
          {state && state.errors?.description && state.errors.description.map((error: string) => (
            <div id="description-error" aria-live="polite" aria-atomic="true">
              <p key={error}>
                {error}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

import '@/app/ui/contact-us-form.css';

export default function Form() {
  return (
    <form className="contactUsForm">
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
        </div>
        <div className="input">
          <label htmlFor="email">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            pattern="[0-9]{3}[0-9]{4}[0-9]{4}"
          />
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
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

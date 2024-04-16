import * as React from "react";
import { type RouterInputs } from "~/utils/api";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);

type BookTutorTemplateProps = RouterInputs["email"]["bookTutor"];
export const BookTutorTemplate: React.FC<Readonly<BookTutorTemplateProps>> = ({
  name,
  subject,
  time,
  location,
  duration,
  message,
}) => (
  <div>
    <header>
      Hi {name},
      <br />
      Here&lsquo;s a new tutor assignment request just for you!
    </header>
    <main>
      <p>Subject: {subject}</p>
      <p>Time: {time}</p>
      <p>Location: {location}</p>
      <p>Duration: {duration}</p>
      <p>Message: {message}</p>
    </main>
    <footer>
      Please login to your account to accept or reject the request.
      <br />
      With you all the best!
      <br />
      Cheryl Ong
    </footer>
  </div>
);

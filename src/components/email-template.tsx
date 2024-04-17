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

type BookingTutorTemplateProps = RouterInputs["email"]["bookTutor"] & {
  to: "client" | "tutor";
};
export const BookingTutorTemplate: React.FC<
  Readonly<BookingTutorTemplateProps>
> = ({ to, name, clientName, subject, time, location, duration, message }) => {
  return (
    <div>
      <header>
        Hi {to === "tutor" ? name : clientName},
        <br />
        {to === "tutor" ? (
          <>Here&lsquo;s a new tutor assignment request just for you!</>
        ) : (
          <>Here&lsquo;s the assignment request we have sent to the tutor.</>
        )}
      </header>
      <main>
        <p>Subject: {subject}</p>
        <p>Time: {time}</p>
        <p>Location: {location}</p>
        <p>Duration: {duration}</p>
        <p>Message: {message}</p>
        {to === "tutor" ? (
          <>
            Please login to your account to accept or reject the request.
            <br />
            With you all the best!
          </>
        ) : (
          <>
            Please login to your account to view the request status.
            <br />
            With you all the best!
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

function Footer() {
  return (
    <footer>
      Cheryl
      <br />
      Delphis (www.delphis.com)
    </footer>
  );
}

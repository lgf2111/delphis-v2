import * as React from "react";
import { env } from "~/env";
import { type RouterInputs } from "~/utils/api";

const rootDomain =
  env.NODE_ENV === "production"
    ? "https://delphistech.com"
    : "http://localhost:3000";

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

type BookingTutorTemplateProps = RouterInputs["booking"]["bookTutor"] & {
  to: "client" | "tutor";
  name: string | null;
  subjectName: string;
  bookingId: string;
};
export const BookingTutorTemplate: React.FC<
  Readonly<BookingTutorTemplateProps>
> = ({
  to,
  name,
  subjectName,
  postalCode,
  timeOfDay,
  dayOfWeek,
  lessonCount,
  monthCount,
  message,
  bookingId,
}) => {
  return (
    <div>
      <header>
        Hi {name},
        <br />
        {to === "tutor" ? (
          <>Here&lsquo;s a new tutor assignment request just for you!</>
        ) : (
          <>Here&lsquo;s the assignment request we have sent to the tutor.</>
        )}
      </header>
      <main>
        <p>Subject: {subjectName}</p>
        <p>Postal Code: {postalCode}</p>
        <p>Time of Day: {timeOfDay}</p>
        <p>Day of Week: {dayOfWeek}</p>
        <p>Lesson: {lessonCount}/month</p>
        <p>Duration: {monthCount} months</p>
        <p>Message: {message}</p>
        {to === "tutor" ? (
          <div>
            Would you want to accept or reject this request?
            <div className="flex">
              <a href={`${rootDomain}/booking/${bookingId}/accept`}>Accept</a>
              {" - "}
              <a href={`${rootDomain}/booking/${bookingId}/reject`}>Reject</a>
            </div>
            <br />
            With you all the best!
          </div>
        ) : (
          <div>
            Please login to your account to view the request status.
            <br />
            With you all the best!
          </div>
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

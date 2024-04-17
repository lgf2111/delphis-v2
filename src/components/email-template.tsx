import { Booking } from "@prisma/client";
import * as React from "react";
import { env } from "~/env";
import { type RouterInputs } from "~/utils/api";
import { dayOfWeekMap, getKeyByValue, timeOfDayMap } from "~/utils/constants";

export const rootDomain =
  env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://delphistech.com";

function Footer() {
  return (
    <footer>
      Cheryl
      <br />
      Delphis (www.delphis.com)
    </footer>
  );
}

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
        <h1>Subject: {subjectName}</h1>
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
            Wish you all the best!
          </div>
        ) : (
          <div>
            Please login to your account to view the request status.
            <br />
            Wish you all the best!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

type BookingSuccessTemplateProps = {
  to: "client" | "tutor";
  name: string;
  tutorName?: string;
  bookingId: string;

  subjectName: string;
  postalCode: number;
  timeOfDay: number;
  dayOfWeek: number;
  lessonCount: number;
  monthCount: number;
  message: string;
};
export const BookingSuccessTemplate: React.FC<
  Readonly<BookingSuccessTemplateProps>
> = ({
  to,
  name,
  tutorName,
  bookingId,
  subjectName,
  postalCode,
  timeOfDay,
  dayOfWeek,
  lessonCount,
  monthCount,
  message,
}) => {
  return (
    <div>
      <header>
        Hi {name},
        <br />
        {to === "tutor" ? (
          <>Congrats! You had just accepted an assignment!</>
        ) : (
          <>Good news! Tutor {tutorName} has just accepted your booking!</>
        )}
      </header>
      <main>
        <h1>Booking Details (ID: {bookingId})</h1>
        <p>Subject: {subjectName}</p>
        <p>Postal Code: {postalCode}</p>
        <p>Time of Day: {getKeyByValue(timeOfDayMap, timeOfDay)}</p>
        <p>Day of Week: {getKeyByValue(dayOfWeekMap, dayOfWeek)}</p>
        <p>Lesson: {lessonCount}/month</p>
        <p>Duration: {monthCount} months</p>
        <p>Message: {message}</p>
        {to === "tutor" ? (
          <div>
            Please wait for the client to make payment.
            <br />
            Wish you all the best!
          </div>
        ) : (
          <div>
            Please pay using the link below to confirm the booking.
            <br />
            <a href={`${rootDomain}/booking/${bookingId}/pay`}>Pay</a>
            <br />
            Wish you all the best!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

type BookingPaidTemplateProps = {
  to: "client" | "tutor";
  name: string;
  tutorName?: string;
  bookingId: string;

  subjectName: string;
  postalCode: number;
  timeOfDay: number;
  dayOfWeek: number;
  lessonCount: number;
  monthCount: number;
  message: string;
};
export const BookingPaidTemplate: React.FC<
  Readonly<BookingPaidTemplateProps>
> = ({
  to,
  name,
  tutorName,
  bookingId,
  subjectName,
  postalCode,
  timeOfDay,
  dayOfWeek,
  lessonCount,
  monthCount,
  message,
}) => {
  return (
    <div>
      <header>
        Hi {name},
        <br />
        {to === "tutor" ? (
          <>Good news! You may now start tutoring!</>
        ) : (
          <>Fantastic! You had paid the fee!</>
        )}
      </header>
      <main>
        <h1>Booking Details (ID: {bookingId})</h1>
        <p>Subject: {subjectName}</p>
        <p>Postal Code: {postalCode}</p>
        <p>Time of Day: {getKeyByValue(timeOfDayMap, timeOfDay)}</p>
        <p>Day of Week: {getKeyByValue(dayOfWeekMap, dayOfWeek)}</p>
        <p>Lesson: {lessonCount}/month</p>
        <p>Duration: {monthCount} months</p>
        <p>Message: {message}</p>
        {to === "tutor" ? (
          <div>
            We will add you to a group chat with the client soon.
            <br />
            Wish you all the best!
          </div>
        ) : (
          <div>
            We will add you to a group chat with the tutor soon.
            <br />
            Wish you all the best!
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

import React from "react";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "~/server/auth";
import JotformEmbed from "react-jotform-embed";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `/?error=${encodeURI("Please login before register as tutor!")}`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default function RegisterTutor() {
  return (
    <div id="jotform">
      <JotformEmbed
        src="https://form.jotform.com/delphistechsocial/tutor-registration-form"
        scrolling
      />
    </div>
  );
}

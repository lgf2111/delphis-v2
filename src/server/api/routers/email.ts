import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BookingTutorTemplate } from '~/components/email-template';
import { Resend } from 'resend';
import { env } from "~/env";
import { TRPCError } from "@trpc/server";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
    bookTutor: publicProcedure.input(z.object({ clientName: z.string(), clientEmail: z.string().email(), email: z.string().email(), name: z.string(), subject: z.string(), location: z.string(), time: z.string(), duration: z.number(), message: z.string() })).mutation(async ({ ctx, input }) => {
        const tutorRes = await resend.emails.send({
            from: 'Cheryl Ong <cheryl.ong@delphistech.com>',
            to: [`${input.name} <${input.email}>`],
            subject: `New Assignment Request`,
            text: "",
            react: BookingTutorTemplate({ to: "tutor", ...input }),
        });

        const clientRes = await resend.emails.send({
            from: 'Cheryl Ong <cheryl.ong@delphistech.com>',
            to: [`${input.clientName} <${input.clientEmail}>`],
            subject: `New Assignment Request`,
            text: "",
            react: BookingTutorTemplate({ to: "client", ...input }),
        });

        if (tutorRes.error ?? clientRes.error) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        }

        return [tutorRes.data, clientRes.data];
    }),
});
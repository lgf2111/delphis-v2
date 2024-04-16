import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { BookTutorTemplate, EmailTemplate } from '~/components/email-template';
import { Resend } from 'resend';
import { env } from "~/env";
import { TRPCError } from "@trpc/server";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
    bookTutor: publicProcedure.input(z.object({ email: z.string().email(), name: z.string(), subject: z.string(), location: z.string(), time: z.string(), duration: z.number(), message: z.string() })).mutation(async ({ ctx, input }) => {
        const { data, error } = await resend.emails.send({
            from: 'Cheryl Ong <cheryl.ong@delphistech.com>',
            to: [`${input.name} <${input.email}>`],
            subject: 'New Assignment Request',
            text: `You have a new assignment request for ${input.subject} on ${input.time} for ${input.duration} hours. Please login to your account to accept or reject the request.`,
            react: BookTutorTemplate({ ...input }),
        });

        if (error) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        }

        return data;
    }),
});
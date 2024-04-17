import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { BookingTutorTemplate } from '~/components/email-template';
import { Resend } from 'resend';
import { env } from "~/env";
import { TRPCError } from "@trpc/server";
import { dayOfWeekMap, timeOfDayMap } from "~/utils/constants";

const resend = new Resend(env.RESEND_API_KEY);

export const bookingRouter = createTRPCRouter({
    bookTutor: publicProcedure.input(z.object({
        clientEmail: z.string().email(),
        email: z.string().email(),
        subjectId: z.string(),
        postalCode: z.number().min(100000).max(999999),
        timeOfDay: z.string(),
        dayOfWeek: z.string(),
        lessonCount: z.number(),
        monthCount: z.number(),
        message: z.string()
    })).mutation(async ({ ctx, input }) => {
        console.log(input.timeOfDay, input.dayOfWeek)
        const tutor = await ctx.db.tutor.findFirst({ where: { email: input.email } });
        const client = await ctx.db.user.findFirst({ where: { email: input.clientEmail } });
        const subject = await ctx.db.subject.findFirst({ where: { id: input.subjectId } });
        const timeOfDay = timeOfDayMap[input.timeOfDay];
        const dayOfWeek = dayOfWeekMap[input.dayOfWeek];

        if (!tutor || !client || !subject || !timeOfDay || !dayOfWeek) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        }

        const booking = await ctx.db.booking.create({
            data: {
                tutorId: tutor.id,
                clientId: client.id,
                subjectId: subject.id,
                postalCode: input.postalCode,
                timeOfDay: timeOfDay,
                dayOfWeek: dayOfWeek,
                lessonCount: input.lessonCount,
                monthCount: input.monthCount,
                message: input.message,
                status: "PENDING",
            }
        });

        const tutorRes = await resend.emails.send({
            from: 'Cheryl Ong <cheryl.ong@delphistech.com>',
            to: [`${tutor.name} <${tutor.email}>`],
            subject: `New Assignment Request`,
            text: "",
            react: BookingTutorTemplate({ to: "tutor", name: tutor.name, subjectName: subject.name, bookingId: booking.id, ...input }),
        });

        const clientRes = await resend.emails.send({
            from: 'Cheryl Ong <cheryl.ong@delphistech.com>',
            to: [`${client.name} <${client.email}>`],
            subject: `New Assignment Request`,
            text: "",
            react: BookingTutorTemplate({ to: "client", name: client.name, subjectName: subject.name, bookingId: booking.id, ...input }),
        });

        if (tutorRes.error ?? clientRes.error) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" })
        }

        return;
    }),

    listBookings: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.session.user.role === "ADMIN") {
            return ctx.db.booking.findMany()
        }
        if (!ctx.session.user.email) {
            return
        }
        return ctx.db.booking.findMany(
            { where: { tutor: { email: ctx.session.user.email } } || { client: { id: ctx.session.user.id } } }
        )
    }),

    acceptBooking: protectedProcedure.input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.booking.update({ where: { id: input.id }, data: { status: "ACCEPTED" } })
        }),

    rejectBooking: protectedProcedure.input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.booking.update({ where: { id: input.id }, data: { status: "REJECTED" } })
        }),
});
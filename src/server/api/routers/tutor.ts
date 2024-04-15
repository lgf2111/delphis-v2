import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";


export const tutorRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.tutor.findMany({ include: { subjectsByLevel: true } })
    }),

    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
        return ctx.db.tutor.findFirst({ where: { id: input.id }, include: { subjectsByLevel: true } });
    }),

    create: protectedProcedure.input(z.object({
        name: z.string(),
        citizenship: z.string(),
        dob: z.date(),
        gender: z.string(),
        race: z.string(),
        postalCode: z.string(),
        email: z.string(),
        locations: z.array(z.string()),
        education: z.string(),
        category: z.string(),
        school: z.string(),
        gradYear: z.number(),
        photo: z.any().optional(),
        availability: z.array(z.string()),
        introduction: z.string(),
        display: z.boolean()
    })).mutation(async ({ ctx, input }) => {

        return ctx.db.tutor.create({
            data: {
                name: input.name,
                citizenship: input.citizenship,
                dob: input.dob,
                gender: input.gender,
                race: input.race,
                postalCode: input.postalCode,
                email: input.email,
                locations: input.locations,
                education: input.education,
                category: input.category,
                school: input.school,
                gradYear: input.gradYear,
                photo: input.photo as string,
                availability: input.availability,
                introduction: input.introduction,
                display: input.display
            },
        });
    }),



    // create: publicProcedure
    //     .input(z.object({ name: z.string().min(1) }))
    //     .mutation(async ({ ctx, input }) => {
    //         // simulate a slow db call
    //         await new Promise((resolve) => setTimeout(resolve, 1000));

    //         return ctx.db.post.create({
    //             data: {
    //                 name: input.name,
    //             },
    //         });
    //     }),

    // getLatest: publicProcedure.query(({ ctx }) => {
    //     return ctx.db.post.findFirst({
    //         orderBy: { createdAt: "desc" },
    //     });
    // }),
});
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";


export const tutorRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.tutor.findMany({ include: { subjects: true } })
    }),

    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
        return ctx.db.tutor.findFirst({ where: { id: input.id }, include: { subjects: true } });
    }),

    create: protectedProcedure.input(z.object({
        name: z.string(),
        citizenship: z.string(),
        dob: z.date(),
        gender: z.string(),
        race: z.string(),
        postalCode: z.string(),
        email: z.string(),
        subjects1: z.array(z.string()).optional(),
        rate1: z.number().optional(),
        subjects2: z.array(z.string()).optional(),
        rate2: z.number().optional(),
        subjects3: z.array(z.string()).optional(),
        rate3: z.number().optional(),
        subjects4: z.array(z.string()).optional(),
        rate4: z.number().optional(),
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

        // const subjectsByLevel = []

        // if (input.subjects1 && input.rate1) {
        //     subjectsByLevel.push({ level: "Primary", subjects: input.subjects1, rate: input.rate1 })
        // }

        // if (input.subjects2 && input.rate2) {
        //     subjectsByLevel.push({ level: "Lower Secondary", subjects: input.subjects2, rate: input.rate2 })
        // }

        // if (input.subjects3 && input.rate3) {
        //     subjectsByLevel.push({ level: "Upper Secondary", subjects: input.subjects3, rate: input.rate3 })
        // }

        // if (input.subjects4 && input.rate4) {
        //     subjectsByLevel.push({ level: "JC", subjects: input.subjects4, rate: input.rate4 })
        // }

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
                display: input.display,
                // subject: {
                //     create: subjects
                // }
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
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
        imageUrl: z.string().default(""),
        category: z.string(),
        qualification: z.string(),
        school: z.string(),
        course: z.string().optional(),
        experience: z.number(),
        location: z.string(),
        introduction: z.string(),
        subjectName1: z.string(),
        subjectLevel1: z.array(z.string()),
        subjectRate1: z.number(),
        subjectName2: z.string().optional(),
        subjectLevel2: z.array(z.string()).optional(),
        subjectRate2: z.number().optional(),
        subjectName3: z.string().optional(),
        subjectLevel3: z.array(z.string()).optional(),
        subjectRate3: z.number().optional(),
    })).mutation(async ({ ctx, input }) => {
        const subjects = [
            { name: input.subjectName1, level: { set: input.subjectLevel1 }, rate: input.subjectRate1 },
        ]
        if (input.subjectName2 && input.subjectLevel2 && input.subjectRate2) {
            subjects.push({ name: input.subjectName2, level: { set: input.subjectLevel2 }, rate: input.subjectRate2 })
        }
        if (input.subjectName3 && input.subjectLevel3 && input.subjectRate3) {
            subjects.push({ name: input.subjectName3, level: { set: input.subjectLevel3 }, rate: input.subjectRate3 })
        }
        return ctx.db.tutor.create({
            data: {
                name: input.name,
                imageUrl: input.imageUrl,
                category: input.category,
                qualification: input.qualification,
                school: input.school,
                course: input.course,
                experience: input.experience,
                location: input.location,
                introduction: input.introduction,
                subjects: {
                    create: subjects
                }
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
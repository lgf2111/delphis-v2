import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tutorRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.tutor.findMany();
    }),

    getById: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
        return ctx.db.tutor.findFirst({ where: { id: input.id }, include: { subjects: true } });
    })

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

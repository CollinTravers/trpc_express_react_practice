import express, {Express} from 'express';
import cors from "cors";
import  {initTRPC} from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { z } from 'zod';

//creates new instance of TRPC
const t = initTRPC.create();

//how we can route different actions
//takes in an object
//sayHi and logToServer are our two different actions
const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    //All this does is return the string of hi.
    //basically, the say hi is a procedure that calls a function that returns hi
    return "Hi"
  }),
  logToServer: t.procedure
    .input(
      z.object({
        //what we are doing is taking unknown type v (from above) and then typing it so it can only be a string
        //This is VALIDATING the input
        v: z.string(),
      }),
      ).mutation(req => {
    //We want to log this mutation and then return true to say it was performed successfully
    console.log(`Client Says: ${req.input.v}`)
    return true
  }),
  returnValue: t.procedure
    .input(
      z.object({
        v: z.string(),
      }),
    ).mutation(req => {
      console.log(req.input.v)
      return req.input.v
    })

})

//express specific code
const app = express();

app.use(cors());

//exress specific adapter
app.use('/trpc', createExpressMiddleware({ router: appRouter}))

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//exporting the type to use in client
export type AppRouter = typeof appRouter
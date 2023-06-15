import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from "../../../server/index"


//creating the react hook called trpc and exporting it
export const trpc = createTRPCReact<AppRouter>();
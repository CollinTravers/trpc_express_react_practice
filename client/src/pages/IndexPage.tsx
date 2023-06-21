import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { string } from 'zod';
 
export default function IndexPage() {
  const sayHiQuery = trpc.sayHi.useQuery();
  const logToServerMutation = trpc.logToServer.useMutation();
  const returnValue = trpc.returnValue.useMutation();

  const [response, setResponse] = useState("");

  const mutate = () => {
    logToServerMutation.mutate({v: "Mutation"})
  }

  const awaitMutate = (mutation: string) => {
    returnValue.mutate({v: mutation})
    console.log(returnValue.data)
    setResponse(returnValue.data || '')
  }
 
  return (
    <div>
      <header>

      </header>
      <main>
        {sayHiQuery.data}
        <div>
          <button onClick={mutate}> Click me</button>
        </div>
        <button onClick={() => awaitMutate("Hello my dude")}> Mutate me</button>
        <div>
          {response}
        </div>
        <div>
        </div>
        {logToServerMutation.error && <p>something when wrong! {logToServerMutation.error.message}</p>}
      </main>
    </div>
  );
}
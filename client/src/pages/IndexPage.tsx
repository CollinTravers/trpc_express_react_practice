import { trpc } from '../utils/trpc';
 
export default function IndexPage() {
  const sayHiQuery = trpc.sayHi.useQuery();
  const logToServerMutation = trpc.logToServer.useMutation();

  const mutate = () => {
    logToServerMutation.mutate({v: "fucker"})
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

        {logToServerMutation.error && <p>something when wrong! {logToServerMutation.error.message}</p>}
      </main>
    </div>
  );
}
import Link from "next/link";
import { UserGreeting } from "~/app/_components/userGreeting";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="flex flex-col gap-4 p-16">
        <UserGreeting />
        <h2>This will be a dashboard</h2>
        <p>
          Check out{" "}
          <Link className="hover:underline" href="/vendingMachine">
            vending machines
          </Link>{" "}
          or{" "}
          <Link className="hover:underline" href="/locations">
            locations
          </Link>{" "}
          to get an idea of what I'm working on.
        </p>
        <div>
          <p>For the future, the plan is for the dashboard to show data such as:</p>
          <ul className="list-disc pl-4 list-inside">
            <li>Overview: status of all machines in a specific location</li>
            <li>Top Earners: The top 10 machines in order of most sales made</li>
            <li>Running low: Which machines are in most need of a restock</li>
            <li>Stretch goal: which items sell the most at each location</li>
          </ul>
        </div>
        <div>
          <p>Some things I want to add:</p>
          <ul className="list-disc pl-4 list-inside">
            <li>Companies and customers, to assign the vending machines to</li>
            <li>Items to vend, to put into the machines</li>
            <li>Testing! My components need some unit tests</li>
            <li>Error messages! I want to add toasts when something goes wrong</li>
            <li>Animations, for a smooth UX</li>
            <li>
              Stretch goal: keeping detailed track of when a machine is stocked, info such as
              <ol className="pl-4 list-decimal list-inside">
                <li>the date it was stocked</li>
                <li>how much of each item was added</li>
                <li>how much of each item was removed</li>
                <li>the amount of money removed from machines that accept cash</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </HydrateClient>
  );
}

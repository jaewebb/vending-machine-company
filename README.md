# Readme

```
pnpm i
pnpm dev
```
You'll need a postgres db, point to it with DATABASE_URL in your .env file

you'll need BETTER_AUTH_SECRET in your .env file
generate one with

```
pnpm dlx auth@latest secret
```
the current better auth adapter doesn't not support prisma 8 yet, so I had to use pg and had to run:

```
npx auth@latest migrate
```

if you make a change to contract.prisma and want to update the db

```
pnpm db:emit
pnpm db:update
```

For the future, the plan is for the dashboard to show data such as:
<ul className="list-disc pl-4 list-inside">
  <li>Overview: status of all machines in a specific location</li>
  <li>Top Earners: The top 10 machines in order of most sales made</li>
  <li>Running low: Which machines are in most need of a restock</li>
  <li>Stretch goal: which items sell the most at each location</li>
</ul>

Some things I want to add:
<ul className="pl-4 list-inside">
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

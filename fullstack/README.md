## Fullstack Developer

Hi Alex.
I'm having problems with a test assignment. Everything was clear to me and I knew that I would do it.

The problem is that I did this task on my laptop, but didn’t have time to finish it because I had a flight. My plan was to connect to my laptop (I leaved in home becuase trackpad doesn't work and i have problem with brightness - honestly no brightess on laptop) as a virtual machine upon arrival using a friend’s laptop. But it didn't work, the FPS was less than one per minute. To install programming environments on my friend’s laptop, I need to spend 2 days, because this is not a laptop for programming. I want you to understand my situation and below I wrote what I did and what I would like to do if I had the opportunity.

I made a worker that every 5 minutes deletes data from the database and adds new data there (can be a db transaction so that there were no unexpected errors, but I thought that for a test task it will be overkill). And when we start the application, we receive data instantly thanks to dividing the functionality into 2 functions (could have been done in the onModuleDestroy).

I also decided to expand your folder structure and did everything in the services folder (basically I do it differently - I divide everything by business entities and the services folder for me is more like a database, message-broker, tracing, metrics).

I also wrote some tests, but I only tested mappers and some use cases (but not all) - there were some notes and comments left there (mostly in production I write little commentary) unfortunately I did not have time to write all the tests to look if it works correctly.

I can’t say much about the frontend - I made a table using tailwind but didn’t have time to test it and write some e2e tests - moustly i used cypress but now it's playwright). I tried to make the frontend "stupid" so that there was less code, there are only calls of our graphql query

NOTE: i edited more file than needed because i tried to make some changes on my friend's  laptop and it was a hell

Perhaps the code I wrote will not be enough for you. I have a github where there are a couple of projects. If you didn’t like something, then I would like to go to another short interview where you would ask me specific questions about your tasks and technologies.

I really liked the way you conducted the interview, there were only relevant questions without stupid leetcode tasks, and I often understand the atmosphere in a company by how the interview goes, but I also understand it's my mistake that i didn't prepare another laptop to continue the task

Thanks

@Oleh Strokan

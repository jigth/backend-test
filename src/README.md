# Source Code README

Welcome to this code, I'll be as brief as possible here and explain only the foundamental decisions I took in this project and why I took them.

## Architectural decision log for this project

### Project structure 

1. I decided to refactor the whole project to a clean architecture before starting because it was simple enough to be tested manually and combining two architectural styles (MVC and Clean Architecture) would have been worse than just keep using MVC in complexity and organization.

2. New features will be implemented using a clean architecture (Hexagonal Architecture + Screaming Architecture + some Unit Tests)

### Testing Framework (JEST vs Vitest for this project)

I know that JEST was preinstalled in this project but there wasn't any test written for TypeScript using it. I tried about two hours to make JEST work fine with TypeScript and ES-Modules but was just too much work without any significant result. Multiple tutorials were researched and [this one worked the best (how to configure JEST with TypeScript)](https://swizec.com/blog/how-to-configure-jest-with-typescript/) but still didn't quite worked as expected, because it thrown errors when trying to even import and log to the console a simple one liner controller.

Generally the JEST support for TypeScript and ES-Modules is not pretty in my opinion so I decided to choose Vitest, which worked in the first try with TypeScript and without any weird configuration. It also has the perk of better performance **so I'll be using Vitest for this project**

**Reference images that proof that JEST is failing for this project but Vitest isn't**: I know there may be a solution but I couldn't figure out what to do with JEST so here are the images of an identical test in both JEST and Vitest in this project.

**Vitest Works fine**

![vitest-works-fine](/assets/docs/img/vitest-works.png)

**JEST Doesn't work as well as Vitest in TypeScript (in my opinion)**

![jest-fails-a-lot-in-ts](/assets/docs/img/jest-fails-a-lot-in-ts.png)

### .yarn folder

It has been left mostly unchanged since the project was using it from the begining but I would ask if it's really necessary to keep it or not.
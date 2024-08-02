# Source Code README

Welcome to this code, I'll be as brief as possible here and explain only the foundamental decisions I took in this project and why I took them.

1. Most part of the project structure was left as-is initially to avoid breaking changes. Technically everything could be refactored but that would be time consuming so it's better left for later in my opinion.

2. New features will be implemented using a clean architecture (Hexagonal Architecture + Screaming Architecture + some Unit Tests)

3. I decided to refactor the whole project to a clean architecture before starting because it was simple enough to be tested manually and combining two architectural styles (MVC and Clean Architecture) would have been worse than just keep using MVC in complexity and organization.
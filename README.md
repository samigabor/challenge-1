## Challenge: 

Company’s stakeholders want to get a list of all BAR token (ERC20) transfers where the from OR
the to is part of a given list and have happened over the last X years.

Write a code snippet in your preferred language without using a 3rd party provider (like Alchemy, Moralis, …).

Then describe how you could improve your code by using a modern approach and keeping in mind security,
scalability, maintainability, speed, use of 3rd party tools, etc..

## Improvements:

- Security:
    - Ensure that sensitive information like the API keys (e.g. use environment variables)
    - For The Graph, restrict API key to certain subgraphs or domains
- Scalability/Speed:
    - Use asynchronous programming techniques to parallelize tasks and reduce waiting time for I/O operations
    - Implement caching mechanisms to reduce the number of repetitive requests to the node
- Maintainability:
    - Use proper documentation and comments to explain the code's functionality
    - Modularize the code into smaller, reusable functions for better maintainability and readability
    - Use Git for tracking changes and collaboration
- Use of 3rd Party Tools:
    - Use an indexing protocol like The Graph for efficient data querying
    - Use efficient and feature-rich libraries like Foundry or Hardhat for smart contract interaction and testing
- Modern Approach:
    - Explore newer technologies such as GraphQL for querying blockchain data more flexibly and efficiently (e.g. The Graph)

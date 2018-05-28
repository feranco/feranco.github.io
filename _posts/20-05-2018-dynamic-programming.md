---
layout: post
title: "Dynamic Programming"
categories:
  - Algorithms
tags:
  - Recursion
last_modified_at: 2018-05-25T09:55:59-05:00
---

Dynamic programming is a method that solves problems by combining the solutions to subproblems. In particular, dynamic programming applies when the subproblems overlap. A dynamic-programming algorithm solves each subsubproblem just once and then saves its answer in a table, thereby avoiding the work of recomputing the answer every time it solves each subsubproblem. (“Programming” in this context refers to a tabular method, not to writing computer code.) 

We typically apply dynamic programming to optimization problems. Such prob- lems can have many possible solutions. Each solution has a value, and we wish to find a solution with the optimal (minimum or maximum) value. We call such a solution an optimal solution to the problem, as opposed to the optimal solution, since there may be several solutions that achieve the optimal value.

Dynamic programming is generally the right method for optimization problems on combinatorial objects that have an inherent left to right order among compo- nents. Left-to-right objects includes: character strings, rooted trees, polygons, and integer sequences.

When developing a dynamic-programming algorithm, we follow a sequence of four steps:
1. Characterizethestructureofanoptimalsolution.
2. Recursivelydefinethevalueofanoptimalsolution.
3. Computethevalueofanoptimalsolution,typicallyinabottom-upfashion. 4. Constructanoptimalsolutionfromcomputedinformation.

Note that to solve the original problem of size n, we solve smaller problems of the same type, but of smaller sizes. Once we make the first cut, we may consider the two pieces as independent instances of the rod-cutting problem. The overall optimal solution incorporates optimal solutions to the two related subproblems, maximizing revenue from each of those two pieces. We say that the rod-cutting problem exhibits optimal substructure: optimal solutions to a problem incorporate optimal solutions to related subproblems, which we may solve independently.

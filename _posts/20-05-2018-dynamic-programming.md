---
layout: post
title: "Dynamic Programming"
categories:
  - Algorithms
tags:
  - Recursion
last_modified_at: 2018-05-25T09:55:59-05:00
---

Dynamic programming is a method that solves problems by combining the solutions to subproblems. In particular, dynamic programming applies when the **subproblems overlap**. A dynamic-programming algorithm solves each subsubproblem just once and then saves its answer in a table, avoiding the work of recomputing the answer every time a subsubproblem needs to be solved again. The word Programming in this context refers to a tabular method and not to writing computer code. 

Dynamic programming is tipically applied to optimization problems, having many possible solutions. Each solution has a value, and the goal is to find a solution with the optimal (minimum or maximum) value. Such a solution should be called an optimal solution to the problem, as opposed to the optimal solution, since there may be several solutions that bring to the optimal value. Dynamic programming is generally the right method for optimization problems on combinatorial objects that have an inherent left to right order among components, such as: character strings, rooted trees and integer sequences.

Another carachteristic of dynamic programming problems is that they have **optimal substructure**: optimal solutions to a problem incorporate optimal solutions to related subproblems, which we may solve independently. In other words, a problem of size n exhibits optimal substructure if its optimal solution can be obtained by using optimal solutions of smaller problems of the same type, but of smaller sizes.

When developing a dynamic-programming algorithm, we follow a sequence of four steps:
1. Characterize the structure of an optimalsolution.
2. Recursively define the value of an optimal solution.
3. Compute the value of an optimal solution, typically in a bottom-up fashion. 
4. Construct an optimal solution from computed information.
 

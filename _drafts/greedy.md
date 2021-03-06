---
layout: post
title: Greedy Algorithms
categories:
  - Algorithms
tags:
  - Dynamic Programming
  - Greedy
  - Recursion
last_modified_at: 2018-05-25T09:55:59-05:00
---

Algorithms for optimization problems typically go through a sequence of steps, with a set of choices at each step. As discussed in a previous post about [DP](2018-05-20-dynamic-programming.md), a dynamic programming approach examines each choice only once avoiding repeated computations. For some problems checking all possible choices could be not necessary and a more efficient algorithm could be applied. A greedy algorithm is an algorithm that makes at each step the choice that is locally optimum and it never changes this choice.
So a greedy algorithm produces an optimum solution only when all locally optimal choices lead to a globally optimal solution. 

1. use a dynamic programming approach, considering several choices when determining which subproblems to use in an optimal solution;

2. observe that only one subproblem remains when only the locally optimum choice is considered;

3. develop a recursive greedy algorithm to solve the problem and convert the recursive algorithm to an iterative one.

[ZigZag](http://community.topcoder.com/stat?c=problem_statement&pm=1259&rd=4493)

##Define a dynamic programming solution

According to a DP approach, a solution to the ZigZag problem requires to choice at each step if the element i belong to a zigzag sequence ending in i with a positive difference or to a zigzag sequence ending with a negative difference. Making this choice leaves one or more subproblems to be solved --> find the longest anding in i with pos or neg.

An optimal solution S(i) for the ZigZag problem is represented by the longest zigzag sequence ending at index i. This solution has optimal substructure 
11

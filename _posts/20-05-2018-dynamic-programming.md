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
1. Define the structure of an optimal solution.
2. Recursively define the value of an optimal solution.
3. Compute the value of an optimal solution in a bottom-up or top-down fashion. 
4. Construct an optimal solution from computed information.

Let’s see the base of DP with the help of a simple problem that can be found in [Leetcode](https://leetcode.com/problems/house-robber/description/). The House Robber problem is defined as follows: 
```yaml
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.
```
In abstract: given an array of N integer, the problem is to find the maximum sum that can be computed without taking two consecutive numbers.

## Define the structure of an optimal solution

A Dynamic Programming solution is usually based on one (or more) starting state and a recurrent formula linking a new state to the previously found ones. So the first step is to find a state for which an optimal solution is already defined and that can be used to find an optimal solution for the next state. In this context, a state is a way to describe a sub-solution for the problem. For the House Robber example, a state could be the solution for an array of length l where l≤N. A smaller state than state l would be the solution for an array of length i, where i<l. The starting state is the solution for an empty array: 0.

## Recursively define the value of an optimal solution.

The second step is to find a recurrent formula computing an optimal solution for a state in terms of the optimal solution of smaller states. Such a formula can be defined by carefully analyzing the problem to be solved. In the case of House Robber problem, it can be observed that a generic array element i an be part or not be part of an optimal solution. If i is part of an optimal solution, the previous element i-1 cannot be part of an optimal solution and the solution for an array of length i is given by the value of the array element i plus an optimal solution of an array of length i-2. If i is not part of an optimal solution, the previous element i-1 can be part of an optimal solution and the solution for an array of length i is given by
 

{% highlight cpp %}
int rob_helper(vector<int>& nums, vector<int>& dp, int idx) {
        
    if (idx >= nums.size()) return 0;
   
    if (dp[idx] >= 0) return dp[idx];
    
    dp[idx] = max(nums[idx] + rob_helper(nums, dp, idx+2), rob_helper(nums, dp, idx+1));
    
    return dp[idx];
}
    
int rob(vector<int>& nums) {
    vector<int> dp(nums.size(),-1);
    return rob_helper(nums, dp, 0);
}
{% endhighlight %}

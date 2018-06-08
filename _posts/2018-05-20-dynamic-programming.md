---
layout: post
title: Dynamic Programming
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
4. Construct an optimal solution from computed values.

Let’s see the base of DP with the help of a simple problem that can be found in [Leetcode](https://leetcode.com/problems/house-robber/description/). The House Robber problem is defined as follows: 
```yaml
A professional robber plans to rob houses along a street. Each house has a certain amount of money stashed, 
the only constraint stopping the rob from robbing each of them is that adjacent houses have security system 
connected and it will automatically contact the police if two adjacent houses were broken into. Given a list 
of non-negative integers representing the amount of money of each house, the problem is to determine the maximum 
amount of money that can be robbed without alerting the police.
```
In abstract: given an array A of N integer, the problem is to find the maximum sum that can be computed without taking two consecutive numbers.

## Define the structure of an optimal solution

A Dynamic Programming solution is usually based on one (or more) starting state and a recurrent formula linking a new state to the previously found ones. So the first step is to find a state for which an optimal solution is already defined and that can be used to find an optimal solution for the next state. In this context, a state is a way to describe a sub-solution for the problem. For the House Robber example, a state could be the solution for an array of length l where l≤N. A smaller state than state l would be the solution for an array of length i, where i<l. The starting state is the solution for an empty array: 0.

## Recursively define the value of an optimal solution.

The second step is to find a recurrent formula computing an optimal solution for a state in terms of the optimal solution of smaller states. Such a formula can be defined by carefully analyzing the problem to be solved. In the case of House Robber problem, it can be observed that a generic array element i can be part or not be part of an optimal solution. If i is part of an optimal solution, the previous element i-1 cannot be part of an optimal solution and the solution for an array of length i is given by the value of the array element i plus an optimal solution of an array of length i-2. If i is not part of an optimal solution, the previous element i-1 can be part of an optimal solution and the solution for an array of length i is given by an optimal solution of an array of length i-2. So, an optimal solution S(i) for an array A of length i is given by S(i) = max (A[i] + S(i-2), S(i-1).

## Compute the value of an optimal solution. 

Once the value of an optimal solution is defined by a recurrent formula, there are two approaches to implement a procedure computing this value. The first approach is **top-down with memoization**: the program is written recursively in a natural manner, but modified to save each subsolution (tipically in an array or hash table). The program first checks if a solution for the subproblem was already found. If so, it returns the saved value avoid to recompute the subsolution; if not, the procedure computes the value in the usual manner. The following C++ program implements a solution to the House Robber problem according to this approach.

{% highlight cpp %}
int rob_helper(vector<int>& nums, vector<int>& dp, int idx) {
  //base case     
  if (idx >= nums.size()) return 0;
  //check for cached results
  if (dp[idx] >= 0) return dp[idx];
  //compute and save current solution
  dp[idx] = max(nums[idx] + rob_helper(nums, dp, idx+2), rob_helper(nums, dp, idx+1));

  return dp[idx];
}
    
int rob(vector<int>& nums) {
  vector<int> dp(nums.size(),-1);
  return rob_helper(nums, dp, 0);
}
{% endhighlight %}
  
The second approach is **bottom-up**: the subproblems are solved in order of size, such that solving a particular subproblem depends only on the solution of smaller subproblems. Each sub-problem is solved only once and when it is solved, all subproblems its solution depends upon were already solved and the corresponding values were saved. The following Python program implements a solution to the House Robber problem according to this approach. First it defines a solution for an array of length 1 and then it compute a solution for arrays of increasing size using the previous computed solution.

{% highlight python %}
def rob(self, nums):

  #base cases
  if len(nums) == 0 :
    return 0
        
  if len(nums) == 1 :
    return nums[0]

  if len(nums) == 2 :
      return = max(nums[0],nums[1])

  #define the starting states
  dp = [nums[0], max(nums[0],nums[1])]
  
  #compute all states in size order
  for i in range(2, len(nums)) :
      dp.append(max(dp[i-1] + nums[i], dp[i]))

  return dp[-1]
{% endhighlight %}

The two approaches yield algorithms with the same asymptotic running time and space. For the House Robber problem both time and space are O(n), where n is the length of the array. A more careful analysis demonstrates that there is no need to store all the intermediate values for the entire period of execution. Because the recurrent formula depends only on the last two solutions, only the last two computed values need to be saved.

## Construct an optimal solution

Sometimes a DP problem requires not only the value of an optimal solution, but also an actual solution. In this case, the DP approach shall be extended to save not only an optimal value for each subproblem, but also the choice that brings to this optimal value. For the House Robber problem, an actual solution consists in a list of houses and is described by a subsequence of the DP array starting from the initial state (an empty list of houses) down to the final state (the last robbed house). The key to building the solution is to reconstruct the decisions made at every step along the optimal path that leads to the goal state. These decisions have been recorded in the parent field of each array cell. With this information, we can readily print an optimal solution. 

The possible solutions to a given dynamic programming problem are described by paths through the dynamic programming matrix, starting from the initial con- figuration (the pair of empty strings (0, 0)) down to the final goal state (the pair The key to building the solution is to reconstruct the decisions made at every step along the optimal path that leads to the goal state. These decisions have been recorded in the parent field of each array cell. With this information, we can readily print an optimal solution. 

        

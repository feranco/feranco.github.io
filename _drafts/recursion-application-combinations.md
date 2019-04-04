---
layout: post
title: "Recursion Application: combinations"
categories:
  - Algorithms
tags:
  - Recursion
  - Backtracking
last_modified_at: 2019-01-25T09:55:59-05:00
---

A combination of a given set of object is a subset describing a selection of
these objects, where the order among them does not matter. Many important
algorithmic problems can be solved finding all the possible combinations of
elements in a given set and processing these combinations in order to keep
only the ones fulfilling certain criteria. For example the knapsack problem
keeps the most profitable combination of items given a bound on their total
weight, while the perfect sum problem keeps all subsets of given array with sum
equal to given sum. 

# Counting combinations

Since each element can be included or excluded from a subset, the number of possible combinations of a given set of
n elements is 2<sup>n</sup>. The algorithm to count all possible combination of a given set is straightforward and has a O(2(<sup>n</sup>)) time complexity. Instead, the space complexity is O(n) because the height of the recursion tree corresponds to the size of the set.

```cpp
unsigned int countingCombinations (unsigned int n) {

  //base case: only 1 combination with 0 objects (the empty combination)
  if (n == 0) return 1;

  unsigned int combinationWithN = countingCombinations(n-1);
  unsigned int combinationWithoutN = countingCombinations(n-1);

  return combinationWithN + combinationWithoutN;
}
```

The same idea applies iterate through all the element of the set trying to
include\exclude it and collect every different variation.

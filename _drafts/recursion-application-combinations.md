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
equal to given sum. Before analyzing such category of problems, it's worth to observe that
they can be often optimized using the following techniques:
* backtracking: the process of generating a combination is stopped as soon as the criteria is not fulfilled;
* dynamic programming: the partial values obtained generating a combination are cached so not to repeat them

# Counting combinations

Since each element can be included or excluded from a subset, the number of possible combinations of a given set of
n elements is 2<sup>n</sup>. The algorithm to count all the possible combinations of a given set is straightforward and has a O(2<sup>n</sup>) time complexity. Instead, the space complexity is O(n) because the height of the recursion tree corresponds to the size of the set.

```cpp
unsigned int countingCombinations (unsigned int n) {

  //base case: only 1 combination with 0 objects (the empty combination)
  if (n == 0) return 1;

  unsigned int combinationWithN = countingCombinations(n-1);
  unsigned int combinationWithoutN = countingCombinations(n-1);

  return combinationWithN + combinationWithoutN;
}
```

# Generate combinations

The same idea used to count all possible combinations of a given set can be applied to generate all the possible combinations of the set. Regardless of the data structure used to represent the set (e.g. array, list, etc...), the algorithm can be sketched as follow:

* go through all the elements of the set;
* for each element try both to select it, including it in the current combination, and not select it, excluding it from the current combination;
* apply the steps above recursively branching and collecting all possible combinations.

So, including/excluding the first element of the set lead to two different combinations (first branch), including/excluding the second element lead to other two different combinations for each of the two combination previously obtained (second branch), and so on. Branching by two each time, this process allows to generate all the possible 2<sup>n</sup> combinations. 

The following functions implements this algorithm building up the result as it return from the base case. 

```cpp
template <typename T>
using Set = std::list<T>;
template <typename T>
using PowerSet = std::vector<Set<T>>;

template <typename T>
PowerSet<T> generatePowerSet (const std::vector<T>& items, unsigned int i) {

  PowerSet<T> result;

  if (i == items.size()) {
    result.emplace_back(Set<T>{});
    return result;
  }

  for (auto& set : generatePowerSet(items, i+1)) {
    result.emplace_back(set);
    set.emplace_front(items[i]);
    result.emplace_back(set);
  }

  return result;
}

template <typename T>
PowerSet<T> powerSetReturn (const std::vector<T>& items) {
  return generatePowerSet(items, 0);
}


template <typename T>
void powerSet (const vector<T>& set, vector<T>& currentSet, vector<vector<T>>& powerSet, size_t idx) {
  
  if (idx == set.size) powerSet.push_back(currentSet); //ha senso passa current set al costruttore di vector che accetta un altro vector
  
  powerSet(set, currentSet, powerSet, idx+1);
  currentSet.push_back(set[idx]);
  powerSet(set, currentSet, powerSet, idx+1);  
  currentSet.pop_back();
  //this push_back and pop_back is a backtracking;
  //if I create pass current set by copy this is not needed
  /also not needed if I create a copy of current set and continue passing by references
}
```

return value is important to optimize with dynamic programming, because passed variable introduce like a global state that prevents to 
catch the values that are used to cache results in dynamic programming.

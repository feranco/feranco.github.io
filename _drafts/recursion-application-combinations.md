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
equal to given sum. Such category of problems can be often optimized using the following techniques:
* backtracking: the process of generating a combination is stopped as soon as the criteria defining a valid solution are not fulfilled. The most recent element is removed from the combination (backtrack) and the generation of another combination without this element is started;
* dynamic programming: the partial values obtained generating a combination are cached so not to repeat them.

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

The same idea used to count all possible combinations of a given set can be applied to generate all the possible combinations of the set (i.e. its power set). Regardless of the data structure used to represent the set (e.g. array, list, etc...), the algorithm can be sketched as follow:

* go through all the elements of the set;
* for each element try both to select it, including it in the current combination, and not select it, excluding it from the current combination;
* apply the steps above recursively branching and collecting all possible combinations.

So, including/excluding the first element of the set lead to two different combinations (first branch), including/excluding the second element lead to other two different combinations for each of the two combination previously obtained (second branch), and so on. Branching by two each time, this process allows to generate all the possible 2<sup>n</sup> combinations. 

The following function implements this algorithm building up the result as it return from the base case. 

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
```
Even if the function is not difficult to understand, it is worth to observe the following details:
* each subset is returned as a list in order to have O(1) insertions and return the elements in the same order they were in the given input set;
* the base case shall return an empty list (and not only an empty power set);
* the branching factor is one and the depth of the recursion is n, so the time complexity depends on the amount of work done during each recursive call.

In particular, the time complexity of the solution is O(n2<sup>n</sup>) because it generates 2<sup>n</sup> lists and each list shall be copied in O(n) time. The space complexity is also O(n2<sup>n</sup>) because 2<sup>n</sup> lists shall be stored and each list requires O(n) space.

The following function implements the same algorithm using a passed variable to store the result. 

```cpp
template <typename T>
using Set = std::list<T>;
template <typename T>
using PowerSet = std::vector<Set<T>>;

template <typename T>
void powerSet (const vector<T>& set, vector<T>& currentSet, vector<vector<T>>& powerSet, size_t idx) {
  
  if (idx == set.size) powerSet.push_back(currentSet); //ha senso passa current set al costruttore di vector che accetta un altro vector
  
  powerSet(set, currentSet, powerSet, idx+1); //current set without set[idx]
  currentSet.push_back(set[idx]);
  powerSet(set, currentSet, powerSet, idx+1); //current set with set[idx]  
  currentSet.pop_back();
  //this push_back and pop_back is a backtracking;
  //if I create pass current set by copy this is not needed
  /also not needed if I create a copy of current set and continue passing by references
}

template <typename T>
PowerSet<T> powerSetParams (const std::vector<T>& items) {
  PowerSet<T> result;
  generatePowerSet(items, 0, result, Set<T>());
  return result;
}
```

It's interesting to notice the differences with the implementation building up the result:
* the base case copy the current set in the passed variable storing the result;
* since the current set is built forward traversing the given input set, all the element are naturally in the same order they were in the input set;
* since the current set is passed by reference, it is necessary to implement a basic backtracking mechanism adding the currently indexed item to the current set, executing the recursive call with the current set and finally removing the currently indexed item from the current set. A less efficient alternative would have been to create two copies of the current set (one with the currently indexed element and one without) or to pass the current set by copy.

The branching factor is two and the depth of the recursion is n, so the time complexity is O(n2<sup>n</sup>). Since each element is first added and then removed from the current set in costant time, no extra work is executed during each call. The space complexity is also O(n2<sup>n</sup>) because of the space necessary to store all the lists. Anyway, if the function were just printing all the combinations, the space complexity would be only O(n) because of the space necessary to store the current set. 

# Select combinations of a given size

This problem is a slightly different version of the previous one and it requires to generate only the possible combinations with a given size n. The brute force algorithm is obviously to generate all the possible combinations with one of the functions described in the previous section and then filter them out to keep only the combination of size n. A better approach is to use backtracking in order to directly generate only the combinations of size n. The idea is to stop the generating a combination as soon as its size is n and then recursively remove the most recent elements in that combination in order to generate other combinations. (in the same way discard the combinations reaching the base case with less tahn n elements). 

return value is important to optimize with dynamic programming, because passed variable introduce like a global state that prevents to 
catch the values that are used to cache results in dynamic programming.

---
layout: post
title: 2Sum3Sum4Sum
categories:
  - Problems
tags:
  - Arrays
  - Math
last_modified_at: 2018-07-14T09:55:59-05:00
---

2Sum, 3Sum and 4Sum are popular coding interview questions. Each one of themhas several variations that looks more complicated, but have the same complexity as the basic form in the end. Let's start with the basic 2Sum question that will be the basic building block for all the other problems..

## 2Sum

Given an array of integers, return indices of the two numbers such that theyadd up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.

The brute force solution for this problem is pretty obvious: use 2 loops to iterate over all the possible pairs of numbers and check if each of them sums up to the target. This solution has O(n<sup>2</sup>) time and O(1) space complexity. The trick to improve this solution is to trade space for time. An hash map can be used to map each number to its index so that it is possible to check if the complement of an element with index i (target-num[i]) is in the table. This solution has O(n) time and O(n) space. Note that it is possible to insert the elements in the hash table directly while looking for a solution, without prebuilding a hash map with all the elements.

```cpp
vector<int> twoSum(vector<int>& nums, int target) {
        
        unordered_map<int, size_t> num2idx;
        
        for (size_t i = 0; i < nums.size(); ++i) {
            
            if (num2idx.count(target-nums[i])) return {num2idx[target-nums[i]],i};            
            num2idx[nums[i]] = i;
        }
        
        return {};
}

```

If the given array of numbers is already sorted, it is possible to get a better solution in term of space complexity using a two pointers approach. At the beginning the two pointers point to the first and last element of the array. Then if the sum of the two elements is less than the target move forward the first pointer, while if it is less than the target move the second pointer backward. The algorithm stop when the sum of the two numbers is equal to the target or when it is clear than a solution doesn't exist. The space complexity is O(1), whie the time complexity is still O(n).

```cpp
vector<int> twoSum(vector<int>& numbers, int target) {
        
        size_t i = 0, j = numbers.size()-1;
        
        while (i < j) {            
            int sum = numbers[i] + numbers[j];
            if (sum == target) return {i+1,j+1};
            else if (sum < target) i++;
            else j--;
        }
        return {};
}

```

## 2Sum Variants

**Two sum less than K:** Given an array A of integers and integer K, return the maximum S such that there exists i < j with A[i] + A[j] = S and S < K. The optimal solution is to sort the array and then use the 2 pointers method as explained before.

**Two sum class design:** Design and implement a TwoSum class supporting the following operations: add (add the number to an internal data structure) and find (find if there exists any pair of numbers which sum is equal to the value).

The optimal solution is to use the hash map approach explained before with a slight modification. In this case the hash map shall map each number to its frequency so that it is possible to discard all cases where the complement of a value is the value itself, but its frequency in the map is 1.

**Two sum input is a BST:** the idea is to take advantage of the BST properties to get a sorted array with all the value in the BST. The 2 pointers method can then be applied to find a solution.


---
layout: post
title: 2Sum, 3Sum, 4Sum
categories:
  - Problems
tags:
  - Arrays
  - Math
last_modified_at: 2019-11-24T09:55:59-05:00
---

2Sum, 3Sum and 4Sum are popular coding interview questions. Each one of them has several variations that looks more complicated than the original one, but ultimately their solution is not so different. Let's start with the basic 2Sum question, since it will be the basic building block for all the other problems.

## 2Sum

*Given an array of integers, return indices of the two numbers such that they add up to a specific target. You may assume that each input would have exactly one solution, and you may not use the same element twice.*

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

If the given array of numbers is already sorted, it is possible to get a better solution in term of space complexity using a two pointers approach. At the beginning the two pointers point to the first and last element of the array. Then if the sum of the two elements is less than the target move forward the first pointer, while if it is less than the target move the second pointer backward. The algorithm stop when the sum of the two numbers is equal to the target or when it is clear than a solution doesn't exist. The space complexity is O(1), while the time complexity is still O(n).

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

**Two sum less than K:** *Given an array A of integers and integer K, return the maximum S such that there exists i < j with A[i] + A[j] = S and S < K.*

The optimal solution is to sort the array and then use the 2 pointers method as explained before.

**Two sum class design:** *Design and implement a TwoSum class supporting the following operations: add (add the number to an internal data structure) and find (find if there exists any pair of numbers which sum is equal to the value).*

The optimal solution is to use the hash map approach explained before with a slight modification. In this case the hash map shall map each number to its frequency so that it is possible to discard all cases where the complement of a value is the value itself, but its frequency in the map is 1.

**Two sum input is a BST:** *Given a Binary Search Tree and a target number, return true if there exist two elements in the BST such that their sum is equal to the given target.*

The idea is to take advantage of the BST properties to get a sorted array with all the value in the BST. The 2 pointers method can then be applied to find a solution.

## 3Sum

*Given an array nums of n integers, find all unique triplets in the array which gives the sum of zero.*

The brute force solution for this problem is to use 2 loops to iterate over all the possible triplets of numbers and check if each of them sums up to zero. This solution has O(n<sup>3</sup>) time and O(1) space complexity. Anyway once one number X in the array has been fixed, the problem is reduced in finding 2 numbers that sum up to -X. This is exactly the 2sum question and can be solved in O(N) time. It is worth to sort the input array for 2 reasons. First, the big O complexity of the solution is not affected by the sorting step and solving the 2 sum problem without using a hash map is by far more efficient in terms of cache usage. Second, using a sorting array allows to skip duplicates on the fly without using additional data structures (i.e. hash set). The overall time complexity is O(n<sup>2</sup>) with O(1) space complexity.

```cpp

   void twoSum(vector<int> const& nums, int left, int target, vector<vector<int>>& ans) {
        
        int right = nums.size()-1;
        
        while (left < right) {            
            int sum = nums[left] + nums[right];
            if (sum == target) {
                ans.emplace_back(initializer_list({-target, nums[left++], nums[right--]}));
                while (left < right && nums[left-1] == nums[left]) ++left; //skip duplicates
                while (left < right && nums[right+1] == nums[right]) --right; //skip duplicates
            }
            else if (sum < target) ++left;
            else --right;  
        }
    }
    
    vector<vector<int>> threeSum(vector<int>& nums) {
        
        sort(nums.begin(), nums.end());
        
        vector<vector<int>> triplets;
        
        for (int i=0, iterations = (nums.size()-2); i<iterations; ++i) {
            //skip duplicates
            if(i == 0 || nums[i] != nums[i-1])
                twoSum(nums, i+1, -nums[i], triplets); //a+b+c=0 -> a+b=-c; nums[i] = c
        }
        
        return triplets;
    }

```

## 3Sum Variants

##3Sum Closest:## #Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target.#

The optimal solution is to sort the array, fix one element X at a time and reduce the problem to 2 sum finding the pair of numbers closest to -X. After each iteration of the 2sum problem the final result can be updated if a closest pair to -X has been found. The absoulte value shall be used in measuring the closest pair to -X.

##3Sum Smaller:## #Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.#

Fixed an integer X, the problem is reduced to find all the possible pairs of elements whose sum is less than -X. Once the array is sorted, the 2Sum step can be optimized taking into account that if the sum the numbers identified by the two pointers is less then -X, all the pai




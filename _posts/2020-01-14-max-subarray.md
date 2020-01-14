---
layout: post
title: "MaxSubarray"
categories:
  - Problems
tags:
  - Arrays
  
last_modified_at: 2020-01-11T09:55:59-05:00
---

# Problem definition

*Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.*

# Brute force solution

The brute force solution is to consider every possible subarray, calculate its sum and then take the maximum. Naively implemented this approach takes O(N<sup>3</sup>) time: O(N<sup>2</sup>) to generate all subarrays and O(N) to compute the sum of each subarray.

```cpp
int maxSubArray(vector<int>& nums) {

    int maxSum = numeric_limits<int>::min();

    for (int i = 0; i < nums.size(); ++i) {
        for (int j = i; j < nums.size(); ++j) {
            maxSum = max(maxSum, accumulate(begin(nums)+i, begin(nums)+j+1,0));
    	}
    }
    return maxSum;
}

```

A small improvement is to compute the partial sum starting at a given index i in order to obtain incrementally the sum of each subarray ending at index j with O(1) cost. This reduces the overall time complexity to O(N<sup>2</sup>)


```cpp
int maxSubArray(vector<int>& nums) {

    int maxSum = numeric_limits<int>::min();

    for (int i = 0; i < nums.size(); ++i) {
        int pSum = 0;
        for (int j = i; j < nums.size(); ++j) {
            pSum += nums[j]; 
            maxSum = max(maxSum, pSum);
        }
    }
    return maxSum;
}
```

# Divide et Conquer

After dividing the array into 2 equal sized subarrays, the max subarray is entirely contained in the left/right half ofthe array or it crosses both halves of the array. This observation naturally brings to the following approach:

* divide the array into 2 equal sized subarrays: the left half and the right half.
* calculate the max sum for the left and right subarray.
* calculate the max sum for a subarray including the mid element.
* get the maximum of the three sums computed in the steps above.

The cases where the subarray is entirely contained in the right or on the left half are smaller instances of the original problem. Therefore they can be solved recursively by calling the function to calculate the maximum sum subarray on both the halves of the array. The third case is not a smaller instance of the original problem, because it contains the constrint that the subarray must contain the mid element. The solution can be computed using two loops. The first iterates from the rightmost element of the left subarray (the mid element of the array) to its leftmost element, finding the maximum sum on the left side including its rightmost element. The second iterates from the leftmost element of the right subarray (the one after the mid element of the array) to its rightmost element, finding the maximum sum on the right side including its leftmost element. The maximum sums computed in the two loops are then added to get the max sum containing the mid element.

```cpp
int maxSubArraySumAcrossM(vector<int> const& nums, int l, int m, int r) { 

    //in case of all negative values the result
    //from the across function shall be not considered
    int maxLeft = numeric_limits<int>::min();

    for (int i = m, sum = 0; i >= l; --i) {
	sum += nums[i];
	maxLeft = max(sum, maxLeft);
    }

    int maxRight = numeric_limits<int>::min();

    for (int i = m+1, sum = 0; i <= r; ++i) {
	sum += nums[i];
	maxRight = max(sum, maxRight);
    }

    return maxLeft + maxRight;
}

int maxSubArraySum(vector<int> const& nums, int l, int r) {       

    if (l == r) return nums[l];

    int m = (l+r) / 2;

    //max in the left subarray, the right subarray and the subarray across m
    vector<int> maximums {maxSubArraySum(nums, l, m), 
			  maxSubArraySum(nums, m+1, r), 
			  maxSubArraySumAcrossM(nums, l, m, r)};

    return *max_element(maximums.begin(), maximums.end());
}

int maxSubArray(vector<int>& nums) {       
    return maxSubArraySum(nums, 0, nums.size()-1);
}
```

The time complexity of the divide and conquer approach is O(N<sup>logN</sup>)

# Kanade's algorithm

The Kanade's algorithm is based on the observation that the maximum sum of a subarray ending at a given index “i” can be computed obtained either adding the element at index “i” to the maximum sum of a subarray ending at index “i-1” or starting a new sum with the element at index “i”. So, the solution to the problem can be described using the following recursive formula: MS(i) = max[MS(i-1) + A[i] , A[i]] , where MS(i) is the maximum sum of a subarray ending at index i. The time complexity of this approach is O(N) and it is optimal.

```cpp
int maxSubArray(vector<int>& nums) {       
        
    if (nums.empty()) return 0;

    int maxSum = nums[0];
    int currentMaxSum = nums[0];

    for (int i = 1; i < nums.size(); ++i) {            
	currentMaxSum = max(nums[i], nums[i]+currentMaxSum);
	maxSum = max(maxSum, currentMaxSum);
    }

    return maxSum;
}

```

Two last remarks about Kanade's algorithm:

* it is not a dynamic programming algorithm because it exhibits optimal substructure (the current solution can be computed using the previous solutions) but not overlapping subproblems (every solution is computed only once)
* it is not a greedy algorithm because it makes locally optimal choices, but it can then discard the solution obtained with this choices to start a new (better) solution.

# Conclusion

All the C++ solutions for this problem are available in my [Github repository](https://github.com/feranco/Problems/tree/master/Arrays/MaxSubarray). 




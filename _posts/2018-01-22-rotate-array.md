---
layout: post
title: "Rotate array"
categories:
  - Data Structures
tags:
  - array
last_modified_at: 2017-11-14T10:55:59-05:00
---

The problem of left-rotate a 1d array is an example on how a simple problem can have many different possible solutions. The problem statement is very simple: rotate an N-elements array A by P position in a way that is both space and time efficient. A simple approach is to copy the first P element of A to a temporary array, move the remaining N-P element at the beginning of A and then copying the elements in the temporary array afterwards. Unfortunately, this approach is not space-efficient, since it requires O(P) extra space. Another simple approach is to implement a function that left shift all elements of A by one position and call this function N-times. The drawback of this approach is that it is not time efficient, since each function call requires O(n) time.

Instead of moving each element by one position, a better approach is to save A[0] in a temporary variable and find a permutation that moves A[P-1] in A[0], A[2P-1] in A[P-1] and so on, considering all indices modulo N. When an element should be moved from A[0] divide the array, the process stops and the element is moved from the temporary variable. If this permutation doesn't move all the elements, the process is repeated starting moving A[P-2] in A[1] and so on until all elements are moved. The trick to implement this approach is to understand that the number of permutations necessary to rotate the array corresponds to the Greatest Common Divisor of N and P. Indeed each permutation move elements incrementing by P and stops when it gets back to the starting point, so the total span which is some multiple of n. That multiple is LCM(n, d). Thus the number of elements in that cycle is LCM(n, d) / d. The total number of such cycles is n / (LCM(n, d) / d), which is equal to GCD(n, d).

where number of sets is equal to GCD of n and d and move the elements within sets.
If GCD is 1 as is for the above example array (n = 7 and d =2), then elements will be moved within one set only, we just start with temp = arr[0] and keep moving arr[I+d] to arr[I] and finally store temp at the right place.

Because the inner loop increments in steps of d, and stops when it gets back to the starting point, i.e. a total span which is some multiple of n. That multiple is LCM(n, d). Thus the number of elements in that cycle is LCM(n, d) / d. The total number of such cycles is n / (LCM(n, d) / d), which is equal to GCD(n, d).

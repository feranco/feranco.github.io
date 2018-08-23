---
layout: post
title: "Rotate array"
categories:
  - Algorithms
tags:
  - Array
last_modified_at: 2018-01-22T22:14:59-05:00
---

The problem of left-rotate an N-elements array A by P positions is an example on how a simple problem can have many different solutions. This post summarises some possible algorithms to solve this problem, sorting them in increasing order of space and time efficiency. 

## Base approach
A simple approach is to copy the first P element of A to a temporary array, move the remaining N-P element at the beginning of A and copy back the elements in the temporary array afterwards. Unfortunately, this approach is not space-efficient, since it requires O(P) extra space. Another simple approach is to implement a function that shift all elements of A by one position to the left and call this function N-times. The drawback of this approach is that it is not time efficient, since it requires O(n<sup>2</sup>) time (O(n) time for each function call).

## Mathematical approach
Instead of moving each element by one position, a better approach is to save A\[0\] in a temporary variable and find a permutation that moves A\[P\] in A\[0\], A\[2P\] in A\[P\] and so on, considering all indices modulo N. When an element should be moved from A\[0\], the process stops and the element is moved from the temporary variable. If this permutation doesn't move all the elements, the process is repeated starting moving A[P+1] in A[1] and so on until all elements are moved. The key to implement this approach is to understand that the number of permutations necessary to rotate the array corresponds to the Greatest Common Divisor of N and P. Indeed each permutation moves elements incrementing by P and stops when it gets back to the starting point. So the number of spans for each permutation is a specific multiple of N that corresponds to the Least Common Multiple of N and P and the number of movements in each permutation is LCM(N, P) / P. Therefore the total number of permutations is N / (LCM(N,P) / P), which is equal to GCD(N,P). The following C++ code is an implementation of this approach:

{% highlight cpp %} 
int gcd (int a, int b) {
  while (b) {
    int tmp = b;
    b = a % b;
    a = tmp;
  }
  return a;
}

template <typename T>
std::vector<T> rotate (std::vector<T> a, unsigned int p) {
  
  const unsigned int n = a.size();
  
  if (p >= n) p = p % n;

  int loops = gcd(n, p);

  for (size_t i = 0; i < loops; ++i) {
    size_t k = i; //destination index
    size_t j = (i + p) % n; //source index
    T tmp = a[k];
    while (j != i) {
      a[k] = a[j];
      k = (k + p) % n;
      j = (j + p) % n;
    }
    a[k] = tmp;
  }
  return a;
} 
{% endhighlight %}

The time complexity is O(n), since each element is moved exactly once. The space complexity is instead O(1) because the rotaton is performed in place.

## Divide et impera approach

Another different way to solve the problem is to use the divide et impera paradigma. The key of this approach is to note that the array A is composed by two segments *S1* and *S2*, where *S1* includes the first P elements of A. If *S1* and *S2* have the same size, the problem can be simply solved swapping the two segments. If the size of *S2* is greater than the one of *S1*, it is possible to split *S2* into two segments *S2<sup>\'</sup>* and *S2<sup>\'\'</sup>* where *S2<sup>\'\'</sup>* has size equal to *S1*. Swapping *S1* and *S2<sup>\'\'</sup>* generates a new array A*<sup>\'</sup> = \[*S2<sup>\'\'</sup>*,*S2<sup>\'</sup>*,*S1*\] that has *S1* in its proper place after rotation. The problem is now reduced to swap *S2<sup>\'\'</sup>* ans *S2<sup>\'</sup>*. Since this problem has the same form of the original one, it can be recursively solved according to the divide et impera paradigma. The following C++ code is an implementation of this approach:

{% highlight cpp %} 
template <typename T>
std::vector<T> rotate (std::vector<T> a, int l, int m, int r) {
  
  int sizeS1 = m-l+1, sizeS2 = r-m;
  
  // Base case
  if (sizeS1 == sizeS2) {
    size_t i = l, j = m+1;
    while (i <= m) {
      swap(a[i++],a[j++]);
    }
    return a;
  }
  
  if (sizeS1 < sizeS2) {
    // Swap S1 with the upper part of S2
    for (int i = 0; i < sizeS1; ++i) {
        std::swap(a[m--],a[r--]);
    }
    return rotate (a, l, l+sizeS1-1, r);
  }
  else {
    // Swap S2 with the lower part of S1
    for (int i = 0; i < sizeS2; ++i) {
        std::swap(a[l++],a[++m]);
    }
    return rotate(a, l, r-sizeS2, r);
  }
}

template <typename T>
std::vector<T> rotate (std::vector<T> a, unsigned int p) {
  return rotate(a, 0, p-1, a.size()-1);
}
  
{% endhighlight %}

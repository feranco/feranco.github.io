---
layout: post
title: Counting sort
categories:
  - Algorithms
tags:
  - Sorting
last_modified_at: 2018-03-26T23:55:59-05:00
---

While all comparison-based algorithms have a time complexity of O(nlogn), there are other algorithms that an run in linear time provided 
that some assumptions about the input are verified. Counting sort is an algorithm that has a time complexity of O(n), assuming that that 
each of the n input elements is an integer in the range 0 to k or has an integer key in that range. Counting sort uses two temporary arrays:
* an integer array of size k, specifying
and a temporary array, where to insert the sorted elements.  is composed by three steps.
The first fill the array of size k 

computes, for each input element x, the number of elements equal to x. The second 

less than x. It uses this information to place element x directly into its position in the output array. F
or example, if 17 elements are less than x, then x belongs in output position 18. We must modify this scheme slightly to handle the
situation in which several elements have the same value, since we do not want to put them all in the same position.

An important property of counting sort is that it is stable: numbers with the same value appear in the output array in the same order 
as they do in the input array.

{% highlight cpp %} 

#include <iostream>
#include <utility>
#include <vector>

using namespace std;

template <typename T>
void countingSort (vector<T>* a_ptr, const vector<int>& keys, int k) {

  vector<T>& a = *a_ptr;
  vector<int> counter(k);
  
  // initialize so that counter[i] corresponds to the number of entries with key equal to i 
  for (const auto& key : keys) {
    counter[key]++;
  }

  // update so that counter[i] corresponds to the number of entries with key less or equal to i 
  for (int i = 1; i < k; ++i) {
    counter[i] += counter[i-1];
  }

  vector<T> b(a.size());

  // use counter to insert element in b sorted (reverse iterator guarantee stable sorting) 
  for (auto it = a.crbegin(); it != a.crend(); ++it) {
        b[--counter[it->first]] = *it; 
  }

  // copy b to a
  a = b;
}

{% endhighlight %}  

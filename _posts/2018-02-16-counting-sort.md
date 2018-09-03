---
layout: post
title: Counting sort
categories:
  - Algorithms
tags:
  - Sorting
last_modified_at: 2018-03-26T23:55:59-05:00
---

While all comparison-based algorithms have a time complexity of O(nlog<sub>n</sub>), there are other algorithms running in linear time provided that some assumptions about the input are verified. Counting sort is an algorithm that has a time complexity of O(n), assuming that each of the n input elements is an integer in the range 0 to k or has an integer key in that range. Counting sort uses two temporary arrays:
* an integer array of size k specifying, for each element x, the number of input elements with key less or equal to x;
* an array of size n, where to insert the sorted elements.  

Basically, the counting sort is composed by three cycles. The first iterates through the keys of the input array and fills the temporary array of size k so that it specifies, for each element x, the number of elements equal to x. Considering the role played by this temporary array, in the following we can refer to it as the **counter** array. The second iterates through the counter array, updating it so that each element represents the number of input elements with key less or equal to x. The third iterates through the input array using the information in the counter array to place each element x directly into its position in the temporary output array of size n. For example, if 5 elements are less or equal than x, then x belongs in output position 5. The number of elements less or equal than x in the counter array is then decreased in order to handle the situation in which more input elements have the same key. At the end of this step the output array contains all the sorted input elements and it is copied back to the input array. An important property of counting sort is that it is **stable**: numbers with the same value appear in the output array in the same order as they do in the input array.

{% highlight cpp %} 

#include <utility>
#include <vector>

using std::vector;

template <typename T>
vector<T> countingSort (vector<T>* a_ptr, const vector<int>& keys, int k) {

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

  return b;
}

{% endhighlight %}  

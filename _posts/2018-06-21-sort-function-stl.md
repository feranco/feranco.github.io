---
layout: post
title: Sort function in C++ STL
categories:
  - Programming
tags:
  - C++
  - Sorting
last_modified_at: 2018-06-20T11:19:59-05:00
---

The sort() function declared in <algorithm> can be a very useful tool to sort primitive arrays or containers supporting random-access iterators like std::array, std::vectors and std::deque. The function has the following prototypes: 
  
% highlight cpp %  
  template <class RandomAccessIterator>
  void sort ( RandomAccessIterator first, RandomAccessIterator last );

  template <class RandomAccessIterator, class Compare>
  void sort ( RandomAccessIterator first, RandomAccessIterator last, Compare comp );
% endhighlight %  

The first two parameters define the range to sort as [first,Last) meaning that it includes the element pointed by the first but it doesn’t include the element pointed by last. The third parameter is optional and it is used to customize how the sort is performed. 

It is a function taking two elements in the range as arguments and returning a value convertible to bool that indicates whether the element passed as first argument is considered to preceed the second in the specific strict weak ordering it defines.


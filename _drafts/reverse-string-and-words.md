---
layout: post
title: Reverse a string and reverse words in a string
categories:
  - Problems
tags:
  - Strings
last_modified_at: 2018-05-25T09:55:59-05:00
---

# Reverse a string: problem definition

Write a function that takes a string and reverses its letters in place.

# Solution

As many other problems involving strings, reversing a string has a simple brute-force
solution that use O(n) space. In this case, it's enough to iterate the input
string backwards inserting each character into a new string that is returned at
the end of the function. To reverse a string in place, it's necessary to use two
pointers to find pairs of characters to swap: the first pointer starts from the
beginning of the string and it's increased at each step, while the second
pointer starts from the last character of the string and it's decreased at each
step. The implementation is straightforward:

```cpp
void reverse(string& str)
{
  if (str.empty()) return;

  size_t i = 0, j = str.size()-1;

  while (i < j) swap(str[i++], str[j--]);
}
```

There are a couple of things that it's worth to observe. The first is that the
while cycle can be easily replaced by a for loop allowing to compute the j
pointer directly from i, rather than having to actually iterate over it separately.

```cpp
size_t strSize = str.size();
for(size_t i = 0; i < strSize; ++i) swap(str[i], str[strSize-i-1]);
```

The second is that in some languages like Python or Java, the strings are
immutable and it's necessary to make special assumption to solve this
problem. For example in Python it's necessary to assume that the string has been
already converted to a list of characters.

```python
def reverse(listOfChars):

  i = 0
  j = len(listOfChars)-1;

  while i < j :
      listOfChars[i], listOfChars[j] = listOfChars[j], listOfChars[i]
      i = i+1
      j = j-1

pass
```
# Reverse words in a string: problem definition

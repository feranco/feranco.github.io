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

Write a function that takes a string and reverses the order of its words in
place, assuming that all words are separated by one space.

# Solution

Also in this case there is simple solution using O(n) time and O(n) additional space:
* allocate a new result string with the same size of the input one to store in it the
string with reversed words;
* use two pointers to find the first and last character of each word;
* copy each word in the reversed position in the result string.

```cpp
string reverseWords(const string& message)
{
    if (message.empty()) return;
    size_t strSize = message.size();
    string result(strSize, ' ');

    // message[i..j] forms a word
    size_t i = 0, j = message.find_first_of(' ', i);

    while (j != string::npos) {
        for (size_t k = i; k < j; ++k) {
            // result[strSize-j] is the start of the word in the reversed string
            result[strSize - j + k - i] = message[k];
        }
        i = j+1;
        j = message.find_first_of(' ', i);
    }

    //the start of the word in the reversed string is 0
    for (size_t k = i; k < strSize; ++k) result[k - i] = message[k];

    return result;
  }
```

An alternative would be to extract each word as substring, push it on a stack
and then pop back all the substring writing them in the result string. Also in
this case the space complexity would be O(n) because of the stack.

The key observation to improve the space complexity is that the reversed string
can be obtained reversing the whole input message and then reversing each
individual word. Since a string can be reversed in place with O(1) auxiliary
space, the overall algorithm requires constant space. The time complexity is
linear because the algorithm only perform two iterations on the original string.

```cpp

void reverseString(string& message, size_t start, size_t end){
    while (start < end) swap(message[start++], message[end--]);
}

void reverseWords(string& message)
{
    if (message.empty()) return;

    reverseString(message, 0, message.size()-1);

    // message[i..j] forms a word
    size_t i = 0, j = message.find_first_of(' ', i);

    while (j != string::npos) {
        reverseString(message, i, j-1);
        i = j+1;
        j = message.find_first_of(' ', i);
    }
    reverseString(message, i, message.size()-1);
}
```

The code with all the
test cases is available on my [Github repository](https://github.com/feranco/Problems/tree/master/Strings/ReverseWords).

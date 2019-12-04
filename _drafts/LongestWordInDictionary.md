---
layout: post
title: "Longest Word In Dictionary"
categories:
  - Problems
tags:
  - Strings
  - HashTables
  - Tries
last_modified_at: 2019-01-25T09:55:59-05:00
---

# Problem definition

*Given a list of strings words representing an english dictionary, find the longest word that can be built one character at a time by other words in the dictionary. If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.*

There are a number of different possible approaches to solve this question, giving a good example of why careful analysis for Big-O performance is often very important.

# Brute force solution

The brute force solution is to iterate over all the words in the dictionary, generate all prefixes of each word and check if they are in the dictionary. Every time all the prefixes of a word are in the dictionary, the result can be updated if the word size is bigger than the previous longest word or if it is equal and the word has a smallest lexicographical order. Naifly implemented, the time complexity of this approach is O(n<sup>2</sup>) and the space complexity is O(n).
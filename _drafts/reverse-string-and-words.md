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
solution that use O(n) space. In this case it's enough to iterate the input
string backwards inserting each character into a new string that is returned at
the end of the function.

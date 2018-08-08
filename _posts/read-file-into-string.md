---
layout: post
title: How to read a file into a string
categories:
  - Programming
tags:
  - C++
last_modified_at: 2018-06-16T09:55:59-05:00
---

Scripting languages like Perl allows to read a file into a variable in one shot. This is possible also in C++ using the istreambuf_iterator
class. 

#define what is a 

The following code snapshot initialize a string directly with the file content using the constructor:

std::ifstream ifs("file.txt");
std::string content(std::istreambuf_iterator<char>{ifs}, std::istreambuf_iterator<char>{});

http://insanecoding.blogspot.com/2011/11/how-to-read-in-file-in-c.html
https://stackoverflow.com/questions/2602013/read-whole-ascii-file-into-c-stdstring
https://stackoverflow.com/questions/2912520/read-file-contents-into-a-string-in-c

---
layout: post
title: String to number conversion in C++
categories:
  - Programming
tags:
  - C++
last_modified_at: 2018-06-20T11:19:59-05:00
---

Convert a string to an number is a quite common task in C++. This post summarizes the most common techniques to accomplish this task.

##String to number conversion

The first method is to construct an input stringstream initialized with the string to be converted and then reading the value into a variable using the >> operator. 

template <class T> T stringToNum (string s) {
   T value;
   istringstream is(s);
   //set number to 0 if an error occur
   return (is >> value) ? value : 0;
}
  
The second method is to use one of the functions stoi, stol, stoll that converts from a string to an integral types or one of the functions
stof, stod, stold that converts from a string to a floating-point values.These functions are declared in <string>.

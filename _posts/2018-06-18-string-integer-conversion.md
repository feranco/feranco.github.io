2---
layout: post
title: String to integer conversion in C++
categories:
  - Programming
tags:
  - C++
last_modified_at: 2018-06-20T11:19:59-05:00
---

Convert a string to an integer is a quite common task in C++. This post summarizes the most common techniques to accomplish this task.

##String to integer conversion

The first method is to construct an input stringstream initialized with the string to be converted and then redirect this stream to an integer variable using the >> operator. 

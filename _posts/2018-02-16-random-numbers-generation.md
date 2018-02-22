---
layout: post
title: Random Number Generation in C++
categories:
  - Programming
tags:
  - C++
last_modified_at: 2018-02-14T09:55:59-05:00
---

The production of random numbers has always been important for computers applications. Neverthless, the C++ STL has historically provided rather limited support, all of it adopted from the C standard library.

* RAND_MAX, a macro that expands to an integer constant;
* std::rand(), a function that produces a pseudo-random number in the closed interval [0, RAND_MAX];
* std::srand(), a function to initialize (seed) a new sequence of such numbers.

The random functions introduced with C++11 improved enormously the way to generate random numbers in c++. Unfortunatly, the procedure and the code needed to perform such task is not straightforward and require a little bit of knowledge. The generation of random numbers involve two different objects: 

* an engine returning unpredictable numbers, so that for each bit the likelihood of getting 0 is always the same as the likelihood of getting a 1;

* a distribution 

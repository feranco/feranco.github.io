---
layout: post
title: Disjoint Set Union
categories:
  - Data Structures
tags:
  - Graph
last_modified_at: 2020-05-10T09:55:59-05:00
---

The Disjoint Set Union (DSU) data structure is extremely helpful in solving problems where it is required to track the connectivity of elements belonging to a specific subset and to connect different subsets with each other.

The data structure provides the following operations:
* MakeSet(v): creates a new subset consisting of an element v
* Union(v, w): merges the subsets in which the elements v and w are located 
* Find(v, d): determines if the elements v and w are located in the same subset

# Data Representation

The first step to implement the DSU is to define a way to represent the subsets. The most common way is to represent the subsets in the form of trees, using the root of the tree as representative element of the set. In place of using the classical tree representation with nodes and link to child nodes, it is convenient to represent such trees using an array **Parents**. Every element of the array corresponds to an element of a subset and contains the index of its parent in the subset tree. A special case is the root of the tree which contains its own index. At the beginning, before any Union operation has been performed, every element is the root of its own subset.

# Naive Implementations: quick find

The easiest implementation of the DSU assumes that two elements belong to the same set only if they have the same parent. This brings to the following implementation:
* MakeSet(v): assign the index v to parents[v]
* Union(v, w): replace all elements with value parents[v] with the value parents[w]
* Find(v, w): check if v and w have the same parent

the disjoint-set-union, can reduce the execution time of an algorithm


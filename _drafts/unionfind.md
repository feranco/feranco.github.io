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

The first step to implement the DSU is to define a way to represent the subsets. The most common way is to represent the subsets in the form of trees, using the root of the tree as representative element of the set. Instead of using the classical tree representation with nodes and link to child nodes, it is convenient to represent such trees using arrays. Without loss of generality we can assume that every element of a set  an array **Parents**. Every element of the array corresponds to an element of a subset and contains the index of its parent in the subset tree. A special case is the root of the tree which contains its own index. At the beginning, before any Union operation has been performed, every element is the root of its own subset.

# Naive Implementations: quick find and quick union

The easiest implementation of the DSU assumes that two elements belong to the same set only if they have the same parent. This leads to the following implementation:
* MakeSet(v): assign the index v to parents[v]
* Union(v, w): assign parents[w] as parent to all elements having parents[v] 
* Find(v, w): check if v and w have the same parent

This implementation is also known as quick find since the Find operation (and the MakeSet) is performed in constant time. The Union operation takes instead linear time since every time the entire parents array is traversed.

An alternative implementation of the DSU assumes that two elements belong to the same set only if they have the same root. This leads to the following implementation: 
* MakeSet(v): assign the index v to parents[v] as before
* Union(v, w): assign root[w] as parent to root[v]
* Find(v, w): check if v and w have the same root

Both the Union and the Find operation require a FindRoot operation to retrieve the roots of the given elements. This operation takes in the worst case linear time because it requires to visit all the ancestors of the given element until the root has not been reached. This implementation is also known as quick union since on average the union operation takes less than the one in the quick find (not always the entire parents array needs to be traversed).

# Weighted Union

The Union operation of the quick union always attach the root of the tree of the first element to the root of the tree of the second one. The Weighted Union implementation of the DSU modifies the Union operation so that the root of the tree having less elements is always attached to the root of the tree having more elements.

the disjoint-set-union, can reduce the execution time of an algorithm


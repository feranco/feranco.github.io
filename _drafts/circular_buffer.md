---
layout: post
title: Ring Buffers
categories:
  - Data Structures
tags:
  - C++
last_modified_at: 2018-05-25T09:55:59-05:00
---

Ring buffers (also known as circular buffers) are fixed-size buffers that work
as if the memory is contiguous and circular. The data inside the ring buffer are
delimited by two pointers that are adjusted when a new data is generated or an
existing data is consumed. In particular the tail pointer advances when a new
data is added and the head pointer advances when an old data is consumed. If one
of the pointers reach the end of the buffer, it wrap around to the
beginning. Ring buffers are often used as fixed-sized queues in embedded systems
in embedded systems, where static data storage methods are preferred, or in
situations where data are generated and consumed at different rates, so that the
most recent data are always consumed.

This post presents a Ring Buffer implemented with C++ template. The data structure provides API to put
elements into the buffer and get elements from the buffer, to know if the buffer
is full or empty and to know the size and capacity of the buffer. The
implementation has the following features:

* the data structure is move copyable and assignable;
* only used elements are instantiated, using the placement new operator;
*

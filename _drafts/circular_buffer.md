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
of the pointers reach the end of the buffer, it wrap around to the beginning.

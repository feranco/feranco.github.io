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
* the memory is managed through the std::unique_ptr smart pointer to make easier
  the destructor and the move operators definition;
* the data structure is thread-safe through the use of the std::mutex type.

# Construction and Destruction

The constructor allocates the raw memory for the Ring Buffer and sets the buffer
capacity. The array version std::unique_ptr<T[]> of the smart pointer is used in
order to make it possible the use of the [] operator to access the elements
stored in the buffer. The placement new operator allocates the memory necessary
to store a number of elements equal to the buffer capacity. Actually, the
allocated memory is one slot more than the requested capacity in order to detect
the full/empty states of the buffer with the head/tail pointers, without any
additional logic and member variables.

```cpp
RingBuffer(size_t size) :
      mCapacity(size+1),
      mData(std::unique_ptr<T[]>(static_cast<T*>(operator new (((size+1)*sizeof(T))))))
{

}
```
Not sure about the distructor. Try implement a int wrapper with a distructor
that print and see what happen with and without the code below.

```cpp
~RingBuffer()
  {
    if (mData != nullptr)
    {
      // Destroy all elements in buffer
      for (std::size_t i = mHead; i != mTail; i = (i + 1) % mCapacity)
      {
        mData[i].~T();
      }
    }
  }
```

# Full and Empty states

The head pointer is used to identify the slot with the older element in the buffer, while the
tail pointer is used to identify the slot where to store the next produced
element. According to this, the empty state is detected checking the equality
between the head and tail pointers, while the full state is detected checking that
increasing the tail pointer (modulo the capacity) make it equal to the head pointer.

```cpp
bool empty() const
{
    //if head and tail are equal the container is empty
    return (mHead == mTail);
}

bool full() const
{
    //If tail is ahead the head by 1 the container is full
    return (mHead == ((mTail+1)%mCapacity));
}
```

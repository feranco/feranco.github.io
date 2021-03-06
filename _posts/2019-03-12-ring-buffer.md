---
layout: post
title: Ring Buffers
categories:
  - Data Structures
tags:
  - C++
  - Data Structures
last_modified_at: 2019-03-12T08:55:59-05:00
---

Ring buffers (also known as circular buffers) are fixed-size buffers that works
as if the memory is contiguous and circular. The data inside the ring buffer are
delimited by two pointers that are adjusted when a new data is generated or an
existing data is consumed. In particular the tail pointer advances when a new
data is added and the head pointer advances when an old data is consumed. If one
of the pointers reach the end of the buffer, it wrap around to the
beginning. Ring buffers are often used as fixed-sized queues in embedded
systems, where static data storage methods are preferred, or in situations where
data are generated and consumed at different rates, so that the most recent data are always consumed.

This post presents a Ring Buffer implemented with C++ template. The data structure provides API to put
elements into the buffer and get elements from the buffer, to know if the buffer
is full or empty and to know the size and capacity of the buffer.

```cpp
template <class T>
class RingBuffer {

  using DataPtr = std::unique_ptr<T[], std::function<void(T*)>>;

 public:

  RingBuffer(size_t size);
  ~RingBuffer();

  RingBuffer(const RingBuffer& src);
  RingBuffer& operator= (const RingBuffer& rhs);

  RingBuffer(RingBuffer&& rhs);
  RingBuffer& operator =(RingBuffer&& rhs);

  bool empty() const;
  bool full() const;

  void put(const T& item);
  T get();

  size_t capacity() const;
  size_t size() const;

 private:
  std::mutex mMutex;
  size_t mHead = 0;
  size_t mTail = 0;
  size_t mCapacity;
  std::function<void(T*)> deleter = [](T *m){ operator delete(m);};
  DataPtr mData;
};
```

The implementation has the following features:

* the data structure is move copyable and assignable;
* only used elements are instantiated, using the placement new operator;
* the memory is managed through the std::unique_ptr smart pointer to make easier
  the destructor and the move operators definition;
* the data structure is thread-safe through the use of the std::mutex type.

# Construction and Destruction

The constructor allocates the raw memory for the Ring Buffer using the operator
new and sets the buffer capacity.  The new operator allocates the memory necessary
to store a number of elements equal to the buffer capacity. Actually, the
allocated memory is one slot more than the requested capacity in order to detect
the full/empty states of the buffer with the head/tail pointers, without any
additional logic and member variables.

```cpp
 RingBuffer(size_t size) :
      mCapacity(size+1),
      mData(static_cast<T*>(operator new ((size+1)*sizeof(T))), deleter)
{

}
```
Since the element are instantiated using placement new, every element remaining in
the buffer is manually destroyed calling its destructor. This is quite
interesting, because the use of placement new it-s probably one of the few cases
where it makes sense to calling the destructor explicitly.

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

The raw memory for the ring buffer is implicitly deallocated by the
std::unique_ptr smart pointer that invokes the deleter function specified as
argument. The use of a custom deleter function it`s necessary because the smart
pointer holds an array of elements of type T, while the constructor allocated
raw memory. Without the custom deleter, the smart pointer would have tried to
call delete[ ] on such arrays causing an undefined behavior.

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

# Size and Capacity

The size of the Ring Buffer corresponds to the number of stored elements, while
its capacity corresponds to the maximum number of elements that can be stored.

```cpp
  size_t capacity() const
  {
    return mCapacity;
  }

  size_t size() const
  {
    return (mTail >= mHead) ? (mTail - mHead) : (mCapacity - mHead + mTail);

  }
```

# Insert and Remove elements

Adding and removing elements from the ring buffer requires to modify the head and
tail pointers. A new element is inserted at the current tail location, advancing
then the tail by one (modulo the buffer capacity). If the buffer is full, it is
also necessary to advance the head property in order to preserve the conditions
used to verify the empty and full states. When removing an element, the element
at the current head location is returned, advancing then the head by one (modulo the buffer capacity).
If the buffer is empty, an empty value is returned.

```cpp
void put(const T& item)
{
    std::lock_guard<std::mutex> lock(mMutex);
    if (full()) mHead = (mHead+1) % mCapacity;
    new(mData.get() + mTail) T(item);
    mTail = (mTail+1) % mCapacity;
}

T get()
{
    std::lock_guard<std::mutex> lock(mMutex);

    if(empty())
    {
        return T();
    }

    //Read mData and advance the head
    auto ret = mData[mHead];
    mData[mHead].~T();
    mHead = (mHead+1) % mCapacity;
    return ret;
}
```

# Conclusion

The complete Ring Buffer implementation can be found in my [Github
repository](https://github.com/feranco/data-structures/tree/master/circular_buffer)
and is tested using the Google C++ test framework.

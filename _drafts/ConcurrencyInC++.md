---
layout: post
title: "Concurrency in C++"
categories:
  - Programming
tags:
  - C++
  - Threads
  
last_modified_at: 2020-01-14T09:55:59-05:00
---

This post is a summary of how multithreading and concurrency are managed in C++.

# Create Threads

Every C++ application has a default main thread represented by the main function. Additional threads can be created instantiating objects of the std::thread class. The prerequisite to create a thread is to include the <thread> header. When a thread is created, it usually takes as argument a callback function with the code that will be executed by the thread. The callback can be defined as function pointer, functor, or lambda function. Every instance of the thread class has an associated id. The id of a thread can be recovered through the std::thread::get_id() member function. The std::this_thread::get_id() function allows instead to get the id of the current thread.

```cpp
#include <iostream>
#include <thread>

void threadFunction()
{
	std::cout<<"thread function Executing"<<std::endl;
}

class ThreadFunctor
{
public:
	void operator()()
{

std::cout<<"Display Thread Executing"<<std::endl;

};

int main()  
{
    
    std::thread t1(threadFunction);
    for(int i = 0; i < 10000; i++);
        std::cout<<"Display From MainThread"<<std::endl;
    threadObj.join();    
    std::cout<<"Exit of Main function"<<std::endl;
    return 0;
}
```

# Run Threads

Once a thread has been created, it can be executed. There are two different ways to run a thread: std::thread::join() and std::thread::detach(). The join method synchronize the execution of the thread with the execution of the thread that calls the method. This means that the caller thread is blocked if its execution is completed, but the execution of joined thread is not completed yet. On the other side, the detach method decouple decouple the execution of the thread from the execution of the thread that calls the method. Both the caller and the detached thread can complete their execution without blocking each other.
---
layout: post
title: "Concurrency in C++"
categories:
  - Programming
tags:
  - C++
  - Threads
  
last_modified_at: 2020-01-24T21:55:59-05:00
---

This post is a summary of how multithreading and concurrency are managed in C++.

# Create and Run Threads

Every C++ application has a default main thread represented by the main function. Additional threads can be created instantiating objects of the std::thread class. The prerequisite to create a thread is to include the <thread> header. When a thread is created, it usually takes as argument a callback function with the code that will be executed by the thread. The execution of the thread starts just after its creation. The callback can be defined as function pointer, functor, or lambda function. Every instance of the thread class has an associated id. The id of a thread can be recovered through the std::thread::get_id() member function. The std::this_thread::get_id() function allows instead to get the id of the current thread.

New Thread will start just after the creation of new object and will execute the passed callback in parallel to thread that has started it.

```cpp
#include <iostream>
#include <thread>
#include <mutex>

std::mutex mtx;

void threadFunction()
{
    std::lock_guard<std::mutex> lck (mtx);
    std::cout << "Thread function executing id " << std::this_thread::get_id() << std::endl;
}

class ThreadFunctor
{
public:
    void operator()()
    {
        std::lock_guard<std::mutex> lck (mtx);
        std::cout << "Thread functor executing" << std::endl;
    }
};

int main()
{
    ThreadFunctor f;
    std::thread t1(threadFunction);
    std::cout << "Startin thread function with id " << t1.get_id() << std::endl;
    t1.join();
    std::thread t2(f);
    t2.join();
    std::thread t3([]{
        std::lock_guard<std::mutex> lck (mtx);
        std::cout << "Thread lambda executing"  << std::endl;
    });
    t3.join();
    std::cout << "Exit of Main function"<< std::endl;
    return 0;
}
```

# Handle Threads Lifetime

There are two different ways to handle the lifetime of a thread: std::thread::join() and std::thread::detach(). Here is the difference between the two methods:

* join synchronizes the execution of the thread with the execution of its creator. This guarantees that the creatoris blocked until the execution of the created thread is not completed yet. As a consequence, the thread can use all variables int scope of the creator.

* detach decouples the execution of the thread from the execution of its creator. Both the creator and the created thread can complete their execution without blocking each other. Due to this fact, it's safe to use in the created thread only global variables. Using variables from the creator scope brings to undefined behaviour. Also using objects with static duration (i.e. std::cout) brings to undefined behaviour when the main thread expires.


After calling join or detach, the std::thread instance has no longer a callback associated to it.  (default constructed) will cause the program to terminate.

It is important to always join or detach a std::thread instance with an associated callback, otherwise the std::thread destructor will terminate the program invoking the std::terminate exception. The same behaviour happen calling join or detach on a std::thread instance without an associated callback (i.e. a default constructed thread or a std::thread instance for which join or detach was already called). A strategy to prevent these undesidered terminations is to apply the RAII paradigma (Resource Acquisition is Initialization) creating a wrapper for std::thread that joins automatically at the end of its scope.

```cpp
#include <iostream>
#include <thread>

class ThreadWrapper
{
    std::thread mThread;
    
    public:
    
        ThreadWrapper (std::thread t): mThread(std::move(t))
        {
            if (!t.joinable()) throw std::logic_error("No associated thread");
        }
	
        ~ThreadWrapper()
        {
            mThread.join();
        }
};

int main()
{
    ThreadWrapper t(std::thread([]{std::cout << "Thread lambda executing"  << std::endl;}));
    std::cout<<"Exit of Main function"<< std::endl;
    return 0;
}
```

# Pass arguments to threads

It is possible to pass any number of arguments to the callback executed by a thread passing additional parameters to the std::thread constructor. By default, all the arguments are passed by value and copied into the thread's stack and any changes made by the thread to the arguments passed does not affect the original arguments. In order to pass an argument by reference, it is necessary to explicitely use the std::ref wrapper from the <functional> header.

```cpp
#include <iostream>
#include <thread>

int main()
{
    int y = 1;
    std::cout<<" Before Thread Starts y = " << y << std::endl;
    std::thread t1([](int& num){num++;}, std::ref(y));
    t1.join();
    std::cout<<" After Thread Joins y = " << y << std::endl;
    return 0;
}
```

In case the callback associated to the thread is a member function of a class, it is necessary to pass a reference to the class as first argument after the callback. Note that if multiple threads are accessing the member functions of the same object, it is necessary to protect the access to the shared resources of that object.


```cpp
#include <thread>
#include <iostream>

class Dummy
{
public:
  void DummyMethod()
  {
     std::cout << "Dummy method" << std::endl;
  }
};

int main()
{
  //Execute the LaunchTorpedo() method for a specific Torpedo object on a seperate thread
  Dummy dummy;
  std::thread t1(&Dummy::DummyMethod, &dummy);
  t1.join();

  return 0;
}
```

# Prevent Race Conditions using Atomics and Mutexes

A race condition is a situation where multiple concurrent threads can access shared data and try to change it at the same time. BecauseSince the scheduling algorithm can swap between threads at any time, it is not possible to uniquely determine the order in which the threads will attempt to access the shared data and the final state of those data.

In case of primitive data types (i.e. a bool or a integer counter), the most efficient way to prevent race conditions is to use std:atomic. Atomic types encapsulate values ensuring that access to them do not cause data races. A typical example is when multiple thread execute code incrementing a shared counter.

```cpp
#include <iostream>
#include <thread>
#include <vector>
#include <atomic>

class CounterWrapper
{
    std::atomic<int> mCounter;
    //int mCounter;
public:
    CounterWrapper() : mCounter(0){}
    int get() { return mCounter; }
    void add(int increment) { mCounter+=increment;}
};


int main()
{
  for(int k = 0; k < 1000; k++)
  {      
    CounterWrapper cnt;
    std::vector<std::thread> threads;
    for(int i = 0; i < 10; ++i) threads.push_back(std::thread(&CounterWrapper::add, &cnt, 10000));
    for(int i = 0; i < 10; i++) threads[i].join();

    if(cnt.get() != 100000) {
       std::cout << "Error at iteration = "<< k << " Counter = " << cnt.get() << std::endl;
    }
  }
  return 0;
}
```

Without using std::atomic, two threads could try to increment the mCounter variable in parallel giving an incorrect result. Indeed the single line of C++ code incrementing mCounter is actually converted into three machine commands: the first one load the mCounter value into a register, the second one increment the value in the register and the third one update the mCounter value. If one thread load the value before the other one update the value, only one increment will be applied. Atomic types prevent such situation executing the three machine commands as they were only one (the scheduler cannot interrupt these sequence of commands).

A more generic way to fix race conditions is to use mutexes. A mutual exclusion object (or mutex) is an object that allows multiple threads to share the same data, without accessing the data simultaneously. Any thread that needs the data must lock the mutex before using the data in order to prevent other threads from accessing the data. The mutex is set to unlock when the data is no longer needed, so that other threads can access the data. The section of code including the shared data and protected by the mutex is known as critical section. 

```cpp
#include <vector>
#include <mutex>

class CounterWrapper
{
    int mCounter;
    std::mutex mMutex;
public:
    CounterWrapper() : mCounter(0){}
    int get() { return mCounter; }
    void add(int increment) { 
            mMutex.lock();
            mCounter += increment;
            mMutex.unlock();
        }
};


int main()
{
  for(int k = 0; k < 1000; k++)
  {      
    CounterWrapper cnt;
    std::vector<std::thread> threads;
    for(int i = 0; i < 10; ++i) threads.push_back(std::thread(&CounterWrapper::add, &cnt, 10000));
    for(int i = 0; i < 10; i++) threads[i].join();

    if(cnt.get() != 100000) {
       std::cout << "Error at iteration = "<< k << " Counter = " << cnt.get() << std::endl;
    }
  }
  return 0;
}

```

Instead of using a raw std::mutex a better option is to use std::lock_guard, which is a class template implementing the RAII idiom for mutex. It is essentially a wrapper for the raw std::mutex that locks the mutex in its constructor and unlock the mutex in its destructor.

```cpp
class CounterWrapper
{
    int mCounter;
    std::mutex mMutex;
public:
    CounterWrapper() : mCounter(0){}
    int get() { return mCounter; }
    void add(int increment) { 
            std::lock_guard<std::mutex> lockGuard(mMutex);
            mCounter += increment;
        }
};
```

C++17 introduced also std::scoped_lock that is an extension of std::lock_guard but it is able to manage multiple mutexes at the same time.

# Synchronize Threads using Condition Variables

Sometimes a thread A needs to wait that a particular condition occurs after a certain task has been completed by another thread B. A naive approach to achieve such synchronization is the "spin waiting" where a global variable is shared between the two threads. Thread A keeps on checking the value of this global variable in a loop until this is updated by thread B. Since the global variable is shared by the two threads it is necessary to use a mutex to prevent race condition in accessing the variable.

```cpp
#include<iostream>
#include<thread>
#include<mutex>
 
class Application
{
 std::mutex mMutex;
 bool mCondition = false;
public:
 void doSomething()
 {
     std::this_thread::sleep_for(std::chrono::milliseconds(1000));
     std::cout << "Do something " << std::endl;
     std::lock_guard<std::mutex> guard(mMutex);
     mCondition = true;
 }
 void mainTask()
 {
     mMutex.lock();
    
     while(mCondition != true)
     {
        mMutex.unlock();
        mMutex.lock();
     }
    
      mMutex.unlock();
      std::cout << "Do something else" << std::endl;
 }
};
 
int main()
{
      Application app; 
      std::thread t1(&Application::mainTask, &app);
      std::thread t2(&Application::doSomething, &app);
      t1.join();
      t2.join();
      return 0;
}
```

The main disadvantage of this approach is that thread A will keep on acquiring and release the lock just to check the value of the shared variable. Therefore thread A not only wastes CPU cycles, but also makes Thread B slow, because it needs to lock the same mutex to update the shared variable.

A better way to synchronize the two threads is to use a condition variable. A condition variable is a synchronization primitives enabling threads to wait until a condition occurs. Conceptually, a condition variable is a queue of threads where one or more threads can wait to get signaled that a certain condition has become true, while another thread signals this. A mutex is required along with condition variable to avoid the race condition where a thread checks if the condition has become true at the same time another thread wants to signal that the condition occurred. The combined use of locks and condition variables is called monitor. A monitor has the following workflow:

1. Thread A calls the wait method on condition variable, which internally acquires the mutex and checks if the required condition is met or not.
2. If the condition i not met, thread A releases the lock and waits on the condition variable to get signaled. Thread A gets blocked until then and doesn't require CPU cycles. 
3. Thread B signals the Condition Variable when the condition is met
4. Thread A resumes, acquires the mutex lock again and checks if the condition is actually met or if it is a spurious wake up. In case of a spurious wake up, thread A calls the wait method again. Otherwise it continue its execution.

A std::condition_variable has the following main methods:

* **wait(lock, condition)** It takes as argument the lock and the condition to be met and atomically performs the following operations: release lock, put the thread to sleep until a signal is received or a spurious wake up happen. When the thread wakes up again, it acquires again the lock before returning. Typically the lock is a *std::unique_lock* object which is a class template that wraps a raw mutex providing the lock/unlock functionality required by a condition variable.

* **notify_one()** It wake up only one of the threads waiting on the condition variable.

* **notify_all()** It wake up all the threads waiting on the condition variable.

```cpp
#include<iostream>
#include<thread>
#include<mutex>
#include<condition_variable>
 
class Application
{
 std::mutex mMutex;
 std::condition_variable mCondVar;
 bool mCondition = false;
public:
 void doSomething()
 {
     std::this_thread::sleep_for(std::chrono::milliseconds(1000));
     
     std::cout << "Do something " << std::endl;
     
     std::lock_guard<std::mutex> guard(mMutex);
     
     mCondition = true;
     
     mCondVar.notify_one();
 }
 void mainTask()
 {
     std::unique_lock<std::mutex> locker(mMutex);
     
     mCondVar.wait(locker, [this](){return mCondition;});
    
     std::cout << "Do something else" << std::endl;
     
     mCondVar.notify_one();
 }
};
 
int main()
{
      Application app; 
      std::thread t1(&Application::mainTask, &app);
      std::thread t2(&Application::doSomething, &app);
      t1.join();
      t2.join();
      return 0;
}

```

# Returning Values from Threads

The naive way the get values back from a thread is to pass a pointer (or a reference) to the expected value in the thread constructor. The creator of the thread can then wait for the value using a condition variable. When the created thread sets the value and signals the condition variable, the creator will wake up and fetch the data from the pointer.

A simpler solution that does not need any mutex or condition variable is to use two class templates:

* **std::future** stores the value that will be assigned in future by the created thread and provides a get() member function to access that value. If the thread's creator tries to access the value of the future before it is available, the get() function will block it until the value has ben set by the created thread.
* **std::promise** represents a promise to set the value in future. It provides a set_value() member function that is used by the created thread to set the value.

Each std::promise object has an associated std::future object with the same template parameter. The std::future object is generated by the get_future() member function of the std::promise object and will give the value once this has been set by the std::promise object.

```cpp
#include <thread>
#include <future>
#include <iostream>
 
void getInt(std::promise<int>* promInt)
{
    std::this_thread::sleep_for(std::chrono::seconds(1));    
    promInt->set_value(100);
}
     
int main()
{
    std::promise<int> promisedInt;
    std::future<int> futureInt = promisedInt.get_future();
    std::thread t1(getInt, &promisedInt);
    std::cout << futureInt.get() << std::endl;
    t1.join();
    return 0;
}
```
The described mechanism is absolutely generic and can be extended the the case where a thread needs to return multiple values at different points of time. The onlt thing to do ispass multiple std::promise objects to the created thread and fetch multiple return values from their associated multiple std::future objects.

# Packaged Task and Async

In addition to std::promise, there are two ways to associate a thread to a std::future object: std::packaged_task and std::async.

A std::packaged_task is a class template that wraps a callable element and transfers its result automatically to a std::future object, so that it can be retrieved asynchronously using the std::future get() method. Similarly to std::function, the template parameter of std::packaged_task is the signature of the function, while its constructor takes the function as an argument. Then the get_future() member function creates a future with the same template parameter as the return type of the function. The execution of a packaged_task object starts only when it is invoked in the same thread or it is moved to another thread.

```cpp
#include <iostream>
#include <thread>
#include <future>
#include <string>
 
int main()
{
    // Create two packaged_tasks that encapsulated a lambda function
    std::packaged_task<int (int)> taskSum([](int x){
        return x+1;
    });
	
     std::packaged_task<int (int)> taskSub([](int x){
        return x-1;
    });
 
    // Fetch the associated futures from packaged_tasks
    std::future<int> resultSum = taskSum.get_future();
    std::future<int> resultSub = taskSub.get_future();

    // Execute taskSub in a separated thread
    std::thread t1(std::move(taskSub), 1);
    t1.join();

    // Execute taskSum in the same thread
    taskSum(1);

    // Fetch the results frome the futures
    int dataSum =  resultSum.get();
    int dataSub =  resultSub.get();

    std::cout <<  dataSum << " " << dataSub << std::endl;
    return 0;
}
```

A std::async is a function template that takes a function as an argument and returns a std::future, so that the result of the function can be retrieved asynchronously using the std::future get() method. The future has the same template parameter as the return type of the function. The first argument in std::async is optional and allows to define the launch policy that controls how the passed function is executed. There are two different launch policies:
* **std::launch::async** guarantees an asynchronous execution of the passed function in a separate thread
* **std::launch::deferred** guarantees a lazy execution of the passed function in the same thread owning the std::future object (the execution starts only when the std::future get() method is called)
If no launch policy is specified, the behaviour is implementation dependent. Some implementations can decide to run the function asynchronously or not depending on the current system load.
The other std::async parameterss are the function to be executed and its input arguments. 

```cpp
#include <iostream>
#include <thread>
#include <future>
#include <string>
 
int main()
{
    // create and launch sum computation as a separate thread
    std::future<int> resultSum = std::async(std::launch::async, [](int x){
        return x+1;
    },1);

    // Fetch the results frome the futures
    int dataSum =  resultSum.get();

    std::cout <<  dataSum << std::endl;
    return 0;
}
```

Both std::asynch and std::packaged_task allows to wrap a function and possibly execute it in a separated thread. Moreover both std::asynch and std::packaged_task sets the function return value to the std::future only at the end of the function execution.  Anyway, a std::packaged_task can be considered as a lower level construct for implementing std::async: std::async wraps a std::packaged_task and possibly calls it in a different thread.

To summarize:
* the main advantage of std::packaged_task over std::async is to decouple the creation of the std::future from the execution of the function
* the main advantage of combining std::promise and std::future over both std::asynch and std::packaged_task is that they give more control over the std::future object. This because the std::promise can set the value to the std::future also at a different time than at the end of the function call.

# References 

* [ThisPointer](https://thispointer.com//c-11-multithreading-part-1-three-different-ways-to-create-threads/)
* [Jakascorner](http://jakascorner.com/blog/2016/03/promise-difference.html)
* [EliTheGreenPlace](https://eli.thegreenplace.net/2016/the-promises-and-challenges-of-stdasync-task-based-parallelism-in-c11/)
* [ACodersJourney](https://www.acodersjourney.com/top-20-cplusplus-multithreading-mistakes/)
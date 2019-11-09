---
layout: post
title: "Recursion Application: iteration"
categories:
  - Algorithms
tags:
  - Recursion
last_modified_at: 2018-04-04T10:00:00-05:00
---

The most straightforward application of recursion is to replace iteration using a recursive function instead of for/while loops. Such recursive functions allow to iterate over data structures, taking as parameter the index that would be used in a for loop. As an example, let's consider the following code printing a c++ vector:

```cpp
//forward iteration
void iterate (const std::vector& a, size_t idx) {

     if (idx == a.size()) return;
     std::cout << a[idx] << " ";
     iterate(a, idx+1);
}
```

It is worth to notice that the position of the recursive call determines the direction of the iteration. Indeed, the vector can be printed in reverse order by simply writing the recursive call before printing each element.

```cpp
//reverse iteration
void iterateBackward (const std::vector& a, size_t idx) {

     if (idx == a.size()) return;
     iterate(a, idx+1);
     std::cout << a[idx] << " ";
}
```

The use of recursion to iterate over a data structure is rarely useful and entails an extra price in terms of space complexity. Indeed the space complexity of an iterative function printing a vector is O(1), while the space complexity of the functions above is O(n) because of the function stack frame. An exception are some special cases where the use of recursion replaces the use of an explicit stack providing a more elegant solution. Let's consider a couple of examples. In the first one, the goal is to write a function traversing a single linked list in reverse order. The iterative solution traverses the list starting from the head, pushing each node in a stack. Once all nodes has been pushed, they can be visited in reverse order by simply popping them. Instead, the recursive solution traverses the list making recursive calls until the end of the list is reached (the base case). At this point, the control goes back to the previous calls that print the list in reverse order.

```cpp
template <typename T>
struct Node {
  Node(T data, Node<T>* next) : data(data), next(next){}
  T data;
  std::shared_ptr<Node<T>> next;
};

template <typename T>
void printListReversedIterative (std::shared_ptr<Node<T>> head) {

  std:: stack<T> data;

  while (head != nullptr) {
    data.push(head->data);
    head = head->next;
  }

  while (!data.empty()) {
    std::cout << data.top() << "\n";
    data.pop();
  }
}

template <typename T>
void printListReversedRecursive (const std::shared_ptr<Node<T>>& head) {

  if (head == nullptr) return;
  printListReversedRecursive(head->next);
  std::cout << head->data << "\n";
}
```

In the second example, the goal is to write a function inserting an element at the bottom of a stack. The iterative solution pops all the elements from the input stack, pushing them in an auxiliary stack. Once the input stack is empty, the new element is pushed into it. Finally all the elements in the auxiliary array are popped and pushed back into the input array. In recursive solution the auxiliary stack is replaced by the function stack frame. Once an element is popped from the input stack, the function makes a recursive call until the input stack is not empty (base case). When the stack is empty, the new element is inserted. At this point, every recursive call completes its execution pushing back into the stack the element previously popped.

```cpp
template <typename T>
void insertBottomIterative (std::stack<T>& stack, const T& data) {

  std::stack<T> auxStack;

  while (!stack.empty()) {
    auxStack.push(stack.top());
    stack.pop();
  }

  auxStack.push(data);

  while (!auxStack.empty()) {
    stack.push(auxStack.top());
    auxStack.pop();
  }
}

template <typename T>
void insertBottomRecursive (std::stack<T>& stack, const T& data) {

  if (stack.empty()) {
    stack.push(data);
    return;
  }

  T tmp = stack.top();
  stack.pop();

  insertBottomRecursive(stack, data);

  stack.push(tmp);
}
```

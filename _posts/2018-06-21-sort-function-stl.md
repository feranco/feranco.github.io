
The sort() function declared in <algorithm> can be a very useful tool to sort containers supporting random-access iterators like std::array, std::vectors and std::deque. The function can take up to three parameters:
  
* RandomAccessIterator first The first parameter is where you will be putting a iterator(Pointer) to the first element in the range that you want to sort. The sort will include the element that the iterator points to.

* myvector.end() ~ The second parameter is almost like the first but instead of putting a iterator to the first element to sort you will be putting a iterator to the last element. One very important difference is that the search won’t include the element that this iterator points to. It is [First,Last) meaning it includes the first parameter in the sort but it doesn’t include the second parameter in the sort.

* myCompFunction() Optional ~ I will only give a brief description here, because I will be explaining this parameter in more detail later. The third parameter is used to define how you do the search. For example if you have a struct that has 3 different variables in it, how does the function know which one to sort? Or how does it know how it should sort it? This is what this parameter is for. I will explain this more in a bit.

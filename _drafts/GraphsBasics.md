In DFS, you traverse each node exactly once. Therefore, the time complexity of DFS is at least O(V).

Now, any additional complexity comes from how you discover all the outgoing paths or edges for each node which, in turn, is dependent on the way your graph is implemented. If an edge leads you to a node that has already been traversed, you skip it and check the next. Typical DFS implementations use a hash table to maintain the list of traversed nodes so that you could find out if a node has been encountered before in O(1) time (constant time).

If your graph is implemented as an adjacency matrix (a V x V array), then, for each node, you have to traverse an entire row of length V in the matrix to discover all its outgoing edges. Please note that each row in an adjacency matrix corresponds to a node in the graph, and the said row stores information about edges stemming from the node. So, the complexity of DFS is O(V * V) = O(V^2).
If your graph is implemented using adjacency lists, wherein each node maintains a list of all its adjacent edges, then, for each node, you could discover all its neighbors by traversing its adjacency list just once in linear time. For a directed graph, the sum of the sizes of the adjacency lists of all the nodes is E (total number of edges). So, the complexity of DFS is O(V) + O(E) = O(V + E).
For an undirected graph, each edge will appear twice. Once in the adjacency list of either end of the edge. So, the overall complexity will be O(V) + O (2E) ~ O(V + E).
There are different other ways to implement a graph. You can reason the complexity accordingly.
I hope, the above explanation makes sense.

https://www.quora.com/Why-is-the-complexity-of-DFS-O-V+E

Time Complexity of DFS is not O( V+E).
Actually it depends on the data structure you are using to represent your graph.
For example, if you represent your graph using adjecency matrix in that case it would be O(V^2) .i.e independent from E. OR if you represent your graph using edge list then it would be O(VE) (why? Find out and tell me in comments)
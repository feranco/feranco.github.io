
Many applications require a dynamic set that supports only the dictionary opera- tions INSERT, SEARCH, and DELETE. A hash table is an effective data structure for implementing dictionaries. Although search- ing for an element in a hash table can take as long as searching for an element in a linked list—‚.n/ time in the worst case—in practice, hashing performs extremely well. Under reasonable assumptions, the average time to search for an element in a hash table is O(1).

# Direct Addressing


Direct addressing is a simple technique that works well when the number of keys N is reasonably small.

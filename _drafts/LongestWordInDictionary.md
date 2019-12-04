---
layout: post
title: "Longest Word In Dictionary"
categories:
  - Problems
tags:
  - Strings
  - HashTables
  - Tries
last_modified_at: 2019-01-25T09:55:59-05:00
---

# Problem definition

*Given a list of strings words representing an english dictionary, find the longest word that can be built one character at a time by other words in the dictionary. If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.*

There are a number of different possible approaches to solve this question, giving a good example of why careful analysis for Big-O performance is often very important.

# Brute force solution

The brute force solution is to iterate over all the words in the dictionary, generate all prefixes of each word and check if they are in the dictionary. Every time all the prefixes of a word are in the dictionary, the result can be updated if the word size is bigger than the previous longest word or if it is equal and the word has a smallest lexicographical order. Naifly implemented, the time complexity of this approach is O(n<sup>3</sup>), where n is the total number of characters in the dictionary over all words. Indeed generating all the possible prefixes of each word is O(n<sup>3</sup>) and comparing each prefix against all the words is O(n). The space complexity is O(1). A slight optimization is to represent the dictionary by a hash table, so that lookups are efficient. This brings the time complexity to O(n<sup>2</sup>) and the space complexity to O(n). Another improvments is to sort the list of word according to their size so that the algorithm can stop as soon as the first word having  all its prefixes in the dictionary is found. In terms of big-O notation the sorting step do ot modify the time and space complexity.


```cpp
string longestWord(vector<string>& words) {

    unordered_set<string> dict(words.begin(), words.end());
    sort(words.begin(), words.end(), [](string const& s1, string const& s2){
	if (s1.size() == s2.size()) return (s1.compare(s2) < 0);
	else return (s1.size() > s2.size());
    });

    for (string const& w1 : words) {           

	bool allPrefixFound = true;
	//check if all prefixes of w1 are in dictionary
	for (size_t len = 1; len < w1.size(); ++len) {                                    
	    if (dict.count(w1.substr(0,len)) == 0) {
		allPrefixFound = false;
		break;   
	    }
	}

	//update answer
	if (allPrefixFound) return w1;
    }
    return "";
}

```

# Trie solution

Since the problem requires to verify if all the prefixes of each word are contained in the dictionary, the Trie data structure can be used to get a better solution. Once all the word in the dictionary have been inserted in a Trie, DFS can be executed in order to find the longest word with all the prefixes. Both the time and space complexity of this approach are O(n).

```cpp
class Trie {
        
    static constexpr int SIZE = 'z'-'a'+1;

	struct TrieNode {
		array<unique_ptr<TrieNode>, SIZE> children;
		bool isEndWord = false;
		TrieNode() {}   
	};
   
	unique_ptr<TrieNode> root;

public:
	Trie (vector<string> const& words) {
		root = make_unique<TrieNode>();
        root->isEndWord = true;  //otherwise dfs stop at root
		for (string const& word : words) this->insert(word);		
	}
    
	void insert (string const& word) {

		TrieNode* node = root.get();
		for (char c : word) {
			if (node->children[c-'a'] == nullptr) {

				node->children[c-'a'] = make_unique<TrieNode>();
                        
			}
			node = node->children[c-'a'].get();
		}
        	  
		node->isEndWord = true;
	}
 
    //dfs with backtracking on current word
	void getLongestWord (unique_ptr<TrieNode> const& node, string& word, string& longestWord) {		
		
		if (node->isEndWord) {
			for (int i = 0; i < SIZE; ++i) {
				if (node->children[i]) {
					word.push_back('a' + i);
					getLongestWord(node->children[i], word, longestWord);
					word.pop_back();
				}
			}
            
			 if((word.size() > longestWord.size() ||
		        (word.size()==longestWord.size() && word.compare(longestWord) < 0))) {
			    longestWord = word;
		    	 }
		}	
	}
 
	string getLongestWord () {
		string longestWord, word;
		getLongestWord(root, word, longestWord);
        return longestWord;
	}  
};

string longestWord(vector<string>& words) {
    Trie t(words);
    return t.getLongestWord();
}
```

# Variant: Longest Word in Dictionary through Deleting

*Given a string and a dictionary, find the longest string in the dictionary that can be formed by deleting some characters of the given string. If there are more than one possible results, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.*

# Brute force
The brute force solution is to generate all the possible subsequences of the input string and check the longest that is contained in the dictionary. If the dictionary is represented with an hash set, the time complexity of this approach is O(2<sup>n</sup>) where n is the size of the input string. The space complexity is O(m) where m is the sum of the size of all words in the dictionary.
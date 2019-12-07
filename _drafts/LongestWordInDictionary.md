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

The brute force solution is to iterate over all the words in the dictionary, generate all prefixes of each word and check if they are in the dictionary. Every time all the prefixes of a word are in the dictionary, the result can be updated if the word size is bigger than the previous longest word or if it is equal and the word has a smallest lexicographical order. Naifly implemented, the time complexity of this approach is O(N<sup>3</sup>), where N is the total number of characters in the dictionary over all words. Indeed generating all the possible prefixes of each word is O(N<sup>3</sup>) and comparing each prefix against all the words is O(N). The space complexity is O(1). A slight optimization is to represent the dictionary by a hash table, so that lookups are efficient. This brings the time complexity to O(N<sup>2</sup>) and the space complexity to O(N). Another improvments is to sort the list of word according to their size so that the algorithm can stop as soon as the first word having all its prefixes in the dictionary is found. In terms of big-O notation the sorting step do not modify the time and space complexity.


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

Since the problem requires to verify if all the prefixes of each word are contained in the dictionary, the Trie data structure can be used to get a better solution. Once all the word in the dictionary have been inserted in a Trie, DFS can be executed in order to find the longest word with all the prefixes. Both the time and space complexity of this approach are O(N).

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
The brute force solution is to generate all the possible subsequences of the input string and check the longest that is contained in the dictionary. If the dictionary is represented with an hash set, the time complexity of this approach is O(2<sup>S</sup>) where S is the size of the input string. The space complexity is O(N) where N is the sum of the size of all words in the dictionary.

# Check all dictionary words using two pointers
A better solution is to check each dictionary word w against the input string s using a two pointers approach. The idea is to scan s from the beginning looking for w[0]. If w[0] is found, the algorithm continues scanning from that point for w[1], and so on, until either there are no more characters in S (w is not a subsequence), or all the characters of w are in s (w is a subsequence). This solution can be implemented either sorting or not the words in the dictionary according to their size so that the algorithm can stop as soon as the first word beeing a subsequence of s is found. In both cases the time complexity is O(N*S)) time, where N is equal to the sum of the size of all the words in the dictionary and S is the size of the input string. The cost of sorting the dictionary is equal to O(KWlogW) where K is the size of the longest string and W is the number of string in dictonary (the K factor comes from the comparisons between string during the sorting algorithm). The space complexity is O(1) space.

 ```cpp
string findLongestWord(string s, vector<string> const& d) {
        
    sort(d.begin(), d.end(), [](string const& s1, string const& s2){
	if (s1.size() == s2.size()) return (s1.compare(s2) < 0);
	else return s1.size() > s2.size();
     });

    for (string const& word : d) {
	size_t j = 0;
	for (size_t i = 0; i < s.size() && j < word.size(); ++i) {
	    if (s[i] == word[j]) ++j;
	}
	if (j == word.size()) return word;
    }
    return "";
}
```

# Improving with binary search
For each character c in each word w, the previous algorithm looks for the least index i in the input string s where s[i] == c, such that i is greater than some given index j (the index of the previously-matched letter). Instead of naively scan s for this index i, it is possible to preprocess s to find such indices much faster. The idea is to build a map each letter in s to a sorted list of indices where the letter occurs. Using this representation is it possible to find i using binary search. Since it is necessary a binary search for each word in the dictionary, the time complexity becomes O(S+Nlog(SIZE(S))), while the space complexity is O(S).

 ```cpp
string findLongestWord(string s, vector<string>& d) {
       
    string longestWord;
    vector<vector<int>> char2pos(26, vector<int>());
    for (int i = 0; i < s.size(); ++i) char2pos[s[i]-'a'].push_back(i);

    for (string const& word : d) {
	int prevIdx = -1;
	bool found = true;
	for (char c : word) {
	    auto const& cPos = char2pos[c-'a'];
	    auto it = upper_bound(cPos.cbegin(), cPos.cend(), prevIdx);
	    if (it != cPos.cend()) prevIdx = *it;                
	    else {
		found = false;
		break;
	    }
	}

	if (found && (word.size() > longestWord.size() ||
	   word.size() == longestWord.size() && word.compare(longestWord) < 0)) {
	   longestWord = word;
	}
    }
    return longestWord;
}
```

# Optimal solution
The binary search based approach uses a sparse representation in which each letter is mapped to their positions in the input string s. A better strategy is to use a dense representation in which each letter is associated to an array of size S defining for each position the next occurrence of the letter in s. Given the input string "cuppper", this mean that the letter p is associated to the array [2, 2, 3, 4, -1, -1, -1, -1] instead of [2, 3, 4]. Since each letter of each word in the dictionary can be now processed in constant time, the time complexity becomes O(S*A+N) where A is the size of the alphabet. The space complexity is instead O(S*A) that is totally acceptable for small alphabet like a-z.

 ```cpp
string findLongestWord(string s, vector<string>& d) {
       
        string longestWord;
        vector<vector<int>> char2pos(26, vector<int>(s.size(),-1));
        vector<int> counters(26,0);
        for (int i = 0; i < s.size(); ++i) {
            for (int j = counters[s[i]-'a']; j < i; ++j) {
                char2pos[s[i]-'a'][j] = i;
                counters[s[i]-'a'] = i;
            }
        }
       
        for (string const& word : d) {
            int prevIdx = -1;
            bool found = true;
            for (char c : word) {
                auto const& cPos = char2pos[c-'a'];
                auto it = upper_bound(cPos.cbegin(), cPos.cend(), prevIdx);
                if (it != cPos.cend()) prevIdx = *it;                
                else {
                    found = false;
                    break;
                }
            }
            
            if (found && (word.size() > longestWord.size() ||
               word.size() == longestWord.size() && word.compare(longestWord) < 0)) {
               longestWord = word;
            }
        }
        return longestWord;
    }
    
```

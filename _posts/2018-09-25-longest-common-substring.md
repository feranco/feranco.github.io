---
layout: post
title: Longest Common Substring
categories:
  - Problems
tags:
  - Dynamic Programming
  - String
last_modified_at: 2018-06-07T08:55:59-05:00
---

Problem definition: [Lintcode](https://www.lintcode.com/problem/longest-common-substring/?_from=ladder&&fromId=2).

Given two strings $A = \[a_{0}, a_{1}, ..., a_{n}\]$ and $B = \[b_{0}, b_{1}, ..., b_{n}\]$, find the longest common substring and return its length.

## Define the structure of an optimal solution
An optimal solution is represented by the longest common suffix for all pairs of prefixes of the strings. Defining 
- $A_{i} = \[a_{0}, a_{1}, ..., a_{i}\]$ a prefix of $A$;
- $B_{j} = \[b_{0}, b_{1}, ..., b_{j}\]$ a prefix of $B$; 
- $LCSuffix(A_{i},B_{j})$ a function retrieving the longest common suffix for the given prefixes;

the longest common substring of A and B is $\max_{0 \leq i \leq m, 0 \leq j \leq n}LCSuffix(A_{i},B_{j})$.  

## Recursively define the value of an optimal solution
The longest common suffix can be recursively computed according to the following formula:

$LCSuffix(A_{i},B_{j})$ = \begin{cases}
LCSuffix(A_{i+1},B_{j+1}) + 1,  & \text{if $a_{i} = b_{j}$} \\\
0, & \text{if $a_{i} \neq b_{j}$}
\end{cases}

Since the longest common suffix for a couple of prefixes ($A_{i}, B_{j}$) contains within the longest common suffix for longer prefixes $A_{i+1}, B_{j+1}$, the problem exhibits optimal substructure. Moreover the longest common substring computation has also overlapping subproblems, because the longest common suffix shall be computes for all pairs of prefixes. So a dynamic programming approach can be applied.

## Compute the value of an optimal solution 

The following c++ recursive program implements a **top-down with memoization** solution: 

{% highlight cpp %}
//Find the longest common suffix for the prefixes A[0,..,i] and B[0,...j]
int longestCommonSuffix(const string &A, const string &B, int i, int j, vector<vector<int>>& lcsCache) {

    //if one of the substring is empty the length is 0
    if (i == A.size() || j == B.size()) return 0;

    //the longest common substring was already found
    if (lcsCache[i][j] != -1) return lcsCache[i][j];

    //no common suffix for the input substrings
    if (A[i] != B[j]) return 0;

    //find the longest common suffix for the input substrings
    lcsCache[i][j] =  1 + longestCommonSuffix(A, B, i+1, j+1, lcsCache);
    return lcsCache[i][j];

}

int longestCommonSubstring(string &A, string &B) {

    vector<vector<int>> lcsCache(A.size(), vector<int>(B.size(),-1));

    int lcsLength = 0;

    for (int i = 0; i < A.size(); ++i) {
	for (int j = 0; j < B.size(); ++j) {
	    //the longest common substring is the longest suffix for each couple 
	    //of prefixes
	    lcsLength = max(lcsLength, longestCommonSuffix(A, B, i, j, lcsCache));
	}
    }
    return lcsLength;
}
{% endhighlight %}

The following c++ program implements an iterative **bottom-up** approach: 

{% highlight python %}
int longestCommonSubstring(string &A, string &B) {
        
    vector<vector<int>> lcsTable(A.size()+1, vector<int>(B.size()+1,0));

    //the lcs length and the last index of lcs in A 
    //are enough to reconstruct the lcs string
    int lcsLength = 0, lcsLastIndex = -1;

    for (int i = 0; i < A.size(); ++i) {
	for (int j = 0; j < B.size(); ++j) {

	    if (A[i] == B[j]) {
		//the longest common suffix ending at A[i], B[j]
		//is the longest common suffix ending at A[i-1], B[j-1] +1
		lcsTable[i+1][j+1] = lcsTable[i][j] + 1;

		//update length of lcs string
		#ifndef GET_LCS_STRING 
		lcsLength = max(lcsLength, lcsTable[i+1][j+1]);
		#else
		if (lcsTable[i+1][j+1] > lcsLength) {
		    lcsLength = lcsTable[i+1][j+1];
		    lcsLastIndex = i;
		}
		#endif
	    }
	}
    }
    #ifdef GET_LCS_STRING 
    string lcs(A, lcsLastIndex-lcsLength+1, lcsLength);
    cout << lcs << "\n";
    #endif
}
{% endhighlight %}

## Reconstructing an optimal solution
A longest common substring can be simply reconstructed by storing the index of the last of the substring in one of the two input string and using the longest common substring length to retrieve the index of the first character of the substring.


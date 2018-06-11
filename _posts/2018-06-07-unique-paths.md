---
layout: post
title: Unique Paths
categories:
  - Problems
tags:
  - Dynamic Programming
  - Array
last_modified_at: 2018-06-07T08:55:59-05:00
---

Problem definition: [Leetcode](https://leetcode.com/problems/unique-paths/description/).

In abstract, given a 2D array find the number of paths to move from the top-left corner to the bottom right corner. The only possible moves from a cell of the grid to the next one are either down or right. 

## Define the structure of an optimal solution
An optimal solution is represented by the number of paths to move from the top-left corner to any other cell of the grid. 

## Recursively define the value of an optimal solution
The key observation is that each cell of the grid can be reached only from left or up. So, an optimal solution S for a generic cell with coordinates (i.j) is given by S(i,j) = S(i-1,j) + S(i,j-1).

## Compute the value of an optimal solution 

The following c++ program implements a solution according to the **top-down with memoization** approach: 

{% highlight cpp %}
 int uniquePaths(int m, int n) {
        
  if (m <= 0 || n <= 0) return 0;

  vector<vector<int>> dp(n, vector<int>(m,-1));
  dp[0][0] = 1;
  return uniquePathsHelper(m-1, n-1, dp);
}

int uniquePathsHelper(int m, int n, vector<vector<int>>& dp) {

  //Check out of grid coordinates
  if (m < 0 || n < 0) return 0;

  //Check already computed paths
  if (dp[n][m] >= 0) return dp[n][m];
  
  //compute and save unique pths for the current cell
  dp[n][m] =  uniquePathsHelper(m-1, n, dp) + uniquePathsHelper(m, n-1, dp);

  return  dp[n][m];
}
{% endhighlight %}

The following python program implements a solution according to the **bottom-up** approach: 

{% highlight python %}
def uniquePaths(m, n):

        if m <= 0 or n <= 0 :
            return 0
        
        #create a grid with m columns and n rows
        dp = [[0]*m for x in range(n)]
        
        #define starting states
        
        #each cell of the first column can be reached only from up
        for i in range(n) :
            dp[i][0] = 1
        
        #each cell of the first row can be reached only from left
        for j in range(m) :
            dp[0][j] = 1      
        
        #compute all states
        for i in range(1,n) :
            for j in range(1,m) :
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
                
        return dp[n-1][m-1]
{% endhighlight %}

An extension of this problem considers that some obstacles are added to the grid, so that it's not possible to move in a cell with an obstacle. The recurrence formula defining the value of an optimal solution is very similar to the previous one, except that S(i,j) = 0 if the cell (i,j) contains an obstacle. The following python programs solves this problem, assuming that the value of a cell is 1 if there is an onstacle and 0 otherwise:

{% highlight python %}
def uniquePathsWithObstacles (obstacleGrid):

  rows = len(obstacleGrid)    # 3 rows in your example
  cols = len(obstacleGrid[0])

  if rows <= 0 or cols <= 0 :
    return 0

  dp = [[0]*cols for i in range(rows)] 
  
  #define starting states
  for x in range(rows) :
    if obstacleGrid[x][0] == 1 :
      break
    dp[x][0] = 1

  for y in range(cols) :
    if obstacleGrid[0][y] == 1 :
      break
    dp[0][y] = 1

  for x in range(1,rows) :
      for y in range(1,cols) :
        dp[x][y] = dp[x-1][y] + dp[x][y-1] if obstacleGrid[x][y] == 0 else 0

  return dp[rows-1][cols-1]

{% endhighlight %}

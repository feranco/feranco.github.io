---
layout: post
title: Merging Intervals
categories:
  - Problems
tags:
  - Arrays
  - Sorting
last_modified_at: 2018-05-25T09:55:59-05:00
---

# Problem definition

Given a collection of intervals, merge all overlapping intervals. An interval
can be represented as an instance of a meeting class with integer member
variables defining the start and end times of the interval.

```cpp
class Meeting
{
 private:
  unsigned int mStartTime;
  unsigned int mEndTime;

 public:
  Meeting() :
      mStartTime(0),
      mEndTime(0)
  {
  }

  Meeting(unsigned int startTime, unsigned int endTime) :
      mStartTime(startTime),
      mEndTime(endTime)
  {
  }

  unsigned int getStartTime() const
  {
    return mStartTime;
  }

  void setStartTime(unsigned int startTime)
  {
    mStartTime = startTime;
  }

  unsigned int getEndTime() const
  {
    return mEndTime;
  }

  void setEndTime(unsigned int endTime)
  {
    mEndTime = endTime;
  }
};
```

The goal is to define a function mergeRanges taking a vector of multiple
meetings and returning another vector where the overlapping input meetings has
been merged.

# Understand the problem

Since the problem asks to write an function merging overlapping meetings, the
first step is to clearly define when two meetings overlaps. Two meetings
$M_{1}$ and $M_{2}$ overlaps if the following conditions are verified:
* the start time of $M_{1}$ is *less or equal* than the start time of $M_{2}$;
* the end time of $M_{1}$ is *greater or equal* than the start time of $M_{2}$.

The resulting merged meeting $M_{3}$ is a meeting having the start time of
$M_{1}$ and an end time corresponding to the later of the end time of
$M_{1}$ and the end time of $M_{2}$. This condition takes into account the edge
case when $M_{2}$ ends before $M_{1}$ ends.

# Brute force solution

The brute force solution is to compare each meeting to each other meeting,
merging them or leaving them separate according to the previously defined rule.
The implementation is straightforward and uses a nested for loop to iterate over
all possible couples of meetings. Using two temporary variables to clearly
defines which is the meeting with the earlier starting time for each couple of
meetings improves the code readability. The solution is optimized using a hash set to cache the
indices of the already merged meetings in order not to process them
again. So, the time complexity is O(n<sup>2</sup>) and the space complexity is O(n).

```cpp

vector<Meeting> mergeRanges(const vector<Meeting>& meetings)
{
  vector<Meeting> mergedMeetings;
  set<size_t> processedMeetings;

  for (size_t i = 0; i < meetings.size(); ++i) {

    if (processedMeetings.find(i) != processedMeetings.end()) continue;

    Meeting first, second, current{meetings[i]};

    for (size_t j = i+1; j < meetings.size(); ++j) {

      if (processedMeetings.find(j) != processedMeetings.end()) continue;

      if (current.getStartTime() <= meetings[j].getStartTime()) {
        first = current;
        second = meetings[j];
      }
      else {
        first = meetings[j];
        second = current;
      }

      if (first.getEndTime() >= second.getStartTime()) {
        current.setStartTime(first.getStartTime());
        current.setEndTime(max(first.getEndTime(), second.getEndTime()));
        processedMeetings.insert(j);
      }

    }
    mergedMeetings.push_back(current);
  }
  return mergedMeetings;
}

```

## Optimal Solution

A better solution can be derived observing that merging a couple of meetings
requires to determine which the meeting with the earlier start time (i.e. which
is $M_{1}$). So, if all meetings were sorted according to their start time, it
would be possible to solve the problem in one pass trying to merge each meeting
with the one after it. The resulting implementation is included in the following
code snapshot.

```cpp
vector<Meeting> mergeRanges(const vector<Meeting>& meetings)
{
  if (meetings.size() == 0) return {};

  vector<Meeting> sortedByStartTime(meetings.begin(), meetings.end());
  sort(sortedByStartTime.begin(), sortedByStartTime.end(),
  [](const Meeting& a, const Meeting&b){return a.getStartTime() < b.getStartTime();});

  vector<Meeting> mergedMeetings{sortedByStartTime.front()};

  for (const auto& meeting : sortedByStartTime) {
    //check if merge is possible
    if (mergedMeetings.back().getEndTime() >= meeting.getStartTime()) {
      mergedMeetings.back().setEndTime(max(meeting.getEndTime(),mergedMeetings.back().getEndTime()));
    }
    else {
      mergedMeetings.push_back(meeting);
    }
  }

  return mergedMeetings;
}
```

It's worth to observe that is very convenient to insert a meeting in the
output vector and then try to merge it with the next one in the input vector. An
alternative is to use a temporary variable to store the current meeting in the
input vector, updating it when the merge with the next meeting is possible and
inserting it in the output vector when the merge is not possible. However, this approach
would require additional checks after the for loop to understand if the
temporary variable has been already inserted in the output vector or if the
output vector is empty. The time complexity of this solution is O(nlogn) because
of the sorting step. The space complexity is O(1). The code with all the
test cases is available on my [Github repository](https://github.com/feranco/Problems/tree/master/Arrays/MergingIntervals).

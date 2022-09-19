def maxSumIncreasingSubsequence(array):
    n = len(array)
    temp = [0] * n
    find_index = lambda ran, number: next((index for index in range(ran-1,-1,-1) if array[index]< number), ran)
    for i, num in enumerate(array):
        index = find_index(i, num)
        temp[i] = num + temp[index]
    return temp


print(maxSumIncreasingSubsequence([10, 70, 20, 30,11, 50, 11, 30]))
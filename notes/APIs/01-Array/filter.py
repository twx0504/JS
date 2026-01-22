def filter(arr, fn):
    res = []
    for index, item in enumerate(arr):
        if (fn(item, index, arr)):
            res.append(item)
    return res    
        

arr = [1, 2, 3, 4 , 5]

def check(item, index, arr):
    return item > 2


newArr = filter(arr, lambda item, index, arr: item > 2) 
newArr = filter(arr, check) 
print(newArr)
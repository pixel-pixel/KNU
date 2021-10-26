def task(arr1, arr2)
  res_arr = []

  arr1.each do |el|
    if arr2.include? el
      res_arr << el
      i = arr2.index el
      arr2.delete_at i
    end
  end

  res_arr.sort
end

puts task [1, 2, 3, 4, 5, 6, 7, 8, 6], [4, 4, 6, 7, 6, 8, 9, 3, 1, 0]
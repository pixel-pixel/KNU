def s(arr_coo)
  res = 0
  len = arr_coo.length
  (0..(len - 2)).each do |i|
    res += arr_coo[i][0] * arr_coo[i + 1][1] - arr_coo[i + 1][0] * arr_coo[i][1]
  end

  res += arr_coo[len - 1][0] * arr_coo[0][1] - arr_coo[0][0] * arr_coo[len - 1][1]

  res / 2
end

arr = [
  [69, 43], [110, 46], [147, 50], [186, 45], [238, 37],
  [298, 34], [344, 34], [396, 57], [429, 79], [482, 149],
  [485, 215], [488, 273], [443, 314], [350, 307], [271, 299],
  [207, 275], [177, 206], [136, 168], [97, 141], [47, 95],
  [49, 71], [56, 57],
]
puts "Coo is #{arr}"
puts "S = #{s arr}"

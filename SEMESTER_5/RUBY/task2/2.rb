def get_diapazon(p, t, r = 0)
  res = ""
  (1..t).each { res += (p-1).to_s }
  [[0, p ** t], res]
end

puts "Enter P:"
p = gets.to_i
puts "Enter t:"
t = gets.to_i
res = get_diapazon(p, t)
puts "Diapazone is #{res[0]} (#{res[1]})"
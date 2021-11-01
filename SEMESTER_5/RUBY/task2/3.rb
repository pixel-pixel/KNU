def to_decimal(num)
  str_num = num.to_s
  str_num.to_i(10)
end

#RUN
puts "Enter tour binary number:"
num = gets.to_i 2
puts "Your decimal number is #{to_decimal num}"

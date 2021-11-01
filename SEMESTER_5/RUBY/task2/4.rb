def to_binary_1(num) num.to_s(2) end
def to_binary_2(num) "%b" % num end

def run()
  puts "Enter number: "
  num = gets.to_i
  puts "In binary #{num} equals #{to_binary_1(num)}"
end

run()
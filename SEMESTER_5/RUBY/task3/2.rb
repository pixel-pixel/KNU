include Math

def task(x, p)
  lg13 = log(1 / 3)
  ( (log(x)/lg13) > log(1.7)/lg13 ) and ( sqrt(x) > x * x) and !p
end

def s_to_b(obj)
  obj.to_s.downcase == "true"
end

def run
  puts "Enter X:"
  x = gets.to_f

  puts "Enter P:"
  p = s_to_b gets

  puts "Result: #{task x, p}"
end

#RUN task
run
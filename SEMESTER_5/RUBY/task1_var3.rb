include Math

def get_l(a, b, x)
  first_up = 6.2 * 10 ** 2.7 * tan(PI - x ** 3)
  first_down = E + log(acos((b ** 3).abs)) ** (1 / 2)
  first = first_up / first_down

  second_up = 10 ** 2 * sqrt(a)
  second_down = 2 * x + 87.2
  second = atan(second_up / second_down)

  first + second
end

def program
  puts "Enter a: "
  a = gets.to_f

  puts "Enter b: "
  b = gets.to_f

  puts "Enter x: "
  x = gets.to_f

  puts "L is #{ get_l(a, b, x) }"
end

#RUN program
program
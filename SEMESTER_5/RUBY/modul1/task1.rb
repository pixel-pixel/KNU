def f(x, a = 0, b = 0, c = 0)
  ac = a.ceil
  bc = b.ceil
  cc = c.ceil

  param = x
  if ((ac | bc) & cc) != 0
    param = x.ceil
  end

  if param < 0 && b != 0
    a - param / (10 + b)
  elsif param > 0 && b == 0
    (param - a) / (param - c)
  else
    3 * x + 2 / c
  end
end

def run(xs, xe, xd, a, b, c)
  current = xs

  puts "A:    #{a}\tB:    #{b}\tC:    #{c}"
  while current < xe
    puts "X:    #{current}\tRes:    #{f current, a, b, c}"
    current += xd
  end
end

run(0, 10, 0.75, 1, 2, 3)
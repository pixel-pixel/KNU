class TrueClass
  def >(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a > b
  end

  def <(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a < b
  end

  def >=(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a >= b
  end

  def <=(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a <= b
  end
end

class FalseClass
  def >(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a > b
  end

  def <(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a < b
  end

  def >=(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a >= b
  end

  def <=(b)
    a = self ? 1 : 0
    b = b ? 1 : 0

    a <= b
  end
end

def task_a(a, b)
  !(a or b) and (a and !b)
end

def task_b(a, b, c, x, y, z)
  (z != y) <= (6 >= y) and a or b and c and x >= 1.5
end

def task_c(x, y, z)
  (8 - x * 2 <= z) and (x ** 2 <= y ** 2) or (z >= 15)
end

def task_d(x, y, z)
  x > 0 and y < 0 or z >= (x * y + (-y / x)) + (-z)
end

def task_e(a, b, c)
  !(a or b and !(c or (!a or b)))
end

def task_f(x, y)
  x ** 2 + y ** 2 >= 1 and x >= 0 and y >= 0
end

def task_g(a, b, c)
  (a and (c and b <=> b or a) or c) and b
end

def run(a, b, c, x, y, z)

  puts "task A: #{task_a a, b}"
  puts "task B: #{task_b a, b, c, x, y, z}"
  puts "task C: #{task_c x, y, z}"
  puts "task D: #{task_d x, y, z}"
  puts "task E: #{task_e a, b, c}"
  puts "task F: #{task_f(x, y)}"
  puts "task G: #{task_g(a, b, c)}"
end

#RUN task
run(false , true , true, 90, -1, 5)
def task(matrix)
  size = matrix.length
  res_matrix = Array.new(size) { Array.new(size) }

  (0..size - 1).each do |i|
    (0..size - 1).each do |j|
      res_matrix[j][i] = matrix[i][j]
    end
  end

  res_matrix
end

def create_rand_matrix(size)
  matrix = Array.new(size) { Array.new(size) }

  (0..size - 1).each do |i|
    (0..size - 1).each do |j|
      if i == j
        matrix[i][j] = 1
      else
        matrix[i][j] = rand 10
      end
    end
  end

  matrix
end

def run
  matrix = create_rand_matrix 10
  puts "Random matrix:"
  puts matrix.map {|el| el.join(', ')}

  matrix = task matrix
  puts "Trans-matrix:"
  puts matrix.map {|el| el.join(', ')}
end

#RUN task
run
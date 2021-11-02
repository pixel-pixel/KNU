class Book
  @@count = 0
  @tune = nil

  def initialize(*params)
    case params.size
    when 7
      full_constructor(*params)
    when 6
      constructor_without_id(*params)
    when 3
      name_constructor(*params)
    else return
    end

    @@count += 1
  end

  def full_constructor(id, name, author, izd, year, pages, prise, type)
    @id = id
    @name = name
    @author = author
    @izd = izd
    @year = year
    @pages = pages
    @prise = prise
    @type = type

    @@count += 1
  end

  def constructor_without_id(name, author, izd, year, pages, prise, type)
    @id = @@count
    @name = name
    @author = author
    @izd = izd
    @year = year
    @pages = pages
    @prise = prise
    @type = type
  end

  def name_constructor(name, author, year)
    @id = @@count
    @name = name
    @author = author
    @year = year
    @izd = "unknown"
    @pages = -1
    @prise = -1
    @type = nil
  end

  def getTun
    @tune
  end

  def setTun(t)
    @tune = t
  end

  def to_s
    if @pages != -1
      "Book: {name: #{@name}; author: #{@author}; izh: #{@izd}; pages: #{@pages}; prise: #{@prise}; type: #{@type}; tun: #{@tune}}"
    else
      "Book: {name: #{@name}; author: #{@author}; pages: #{@pages}; tun: #{@tune}}"
    end
  end

  def self.random_array(size)
    arr = []

    (1..size).each do |i|
      arr.append Book.new("name#{i}", "Author#{1999 - i}", i ** i)
    end

    [*arr]
  end
end


arr = Book.random_array(5)
puts arr
arr.filter {|el| }


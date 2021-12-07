class BasicContact
  attr_accessor :name

  def initialize(name = "empty(")
    @name = name
  end

  def to_s
    "data: " + @name
  end
end

class UserContact < BasicContact
  attr_accessor :phone
  attr_accessor :email

  def initialize(name = "empty(", phone = "no phone(", email = "no email")
    super(name)
    @name = name
    @phone = phone
    @email = email
  end

  def to_s
    " name: " + @name + " phone: " + phone + " email: " + email
  end
end

class SocialContact < UserContact
  attr_accessor :messenger

  def initialize(name = "empty(", phone = "no phone(", email = "no email", messenger = "no messenger")
    super(name, phone, email)
    @messenger = messenger
  end

  def to_s
    "name: " + @name + "phone: " + phone + " email: " + email + " messenger: " + messenger
  end
end

class ContactsArray
  attr_accessor :array


  def initialize(array = "kek")
    @array = array
  end

  def add(obj)
    @array.append obj
  end

  def findByName(name)
    @array.select do |i|
      i.name.start_with? name
    end
  end

  def sortByName
    @array.sort do |a, b|
      a.name > b.name
    end
  end

  def to_s
    array.each do |item|
      puts item
    end
  end
end





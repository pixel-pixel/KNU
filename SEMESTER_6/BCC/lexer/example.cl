

-- A pure virtual class representing any expression
class Expr inherits IO {

  -- Print this lambda term
  print_self() : SELF_TYPE {
    {
      out_string("\nError: Expr is pure virtual; can't print self\n");
      abort();
      self;
    }
  };


package gem

public fun gemComparator() = Comparator<Gem> { f, s ->
    when {
        f.name > s.name -> 1
        f.name < s.name -> -1
        f.preciousness == Preciousness.PRECIOUS && s.preciousness == Preciousness.SEMI_PRECIOUS -> 1
        f.preciousness == Preciousness.SEMI_PRECIOUS && s.preciousness == Preciousness.PRECIOUS -> -1
        f.value > s.value -> 1
        f.value < s.value -> -1
        f.original > s.original -> 1
        f.original < s.original -> 1
        else -> 0
    }
}
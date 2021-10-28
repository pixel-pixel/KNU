package main

import (
		"fmt"
		"time"
)

func Ivanov(value int, toPrint chan int) {
		toPetrov := make(chan int)
		go Petrov(toPetrov, toPrint)
		fmt.Println("Ivanov: START")
		time.Sleep(time.Second * 3)
		fmt.Println("Ivanov: END")
		toPetrov <- value + 1
}

func Petrov(fromIvanov chan int, toPrint chan int) {
		toNech := make(chan int)
		fmt.Println("Petrov: WAITING")
		go Necheporchuk(toNech, toPrint)
		var x = <-fromIvanov
		fmt.Println("Petrov: START")
		time.Sleep(time.Second * 3)
		fmt.Println("Petrov: END")
		toNech <- x + 1
}

func Necheporchuk(fromPetrov chan int, toPrint chan int) {
		fmt.Println("Necheporchuk: WAITING")
		var x = <-fromPetrov
		fmt.Println("Necheporchuk: START")
		time.Sleep(time.Second * 3)
		fmt.Println("Necheporchuk: END")
		toPrint <- x + 1
}

func main() {
		toPrint := make(chan int)
		go Ivanov(10, toPrint)
		fmt.Println(<-toPrint)
}

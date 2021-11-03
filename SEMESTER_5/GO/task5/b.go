package main

import (
		"fmt"
		"math/rand"
		"sync"
		"time"
)

type Barrier struct {
		generation int
		count      int
		parties    int
		trigger    *sync.Cond
}

func createBarrier(numberOfParties int) *Barrier {
		b := Barrier{}
		b.count = numberOfParties
		b.parties = numberOfParties
		b.trigger = sync.NewCond(&sync.Mutex{})
		return &b
}

func (b *Barrier) nextGeneration() {
		b.trigger.Broadcast()
		b.count = b.parties
		b.generation++
}

func (b *Barrier) Awaiting() {
		b.trigger.L.Lock()
		defer b.trigger.L.Unlock()

		generation := b.generation

		b.count--
		index := b.count
		if index == 0 {
				b.nextGeneration()
		} else {
				for generation == b.generation {
						b.trigger.Wait()
				}
		}
}

var array [5]int
func run(name int, line [4][10]string, bar *Barrier) {
		for {
				rndNum := rand.Intn(10)
				rndSym := rand.Intn(4)

				line[name][rndNum] = string(rune('A' + rndSym))

				//Find right syms for each arr
				rightSymsCount := 0
				for i := 0; i < 10; i++ {
						if line[name][i] == "A" || line[name][i] == "B" {
								rightSymsCount++
						}
				}
				array[name] = rightSymsCount

				//Print and check end
				time.Sleep(time.Millisecond * 1000)
				fmt.Printf("%d -> %q -> %d\n", name, line[name], rightSymsCount)
				if bar.count == 1 {
						fmt.Printf("\n------\nGenerated !\n\n")
						if (array[0] == array[1] && array[0] == array[2]) ||
								(array[0] == array[1] && array[0] == array[3]) ||
								(array[1] == array[2] && array[1] == array[3]) {
								fmt.Print("DONE")
								break
						}
				}
				bar.Awaiting()
		}
}


func main() {
		wgControl := &sync.WaitGroup{}
		defer wgControl.Wait()

		parties := 4
		bar := createBarrier(parties)

		lines := [4][10]string{
				{"A","A","A","A","B","B","B","C","C","D"},
				{"A","A","A","B","B","C","C","C","D","D"},
				{"A","A","B","C","C","C","D","D","D","D"},
				{"A","B","B","D","B","C","C","D","D","D"}}

		for i := 0; i < parties; i++ {
				name := i
				wgControl.Add(1)

				go func() {
						go run(name, lines, bar)
						wgControl.Done()
				}()
		}
		time.Sleep(time.Second * 100)
}
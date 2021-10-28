package main

import (
		"math/rand"
		"os"
		"strings"
		"sync"
		"time"
)

type Garden = struct {
		sync.RWMutex
		arr [5][5]string
}

func emptyGarden() *Garden {
		garden := Garden{}
		for i := range garden.arr {
				for j := range garden.arr[i] {
						garden.arr[i][j] = "O"
				}
		}
		return &garden
}

func gardener(garden *Garden) {
		for {
				garden.Lock()
				for i := range garden.arr {
						for j := range garden.arr[i] {
								garden.arr[i][j] = "0"
						}
				}
				garden.Unlock()
				time.Sleep(5000 * time.Millisecond)
		}
}

func nature(garden *Garden) {
		rand.Seed(time.Now().UTC().UnixNano())

		for {
				x := rand.Intn(len(garden.arr))
				y := rand.Intn(len(garden.arr[x]))

				garden.Lock()
				garden.arr[x][y] = "X"
				garden.Unlock()
				time.Sleep(1000 * time.Millisecond)
		}
}

func monitor1(garden *Garden) {
		file, err := os.Create("garden.txt")

		if err != nil {
				print("Unable to create file:", err)
				os.Exit(1)
		}
		defer file.Close()

		for {
				garden.RLock()
				for _, arr := range garden.arr {
						line := strings.Join(arr[:], "")
						file.WriteString(line + "\n")
				}
				garden.RUnlock()
				file.WriteString("\n")
				time.Sleep(1000 * time.Millisecond)
		}
}

func monitor2(garden *Garden) {
		for {
				garden.RLock()
				for _, arr := range garden.arr {
						for _, el := range arr {
								print(el)
						}
						println()
				}
				println()

				garden.RUnlock()
				time.Sleep(1000 * time.Millisecond)
		}
}

func main() {
		garden := emptyGarden()
		wg := sync.WaitGroup{}

		wg.Add(4)
		go gardener(garden)
		go nature(garden)
		go monitor1(garden)
		go monitor2(garden)
		wg.Wait()
}

package main

import (
		"fmt"
		"sync"
		"time"
)

func doWork(busCount, busLimit int) {
		waitGr := &sync.WaitGroup{}
		regulator := make(chan struct{}, busLimit)
		for i := 0; i < busCount; i++ {
				waitGr.Add(1)
				go tryToStayAtBusStop(regulator, waitGr, i)
		}
		waitGr.Wait()
}

func tryToStayAtBusStop(regulator chan struct{}, wg *sync.WaitGroup, busNumber int){
		regulator <- struct{}{}
		defer wg.Done()
		fmt.Printf("Bus %v have just arrived\n", busNumber)
		time.Sleep(time.Millisecond * 400)
		fmt.Printf("Bus %v have just left\n", busNumber)
		<-regulator
}

func main() {
		doWork(15, 15)
}
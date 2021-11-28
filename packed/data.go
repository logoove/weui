package packed

import "github.com/gogf/gf/os/gres"

func init() {
	if err := gres.Add("H4sIAAAAAAAC/wrwZmYRYeBg4GCoLqsJZkACQgycDMn5eWmZ6foQSq8kPzcnNISVgbFr+uLEmH7D/MMKAq3p99c7VKwzDt2kVdpxZWFzu8fJtFSGwoVh6xsPWYb+r2U9ItLK+uXe7vKavRX2c/kedTxsY3w2471xSXUy0zGNS5Win1Jljqdzxp58qxtnefLbpyV7pl/wPScnUp9T+O+T0ALxyZvFDjMYPz0uOSm+2XS3cnrqN7U9in+ru1a8cDfLe+q7X6OLY3Pgmi1dEVk/ryfP6ry/xWCaYdS6+TtfsF9PTf+SUGLI8+rqtWVLvjx6G6f+4t9rleuqzt0XEmyETER0HZg35v7lZmD4/z/Am50jXNfD+QwDA0M1IwMDLFAYGKIqUAOFDR4o4ICQnbU4EaQZWUmANyOTCDMiTJENBoUpDGxrBJF4QhhhEHZ3QIAAw39HUUYGTFexsoGkmRiYGNoYGBiCGEE8QAAAAP//xQb9jO4BAAA="); err != nil {
		panic("add binary content to resource manager failed: " + err.Error())
	}
}

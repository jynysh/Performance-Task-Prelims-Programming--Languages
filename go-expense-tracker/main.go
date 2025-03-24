package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	var expenses []float64
	scanner := bufio.NewScanner(os.Stdin)

	for {
		fmt.Println("\nExpense Tracker")
		fmt.Println("1. Add Expense")
		fmt.Println("2. Show Total")
		fmt.Println("3. Exit")
		fmt.Print("Enter choice: ")

		scanner.Scan()
		choice := scanner.Text()

		switch choice {
		case "1":
			fmt.Print("Enter expense amount: ")
			scanner.Scan()
			amount, err := strconv.ParseFloat(scanner.Text(), 64)
			if err != nil {
				fmt.Println("Invalid amount. Please enter a valid number.")
				continue
			}
			expenses = append(expenses, amount)
			fmt.Println("Expense added!")

		case "2":
			var total float64
			for _, expense := range expenses {
				total += expense
			}
			fmt.Printf("Total Expenses: $%.2f\n", total)

		case "3":
			fmt.Println("Exiting... Goodbye!")
			return

		default:
			fmt.Println("Invalid choice. Please enter 1, 2, or 3.")
		}
	}
}

#!/usr/bin/perl
use strict;
use warnings;

my $file = "expenses.txt";

# Function to show expenses
sub show_expenses {
    if (!-e $file || -z $file) {
        print "No expenses recorded yet.\n";
        return;
    }
    open(my $fh, '<', $file) or die "Cannot open file.\n";
    print "\nYour Expenses:\n";
    while (my $expense = <$fh>) {
        print "$expense";
    }
    close($fh);
}

# Function to add an expense
sub add_expense {
    print "Enter expense category (Food, Transport, Bills, etc.): ";
    my $category = <STDIN>;
    chomp($category);

    print "Enter amount: ";
    my $amount = <STDIN>;
    chomp($amount);

    print "Enter date (YYYY-MM-DD): ";
    my $date = <STDIN>;
    chomp($date);

    open(my $fh, '>>', $file) or die "Cannot open file.\n";
    print $fh "$date | $category | PHP $amount\n";
    close($fh);

    print "Expense added!\n";
}

# Function to calculate total expenses
sub total_expenses {
    if (!-e $file || -z $file) {
        print "No expenses recorded yet.\n";
        return;
    }
    open(my $fh, '<', $file) or die "Cannot open file.\n";
    my $total = 0;
    while (my $expense = <$fh>) {
        my @parts = split(/\|/, $expense);
        my $amount = $parts[2];
        $amount =~ s/[^0-9.]//g; # Remove non-numeric characters
        $total += $amount;
    }
    close($fh);
    print "Total Expenses: PHP $total\n";
}

# Function to delete all expenses
sub delete_expenses {
    open(my $fh, '>', $file) or die "Cannot open file.\n";
    close($fh);
    print "All expenses deleted!\n";
}

# Main loop
while (1) {
    print "\n1. View Expenses\n2. Add Expense\n3. View Total Expenses\n4. Delete All Expenses\n5. Exit\nChoose: ";
    my $choice = <STDIN>;
    chomp($choice);

    if ($choice == 1) {
        show_expenses();
    } elsif ($choice == 2) {
        add_expense();
    } elsif ($choice == 3) {
        total_expenses();
    } elsif ($choice == 4) {
        delete_expenses();
    } elsif ($choice == 5) {
        last;
    } else {
        print "Invalid choice. Try again.\n";
    }
}

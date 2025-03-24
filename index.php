<?php
session_start();

$filename = 'expenses.txt';

$expenses = [];
if (file_exists($filename)) {
    $jsonData = file_get_contents($filename);
    if ($jsonData) {
        $expenses = json_decode($jsonData, true) ?? [];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $desc = $_POST['desc'] ?? '';
    $amount = $_POST['amount'] ?? '0';
    $amount = floatval($amount);

    
    if (!empty($desc) && $amount > 0) {
        
        $expenses[] = [
            'desc'   => $desc,
            'amount' => $amount,
            'date'   => date('Y-m-d')
        ];
        
        
        file_put_contents($filename, json_encode($expenses));
        
        $_SESSION['message'] = 'Expense added successfully!';
    } else {
        $_SESSION['message'] = 'Invalid description or amount.';
    }
    
    
    header('Location: index.php');
    exit;
}

$total = 0;
foreach ($expenses as $expense) {
    $total += $expense['amount'];
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>PHP Expense Tracker</title>
</head>
<body>
    <h1>PHP Expense Tracker</h1>
    
    <?php if(isset($_SESSION['message'])): ?>
        <p><?php echo $_SESSION['message']; ?></p>
        <?php unset($_SESSION['message']); ?>
    <?php endif; ?>

    <form method="POST" action="">
        <label for="desc">Description: </label>
        <input type="text" name="desc" id="desc" required>
        
        <label for="amount">Amount: </label>
        <input type="number" step="0.01" name="amount" id="amount" required>
        
        <button type="submit">Add Expense</button>
    </form>
    
    <h2>Total Expenses: PHP <?php echo number_format($total, 2); ?></h2>
    
    <h3>All Expenses:</h3>
    <?php if (!empty($expenses)): ?>
        <ul>
            <?php foreach ($expenses as $expense): ?>
                <li>
                    <?php echo $expense['date']; ?> - 
                    <?php echo htmlspecialchars($expense['desc']); ?>: 
                    PHP <?php echo number_format($expense['amount'], 2); ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>No expenses recorded yet.</p>
    <?php endif; ?>
</body>
</html>

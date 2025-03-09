<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "ma_reservation";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['action']) && $_POST['action'] == 'ajouter') {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $phoneNumber = $_POST['phoneNumber'];
    $destination = $_POST['destination'];
    $cooperative = $_POST['cooperative'];

    $sql = "INSERT INTO reservationdb (firstName, lastName, phoneNumber, destination, cooperative) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiss", $firstName, $lastName, $phoneNumber, $destination, $cooperative);
    $stmt->execute();
    echo "Réservation ajoutée avec succès";
}

$sql = "SELECT * FROM reservationdb";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>Application de Réservation</title>
</head>
<body>
    <div class="container">
        <h1>Réservations</h1>
        <form id="reservationForm" method="POST">
            <input type="text" id="firstName" name="firstName" placeholder="Prénom" required>
            <input type="text" id="lastName" name="lastName" required>
            <input type="number" id="phoneNumber" name="phoneNumber" placeholder="Numéro de téléphone" required>
            <input type="text" id="destination" name="destination" placeholder="Destination" required>
            <input type="text" id="cooperative" name="cooperative" placeholder="Coopérative" required>
            <button type="submit" name="action" value="ajouter">Ajouter</button>
        </form>
        <ul id="reservationList">
            <?php
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<li>" . htmlspecialchars($row['firstName']) . " " . htmlspecialchars($row['lastName']) . " - " . htmlspecialchars($row['phoneNumber']) . " - " . htmlspecialchars($row['destination']) . " - " . htmlspecialchars($row['cooperative']) . "</li>";
                }
            } else {
                echo "<li>Aucune réservation trouvée.</li>";
            }
            ?>
        </ul>
    </div>
</body>
</html>

<?php
$conn->close();
?>


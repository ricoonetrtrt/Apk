<?php
// save_points.php

// تحقق مما إذا كانت المتغيرات تم إرسالها
if (isset($_POST['teamName']) && isset($_POST['points'])) {
    $teamName = $_POST['teamName'];
    $points = $_POST['points'];

    // تحقق من أن النقاط هي عدد صحيح
    if (!is_numeric($points)) {
        echo "النقاط يجب أن تكون عدد صحيح.";
        exit;
    }

    // قم بتخزين النقاط في ملف
    $file = 'points.txt';
    $data = "$teamName, $points\n";

    // Append the data to the file
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX) === false) {
        echo "فشل في حفظ النقاط.";
    } else {
        echo "النقاط تم حفظها.";
    }
} else {
    echo "فشل في حفظ النقاط.";
}
?>

<?php

foreach (glob(__DIR__ . '/*.html') as $file) { 
    echo '<a href="'. basename($file) . '">' . basename($file, '.html').'</a><br>';
}

?>

<?php

//$cors = 'http://emmanuelweethetwel.nl/weather/';
$cors = 'http://localhost:3000';

include 'vendor/simplehtmldom/simplehtmldom/simple_html_dom.php';

header('Content-type: application/json; charset=UTF-8;');
header('Access-Control-Allow-Origin: ' . $cors, FALSE);
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Origin");

echo scrape('https://www.knmi.nl/nederland-nu/weer/waarnemingen');

function raw_scrape($url) {
  $doc = file_get_html($url);
  $headers = [];
  $rows = [];

  foreach ($doc->find('table tr') as $tr) {
    foreach ($tr->find('th') as $element) {
      array_push($headers, strip_tags($element->plaintext));
    }

    $row = [];
    foreach ($tr->find('td') as $element) {
      array_push($row, $element->plaintext);
    }

    if (!empty($row)) {
      array_push($rows, $row);
    }
  }

  $table = $rows;
  array_unshift($table, $headers);

  return $table;
}

function scrape ($url) {
  $table = raw_scrape($url);
  $headers = array_shift($table);

  $tempArr = [];

  foreach ($table as $indexR => $row) {
    $data = [];
    foreach ($row as $indexT => $tuple) {
      $data[$headers[$indexT]] = $tuple;
    }

    array_push($tempArr, $data);
  }

  return json_encode($tempArr);
}

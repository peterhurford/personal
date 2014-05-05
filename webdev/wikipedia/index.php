<?
include "curl.php"; //includes the Sean Huber CURL Library
$curl = new CURL(); //Call a new CURL

$return = $curl->get("http://en.wikipedia.org/wiki/Wikipedia:Featured_articles"); //Get data from the list of Featured articles

preg_match_all("|<a href=\"/wiki/(.*)\" title=\"|U", $return, $urls); //Search them for all URLs relating to Wikipedia

$urls = $urls[1]; //Get the array that contains the data

$length = count($urls)-44; //Count how many there are, then trim off the 44 last links which aren’t articles.

$random = rand(25, $length); //Generate a proper random number, must be above 24 because the first 24 links are pages about Wikipedia, similar to above.

$title = $urls[$random]; //Use the random number to select a random page title from the list.

$page = "http://en.wikipedia.org/wiki/$title"; //Generate the name of the page.

echo "<iframe src ='$page' width='100%' height='82%'>
  <p>Your browser does not support iframes.  So just go to <a href=$page>$page</a>...</p>
</iframe>
<p><center><h2><a href='wikipedia.php'>(New Random Featured Article)</a></h2></p><p>Made by <a href='http://www.peterhurford.com'>Peter Hurford</a>.  (<a href=$page>Remove this footer?</a>)</center>";
?>
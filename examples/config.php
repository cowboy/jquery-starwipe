<?PHP

$shell['title1'] = "jQuery Star Wipe";
$shell['link1']  = "http://benalman.com/projects/jquery-starwipe-plugin/";

ob_start();
?>
  <a href="http://benalman.com/projects/jquery-starwipe-plugin/">Project Home</a>,
  <a href="http://benalman.com/code/projects/jquery-starwipe/docs/">Documentation</a>,
  <a href="http://github.com/cowboy/jquery-starwipe/">Source</a>
<?
$shell['h3'] = ob_get_contents();
ob_end_clean();

$shell['jquery'] = 'jquery-1.3.2.js';

$shell['shBrush'] = array( 'JScript' );

?>

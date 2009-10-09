<?PHP

include "../index.php";

$shell['title3'] = "Star Wipe";

$shell['h2'] = 'Quite possibly the best page transition effect, ever.';

// ========================================================================== //
// SCRIPT
// ========================================================================== //

ob_start();
?>
$(function(){
  
  // Enable "star wipe" transition on some links!
  $('a:not([href^=#]):not([href^=javascript])').starwipe();
  
});
<?
$shell['script'] = ob_get_contents();
ob_end_clean();

// ========================================================================== //
// HTML HEAD ADDITIONAL
// ========================================================================== //

ob_start();
?>
<script type="text/javascript" src="../../jquery.ba-starwipe.js"></script>
<script type="text/javascript" language="javascript">

<?= $shell['script']; ?>

$(function(){
  
  // Syntax highlighter.
  SyntaxHighlighter.highlight();
  
});

</script>
<style type="text/css" title="text/css">

/*
bg: #FDEBDC
bg1: #FFD6AF
bg2: #FFAB59
orange: #FF7F00
brown: #913D00
lt. brown: #C4884F
*/

#page {
  width: 700px;
}

</style>
<?
$shell['html_head'] = ob_get_contents();
ob_end_clean();

// ========================================================================== //
// HTML BODY
// ========================================================================== //

ob_start();
?>

<p>
  With <a href="http://benalman.com/projects/jquery-starwipe-plugin/">jQuery Star Wipe</a> you can enable the single best transition ever created, the star wipe, in any recent WebKit browser! Want support for star wipe in more browsers? Ask your favorite browser manufacturer to support <a href="http://webkit.org/blog/181/css-masks/">CSS masks</a>!
</p>

<p>
  Note: as of 10/9/2009, jQuery Star Wipe only works on Chrome 3 and Safari 4.
</p>

<h3>Some links for you to click</h3>

<ul>
  <li><a href="http://jquery.com/">jQuery</a></li>
  <li><a href="http://www.mozilla.com/">Mozilla</a></li>
  <li><a href="http://digg.com/">Digg</a></li>
  <li><a href="http://benalman.com/">Benalman.com</a></li>
</ul>

<h3>The code</h3>

<pre class="brush:js">
<?= htmlspecialchars( $shell['script'] ); ?>
</pre>

<?
$shell['html_body'] = ob_get_contents();
ob_end_clean();

// ========================================================================== //
// DRAW SHELL
// ========================================================================== //

draw_shell();

?>
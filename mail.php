<?php
//require_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');
//$page = get_page_by_path('contact');
//$to = get_field('e-mail', $page->ID);
$to = 'aoabuelgasim@gmail.com';
$name = $_POST['name'];
$from = $_POST['email'];
$message = $_POST['message'];
$subject = 'Message from Website Contact Form';
$body = "You have received the following message from your website contact form:\nFrom: $name\nE-Mail: $from\nMessage:\n$message";
$headers = 'From: '.$from."\r\n".
'Reply-To: '.$from."\r\n" .
'X-Mailer: PHP/' . phpversion();

if (mail ($to, $subject, $body, $headers)) {
  echo '<p>Your message has been sent<br/><br/>Thanks for contacting me, I\'ll get back to you as soon as possible.</p>';
}

?>

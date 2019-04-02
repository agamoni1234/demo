import smtplib
import os

from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from email.header import Header


MY_ADDRESS = 'results@cloudhiti.com'
PASSWORD = 'Results123!'



def sendEmailUsernamePassword(requestjson):
    you = requestjson['receiver']
    subject = requestjson['subject']
    message = requestjson['message']
    names = []
    emails = []

    names.append(you)
    emails.append(you)


    # abspath = os.path.dirname(os.path.abspath(__file__))
    # names, emails = get_contacts(abspath+'/mycontacts.txt')  # read contacts
    # message_template = read_template(abspath+'/message.txt')

    # set up the SMTP server
    s = smtplib.SMTP(host='smtp.gmail.com', port=587)
    s.starttls()
    s.login(MY_ADDRESS, PASSWORD)

    #For each contact, send the email:
    for name, email in zip(names, emails):
        msg = MIMEMultipart()  # create a message

        # add in the actual person name to the message template
        # message = message_template.substitute(PERSON_NAME=name.title())

        # Prints out the message body for our sake
        #print(message)

        # setup the parameters of the message
        msg['From'] = MY_ADDRESS
        msg['To'] = email
        msg['Subject'] = subject

        # add in the message body
        msg.attach(MIMEText(message, 'html'))

        # send the message via the server set up earlier.
        s.send_message(msg)
        del msg

    # Terminate the SMTP session and close the connection
    s.quit()

